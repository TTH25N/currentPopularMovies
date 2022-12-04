import {useEffect, useState} from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import MovieFrame from './MovieFrame';
import './App.css';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [userChoice, setUserChoice] = useState({});
  const [trailer, setTrailer] = useState("");

  const getMovieData = () => {
    axios({
      url: "https://api.themoviedb.org/3/movie/popular",
        params: {
          api_key: "02a015f767f49fbd46124014022d6a5c"
        }
    })
      .then((res) => {
        // console.log(res)
        setMovieData(res.data.results)
        setUserChoice(res.data.results[0])
      })
  } 

  useEffect( () => {
    
    getMovieData();

  }, [])



  return (
    <div className="app wrapper">

      <header className='movieInfo'>
        <h1>{userChoice.title}</h1>
        <p>{userChoice.overview}</p>
        <p>{userChoice.release_date}</p>
        <p>{userChoice.vote_average}/10</p>
        <YouTube 
          videoId={trailer}
        />
      </header>

      <ul className="movieContainer">
        {movieData.map((movie) => {
          return (
            <MovieFrame
              key={movie.id}
              movie={movie}
              setUserChoice={setUserChoice}
              setTrailer={setTrailer}
            />
          )
        })}
      </ul>

    </div>
  )
}

export default App;


// Create a variable to store the popular movies link
// Create a piece of state to hold the final url for each movie poster to be rendered on the page with the movie data (overview, release date, average rating)
// Assign two variables, one to hold the movie title and the other to hold the movie data which will be displayed when the button is clicked
// Make a call to the API to return the ten current most popular movies
// Once the data is returned, map through each movie and retrieve the movie poster endpoint
// Return the movie poster endpoint appended to the end of the popular movies URL
// Create a new component for the movie frame which will hold each movie poster, title, and button
// Create an onClick event for the button to trigger a display of the movie overview, release date, and average rating

