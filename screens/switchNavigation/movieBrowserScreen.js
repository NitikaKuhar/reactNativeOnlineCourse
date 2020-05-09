import React from 'react';
import {  FlatList} from 'react-native';
import  ShowMovieList  from '../../components/showMovieList';
import { getMovieDetails } from '../../serviceApi/omdbAPI'


class MovieBrowseScreen extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			movieList : null,
			isLoading : false
		}
		
    }

	componentDidMount (){
		this.setState({
			movieList : this.props.navigation.state.params.movieList
		})
		this.props.navigation.setParams({movieList : this.state.movieList,
		filterList : this.filterList})
		
	}

	filterList = (filterList) =>{
		this.setState({
			movieList : filterList
		})
	}

	navigateTo = (movie) =>{
		this.setState({
            isLoading : true
        })
        getMovieDetails (movie.imdbID).then ( resp =>{ 
            // console.log("Movie",resp)
            this.setState({
                isLoading : false
            })
            this.props.navigation.navigate('DescriptionPage',{
                movie : resp
            })
        }).catch (err => {
			this.setState({
                isLoading : false
            })
            console.log(err)
        })
	}


    render(){
      	return (
			<FlatList
			data = {this.state.movieList}
			renderItem = {({ item }) => <ShowMovieList list={item} navigateTo={this.navigateTo}/>}
			keyExtractor={item => item.imdbID}
			
			/>
			
		); 
    }
}

export default MovieBrowseScreen;