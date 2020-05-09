import React from 'react';
import ErrorBoundary from './errorHandler'
import { StyleSheet, Text, View,TextInput,TouchableOpacity , Vibration} from 'react-native';


const DURATION = 10000 ;
 
const PATTERN = [ 1000, 2000, 3000, 4000] ; //for vibration

const TimeCountdownView = props =>{ //this is for show the countdowntimer
	return (
		<View style={styles.workTimeContainer}> 
			<Text style={[styles.textStyle, styles.timeTextColor]}>{props.timer} </Text>
		</View>
	)
	
}

const TimeView = props => { //to set the work time and break time
	
	return (
		<View>
		
			<View style={styles.workTimeContainer}>
				<Text style={styles.textStyle}>Work Time</Text> 
			</View>
			<View style={styles.workTimeContainer}>
			<Text style={styles.subTextStyle}>Mins : </Text> 
			<TextInput style={styles.inputContainer} 
			onChangeText= { (min) => props.setTimes(min,'workMin')}
			value={props.workMins}
			/>
			<Text style={styles.subTextStyle}>Secs : </Text> 
				<TextInput style={styles.inputContainer} 
				onChangeText= { (sec) => props.setTimes(sec,'workSec')}
				value={props.workSecs}
				/>
			</View>
		
			
			<View style={styles.workTimeContainer}>
				<Text style={styles.textStyle}>Break Time</Text> 
			</View>
			<View style={styles.workTimeContainer}>
			<Text style={styles.subTextStyle}>Mins : </Text> 
				<TextInput style={styles.inputContainer} 
				onChangeText= { (min) => props.setTimes(min,'breakMin')}
				value={props.breakMins}
				/>
			<Text style={styles.subTextStyle}>Secs : </Text> 
				<TextInput style={styles.inputContainer} 
				onChangeText= { (sec) => props.setTimes(sec,'breakSec')}
				value={props.breakSecs}
				/>
		</View>
		</View>
	)

}

