import {useEffect, useState} from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import MovieFrame from './MovieFrame';
import './App.css';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [userChoice, setUserChoice] = useState({});
  const [trailer, setTrailer] = useState("");
  const [landingPage, setLandingPage] = useState("");

  const getMovieData = () => {
    axios({
      url: "https://api.themoviedb.org/3/movie/popular",
        params: {
          api_key: "02a015f767f49fbd46124014022d6a5c"
        }
    })
      .then((res) => {
        // setMovieData will be used to map through all the current popular movies and display them on the page
        setMovieData(res.data.results)

        // setUserChoice will be used to store the movie that the user has selected corresponding to the "See details" that is clicked on
        setUserChoice(res.data.results)
      })
  } 


  useEffect( () => {
    
    getMovieData();

  }, [])


  return (
    <div className='app wrapper'>

      <header className='movieInfoAndVideo'>
        <div className='landingPage'>
            <p>Welcome to Miniplex! A place where you can find movie trailers for the latest popular movies. Select see details for any of the movies below!</p>
        </div>

        <div className='movieInfo'>
          <h1 className='title'>{userChoice.title}</h1>
          <p className='overview'>{userChoice.overview}</p>
          <p className='releaseDate'>{userChoice.release_date}</p>
          <p className='rating'>{userChoice.vote_average}</p>
        </div>

        <div className='videoContainer'>
          <YouTube 
            className={'youtubePlayer'}
            videoId={trailer}
            const opts={{
              width: '100%',
              height: '100%'
            }}
          />
          </div>
      </header>

      <ul className='movieContainer'>
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

