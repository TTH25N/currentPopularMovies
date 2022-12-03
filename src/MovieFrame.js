
const MovieFrame = (props) => {

const movieUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face"

    return (
        <ul className="movieContainer">
            {props.movie.map((movieInfo) => {
                return (
                <li>
                    <img src={movieUrl + movieInfo.poster_path} alt="" />
                    <p className="movieTitle">{movieInfo.original_title}</p>
                    <button>See Details</button>
                </li>
                )
            })}
        </ul>
    )
}

export default MovieFrame;