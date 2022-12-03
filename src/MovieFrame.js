
const MovieFrame = (props) => {

    const movieUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face"

    const handleClick = () => {
        props.setUserChoice(props.movie)
    }

    return(
        <li>
            <img src={movieUrl + props.movie.poster_path} alt=""/>
            <p>{props.movie.title}</p>
            <button onClick={handleClick}>See details</button>
        </li>
    )
}

export default MovieFrame;