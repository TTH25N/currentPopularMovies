import {useEffect, useState} from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import MovieFrame from './MovieFrame';
import './App.css';

function App() {

  const [movieData, setMovieData] = useState([]);
  const [userChoice, setUserChoice] = useState({});
  const [trailer, setTrailer] = useState("");
  const [placeholder, setPlaceholder] = useState([])

  const getMovieData = () => {
    axios({
      url: "https://api.themoviedb.org/3/movie/now_playing",
        params: {
          api_key: "02a015f767f49fbd46124014022d6a5c"
        }
    })
      .then((res) => {
        // setMovieData will be used to map through all the current popular movies and display them on the page
        setMovieData(res.data.results)

        // setUserChoice will be used to store the movie that the user has selected corresponding to the "See details" that is clicked on
        setUserChoice(res.data.results[0])
        setPlaceholder(res.data.results)

      })
  } 

  const getLandingPageVideo = () => {
    axios({
      url: `https://api.themoviedb.org/3/movie/${movieData[0].id}/videos`,
        params: {
          api_key: "02a015f767f49fbd46124014022d6a5c",
          append_to_response: "videos"
        }
    })
      .then((res) => {
          console.log(res.data.results);

          const landingPageTrailer = res.data.results.filter((landingTrailer) => {
            return landingTrailer.name === "Official Trailer" || landingTrailer.type === "Trailer"
          })

          setTrailer(landingPageTrailer[0].key)
      })
  }


  useEffect( () => {
    getMovieData();

  }, [])


  // useEffect( () => {
  //   if(movieData.length !== 0) {
  //     getLandingPageVideo()
  //   }

  // }, [userChoice])


  return (
    <div className='app'>

      <header className='wrapper'>
        <h1>Welcome to Miniplex</h1>
        <div className='movieInfoAndVideo'>

          <div className='movieInfo'>
            <h2 className='movieTitle'>{userChoice.title}</h2>
            <p className='overview'>{userChoice.overview}</p>
            <p className='releaseDate'>Date of Release: {userChoice.release_date}</p>
            <p className='rating'>{userChoice.vote_average}</p>
          </div>

          <div className='videoContainer'>
            <YouTube 
              className={'youtubePlayer'}
              videoId={trailer}
              opts={{
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
      </header>

      <h2 className='movieListTitle'>Here's What's Playing</h2>

      <ul className='movieListContainer wrapper'>
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

      <footer>
        <p>Created at <a href='https://junocollege.com/'>Juno College</a> using the MovieDB API</p>
        <p>By Thomas Huynh</p>
      </footer>
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

