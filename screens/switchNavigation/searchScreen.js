import React from 'react';
import { StyleSheet,View,TextInput, Image, Button, ImageBackground} from 'react-native';
import {getMovie , getMovieDetails} from '../../serviceApi/omdbAPI'


class SearchMovie extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isSearchIconClicked : false,
            filteredMovieList: null,
            movieString : '',
            isSearching : false
        }
    }
     

    SearchMovie = () => {
        this.setState({
            isSearching : true
        })
        getMovie (this.state.movieString).then ( resp =>{ 
            console.log("Movie response",resp)
            this.setState({
                isSearching : false
            })
            this.props.navigation.navigate('BrowsePage',{
                movieList : resp.Search
            })
        }).catch (err => {
            this.setState({
                isSearching : false
            })
            console.log(err)
        })
        
    }

    setText = (text) => {
        this.setState({
            movieString : text
        })
    }

    render(){
      	return ( 
            <View>
                <ImageBackground source={require('../../assets/bg5.jpg')} 
                style={styles.backgroundImage} resizeMode = {'cover'}>   
                    <View style={styles.container}>
                        <TextInput
                        onChangeText = { (text) => this.setText(text)}
                            style={styles.textInputStyle}
                            value={this.state.movieString}
                            placeholder="Search Here"
                            clearButtonMode='always'
                        />
                        <Button title='Search' onPress = {this.SearchMovie}/>
                    </View> 
                </ImageBackground>
            </View> 
        ); 
    }
}

export default SearchMovie;

const styles = StyleSheet.create({
    container: {
        display : 'flex',
		flexDirection : 'column',
        padding : 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: {
        height: 35,
        width :330,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: 'gray',
        backgroundColor: '#FFFFFF',
        marginRight: 10
      },
      backgroundImage: {
          height :700,
          width :450
    },
    

	   
});