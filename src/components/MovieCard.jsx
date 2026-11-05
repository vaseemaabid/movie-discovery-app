
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Poster";

  return (
    <div className="movie-card">

      <Link to={`/movie/${movie.id}`}>
        <img
          src={imageUrl}
          alt={movie.title}
          className="movie-poster"
        />
      </Link>

      <div className="movie-info">

        <h3>{movie.title}</h3>

        <p>
          ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
        </p>

        <p>
          Release: {movie.release_date || "Unknown"}
        </p>

      </div>

    </div>
  );
}

export default MovieCard;
