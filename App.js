import React from 'react';
import { createAppContainer}  from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import  MovieBrowseScreen from './screens/switchNavigation/movieBrowserScreen'
import  MovieDetailScreen from './screens/switchNavigation/movieDescriptionScreen';
import  SearchMovie from './screens/switchNavigation/searchScreen';


const AppNavigator = createStackNavigator (
	{

		'SearchPage' : {
			screen : SearchMovie,
			navigationOptions : () => ({
				headerTitle : 'Search'
			})
		},
		'BrowsePage': {
			screen : MovieBrowseScreen,
			navigationOptions : () => ({
				headerTitle : 'Movies'
			})
		},
		'DescriptionPage' : {
			screen : MovieDetailScreen,
			navigationOptions : () => ({
				headerTitle : 'Description'
			})
		}
	},
	{
		initialRouteName : 'SearchPage'
	}
);




const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return (
      <AppContainer />
    );
  }
  
}