const ButtonView = props => { //for start stop and reset button
	return (
		<View style={styles.workTimeContainer}>
			{ props.isTimerOn ? 
			<TouchableOpacity style={[styles.buttonView, styles.pauseButton]}
			onPress = {props.stopTimer}>
			<Text>
				Pause
			</Text>
		</TouchableOpacity>
				: 
				<TouchableOpacity style={[styles.buttonView, styles.startButton]}
					onPress = {props.startTimer}>
					<Text>
						Start
					</Text>
				</TouchableOpacity>
			}
			<TouchableOpacity style={[styles.buttonView, styles.resetButton]}
				onPress = {props.resetTimer} >
				<Text>
					Reset
				</Text>
			</TouchableOpacity> 
		</View>
	)
	

}

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			workMins: '25' ,
			workSecs:'0',
			breakMins:'10',
			breakSecs:'0',
			minutes : 25,
			seconds : 0,
			isTimerOn : false,
			timer : "00:00",
			isWorkTime : true
		
		};
		this.interval;
		this.isPhoneVibrate = false;
	}


	componentWillUnmount() {
		clearInterval(this.interval);
	  }

	componentDidMount () {
		this.timerFormatter();
	}
	setTimes = (val,whichTimer) => { // change the state when work time or break time .
		let isWorkTimer ;
		if(+val >= 0){
			switch(whichTimer){
				case 'workMin':
					this.setState ({
						workMins : val
					})
					isWorkTimer = true;
					break;
				case 'workSec' :
					this.setState ({
						workSecs : val
					})
					isWorkTimer = true;
					break;

				case 'breakMin' :
					this.setState ({
						breakMins : val
					})
					isWorkTimer = false;
					break;
				case 'breakSec':
					this.setState ({
						breakSecs : val
					})
					isWorkTimer = false;
					break
				default:
					isWorkTimer = true;
					break
			}

			this.setState( {
				isWorkTime : isWorkTimer,
				minutes : this.state.isWorkTime ? this.state.workMins : this.state.breakMins,
				seconds : this.state.isWorkTime ? this.state.workSecs : this.state.breakSecs
			},this.resetTimer)
			
			if(isWorkTimer){
				this.setState({
					isTimerOn : false
				})
			}
		}
	}

	startTimer = () =>{
		this.setState( prevState => ({
			isTimerOn : true,
			minutes : prevState.minutes,
			seconds : prevState.seconds
		}))

		this.interval = setInterval(() =>this.startCountdownTimer(),1000);
	}

	stopTimer = () => {
		this.setState(prevState => ({
			isTimerOn : false,
			seconds : prevState.seconds,
			minutes : prevState.minutes
		}))
		if(this.isPhoneVibrate){ //when stop button is clicked , vibration will stop.
			Vibration.cancel();
			this.isPhoneVibrate = false;
		}
		clearInterval(this.interval);
	}

	resetTimer = () =>{
		this.setState({
			isTimerOn : false,
			minutes : this.state.isWorkTime ? this.state.workMins : this.state.breakMins,
			seconds : this.state.isWorkTime ? this.state.workSecs : this.state.breakSecs
		},this.timerFormatter);

		clearInterval(this.interval);
		
	}

	startCountdownTimer = () =>{
			if(this.state.seconds > 0 && this.state.minutes >= 0){
				this.setState(prevState => ({
					seconds : prevState.seconds - 1,
				}))
			}
			else{
				if(this.state.minutes > 0){
					this.setState(prevState => ({
						seconds : 59,
						minutes : prevState.minutes - 1
					}))
				}
				else{
					Vibration.vibrate(PATTERN, true); //when time reachs to zero , phone will vibrate
					this.isPhoneVibrate = true;
					clearInterval(this.interval);
				}
				
			}
			this.timerFormatter();
	}

	timerFormatter = () =>{ //to show the time in formatted way.
		let m,s, timer;
		m = this.state.minutes >=10 ? this.state.minutes : ('0'+ this.state.minutes)
		s = this.state.seconds >=10 ? this.state.seconds : ('0'+ this.state.seconds)
		timer = m +':'+s
		this.setState({timer : timer});
	}

  	render() {
		return (
			<ErrorBoundary>
				<View style={styles.mainContainer}>
					
					<Text style={styles.textStyle}>Pomodoro Timer</Text>
					
					<TimeCountdownView  minutes = {this.state.minutes} seconds ={this.state.seconds}
					timer = {this.state.timer}/>
					
					<TimeView workMins = {this.state.workMins} 
						workSecs ={this.state.workSecs}
						breakMins = {this.state.breakMins}
						breakSecs = {this.state.breakSecs}
						setTimes = {this.setTimes}
					/>
					
					<ButtonView resetTimer = {this.resetTimer}
						stopTimer = {this.stopTimer}
						startTimer = {this.startTimer}
						isTimerOn = {this.state.isTimerOn}
					/>
				</View>
			</ErrorBoundary>
		
		);
  }
}

const styles = StyleSheet.create({
	workTimeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop : 40
	},
	inputContainer :{
		height: 30, 
		width:100,
		borderColor: 'gray', 
		borderWidth: 1,
		marginRight : 5
	},
	mainContainer : {
		flex: 1,
		backgroundColor: '#f8faf7',
		alignItems: 'center',
		paddingTop : 50
	},
	buttonView : {
		borderWidth : 5,
		width : 80,
		height : 80,
		borderRadius :40,
		alignItems: 'center',
		justifyContent : 'center',
		marginRight : 40,

	},
	buttonText : {
		fontSize : 40,
		color: 'red',
	},
	circleContainer : {
		paddingTop : 70,
		width: 100,
		height: 100,
		borderRadius: 50,
		textAlign: 'center',
		backgroundColor : 'white',
		borderWidth : 4,
		borderColor : 'blue',
		justifyContent : 'center',
	},
	textStyle :{
		fontSize : 25,
		fontWeight : 'bold'

	},
	subTextStyle :{
		fontSize : 15,
	},
	startButton : {
		borderColor : '#059e30',
	},
	pauseButton : {
		borderColor : '#fc1229',
	},
	resetButton : {
		borderColor : '#ebc109',
	},
	timeTextColor : {
		color : '#09b2eb'
	}

});



//That's All , Thank you foe watching :):)