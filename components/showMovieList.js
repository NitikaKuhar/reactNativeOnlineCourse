import React from 'react';
import { StyleSheet, ScrollView, Text, View,
	TouchableOpacity,Image} from 'react-native';


class ShowMovieList extends React.Component {

	sentDataToDetailScreen = () => {
		this.props.navigateTo(this.props.list);

	}
   
    render(){
		const movie = this.props.list;
      	return (
			<TouchableOpacity onPress={this.sentDataToDetailScreen}>
				<ScrollView style={styles.item}>
				
					<View style = {styles.horizontal}>
						<View>
							<Image 
							source={movie.Poster !== 'N/A' ? {uri : movie.Poster} : require('../assets/default.png')} 
							style={styles.image }/>
						</View>
						
						<View style= {styles.text}>
							<Text>{movie.Title}</Text>
							<Text>Year: {movie.Year}</Text>
						</View>
						
					</View>
				
				</ScrollView>
			</TouchableOpacity> 
		);
    }
}


const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth : 4
    },
    item: {
		backgroundColor: '#d3dded',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	image : {
		width: 120, 
		height: 200,
		marginLeft : 10,
		alignSelf: 'center',
		
	},
	horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
	  },
	  text : {
		  	paddingLeft : 70,
			paddingRight : 10,
		  	justifyContent: "space-around",
	  }
	
});

export default ShowMovieList;