import React from 'react';
import { StyleSheet, ScrollView, Text, View} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';


class Cast extends React.Component {

    render(){
      	return (
				<ScrollView style={styles.item}>
				
					<View style = {styles.horizontal}>
						
						<Text>{movie.Title}</Text>
						
					</View>
				
				</ScrollView>
		);
    }
}

class Description extends React.Component {

    render(){
      	return (
				<ScrollView style={styles.item}>
				
					<View style = {styles.horizontal}>
						
						<Text>{movie.Title}</Text>
						
					</View>
				
				</ScrollView>
		);
    }
}

class Review extends React.Component {

    render(){
      	return (
				<ScrollView style={styles.item}>
				
					<View style = {styles.horizontal}>
						
						<Text>{movie.Title}</Text>
						
					</View>
				
				</ScrollView>
		);
    }
}


const MovieDetailTabNavigator  = createMaterialTopTabNavigator ({
	Cast : Cast,
	Description : Description,
	Review : Review

});

export function Tab () {
    return (
        <NavigationContainer>
            <MovieDetailTabNavigator />
        </NavigationContainer>
    )
};


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