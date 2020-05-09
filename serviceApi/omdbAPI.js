const MAIN_URL = 'http://www.omdbapi.com/?';
const API_KEY = 'cc7adb24';



export const  getMovie = async (searchStr) => {
    return fetch(`${MAIN_URL}s=${searchStr}&apikey=${API_KEY}`).then(res => {
        // console.log("omdbApi",res)
        return res.json();
    })
    
}

export const getMovieDetails = (imdbID) => {
    return fetch(`${MAIN_URL}i=${imdbID}&apikey=${API_KEY}`).then(res => {
        return res.json();
    })
}