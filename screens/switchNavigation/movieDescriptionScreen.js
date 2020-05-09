import React from 'react';
import { StyleSheet,View, ScrollView, Text , Image,Dimensions,Linking} from 'react-native';


const { width } = Dimensions.get("window");
let review;

class MovieDetailScreen extends React.Component {

    render(){
      	const item = this.props.navigation.state.params;
      	return (
				
			<ScrollView contentContainerStyle={styles.container}>
					<View style= {styles.imageContainer}>
						<Image 
						source={item.movie.Poster !== 'N/A' ? {uri : item.movie.Poster} : require('../../assets/default.png')}
						style={styles.image }/>
							
						<View style = {{margin : 20, fontSize: 30}}>
								<Text style = {{fontSize: 16, color :'#ad1d3d',fontWeight : 'bold'}}>
									{item.movie.Title}
								</Text>
						</View>
					</View>

					<View style= {styles.detailContainer}>
						
						<View style = {[styles.subItem, styles.alignText]}>
							<Text style = {[styles.styleSubText,styles.yera]}>
							{item.movie.Year}
							</Text>
						</View>
						<View style = {[styles.subItem]}>
							<Text style = {[styles.styleSubText]}>
							{item.movie.Genre}
							</Text>
						</View>
						<View style = {[styles.subItem]}>
							<Text style = {[styles.styleSubText]}>
							{item.movie.Runtime}
							</Text>
						</View>
						
					</View>

					<View style = {styles.flexContainer}>
						<Text style = {{fontSize : 14, fontWeight : 'bold', color :'#0f0f0e'}}>
							Reviews 
						</Text>
						<View>
						{
							(item.movie.Ratings).map((item, key) => {
								return (
										<Text key ={key} style = {{color :'#5c5654'}}>{item.Source}  : 
											<Text style = {{color :'#1815bf'}}> {item.Value} </Text>
										</Text>
								)
							})
						}

						</View>
					</View>

					<View style = {styles.flexContainer}>
						<Text style = {{fontSize : 14, fontWeight : 'bold'}}>
							Cast 
						</Text>
						<View>
							<Text style = {{paddingTop : 10}}>
							<Text style = {{color :'#1815bf'}}>Director : </Text> {item.movie.Director}
							</Text>
							<Text style = {{paddingTop : 10}}>
							<Text style = {{color :'#1815bf'}}>Writer : </Text> {item.movie.Writer}
							</Text>
							<Text style = {{paddingTop : 10}}>
							<Text style = {{color :'#1815bf'}}>Actors : </Text> {item.movie.Actors}
							</Text>
							
						</View>
					</View>

					<View style = {styles.flexContainer}>
						<Text style = {{fontSize : 14, fontWeight : 'bold'}}>
							Released Date 
						</Text>
						<View>
							<Text style = {{color :'#5c5654'}}>
							{item.movie.Released}
							</Text>
							
						</View>
					</View>

					<View style = {styles.flexContainer}>
						<Text style = {{fontSize : 14, fontWeight : 'bold'}}>
							Plot 
						</Text>
						<View>
							<Text style = {{color :'#5c5654'}}>
							{item.movie.Plot}
							</Text>
							
						</View>
					</View>

					<View style = {styles.flexContainer}>
						<Text style = {{fontSize : 14, fontWeight : 'bold'}}>
							For more Informatoin please visit the below link: 
						</Text>
						<View>
						<Text style={{color: 'blue'}}
							onPress={() => Linking.openURL('http://www.starwars.com/episode-iv/')}>
								{item.movie.Title}
						</Text>
							
						</View>
					</View>
				
			</ScrollView>
      	);
    }
  }


const styles = StyleSheet.create({
    container: {
		backgroundColor: '#d3dded',
    },
	image : {
		width: width, 
		height: 500,
		marginLeft : 10,
		alignSelf: 'center',
		
	},
	imageContainer : {
		flex : 1
	},
	detailContainer : {
		flexDirection: 'row',
		justifyContent : 'space-between',
		alignContent: 'space-between',
		padding : 10,
	},
	subItem : {
		padding: 10,
		
	},
	alignText : {
		textAlign : 'left',

	},
	styleSubText : {
		fontSize : 15,
		color : '#038187',
		fontWeight : 'bold'

	},

	flexContainer : {
		display : 'flex',
		flexDirection : 'column',
		alignItems : 'flex-start',
		padding : 10,

	}

});

export default MovieDetailScreen;

