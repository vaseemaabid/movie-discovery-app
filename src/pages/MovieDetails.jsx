import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
} from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
    ])
      .then(([movieData, creditsData]) => {
        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading movie details...</p>;
  }

  if (!movie) {
    return <p className="error-message">Movie details not found.</p>;
  }

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const formatMoney = (amount) =>
    amount ? `$${amount.toLocaleString("en-US")}` : "Not available";

  return (
    <div className="movie-details">

      {backdrop && (
        <div
          className="movie-backdrop"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
      )}

      <div className="details-content">

        {poster && (
          <img
            src={poster}
            alt={movie.title}
            className="details-poster"
          />
        )}

        <div className="details-info">
          <h1>{movie.title}</h1>

          <p className="tagline">{movie.tagline}</p>

          <p>
            ⭐ Rating: {movie.vote_average?.toFixed(1)}/10
          </p>

          <p>Release Date: {movie.release_date || "Unknown"}</p>

          <p>Runtime: {movie.runtime ? `${movie.runtime} minutes` : "Not available"}</p>

          <p>
            Genres: {movie.genres?.map((genre) => genre.name).join(", ") || "Not available"}
          </p>

          <h2>Overview</h2>
          <p>{movie.overview || "Description not available."}</p>

          <h2>Box Office Information</h2>
          <p>Budget: {formatMoney(movie.budget)}</p>
          <p>Revenue: {formatMoney(movie.revenue)}</p>
        </div>
      </div>

      <section className="cast-section">
        <h2>Cast and Actors</h2>

        <div className="cast-list">
          {cast.map((actor) => (
            <div className="cast-card" key={actor.cast_id || actor.credit_id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "https://placehold.co/185x278?text=No+Image"
                }
                alt={actor.name}
              />

              <h3>{actor.name}</h3>
              <p>{actor.character || "Unknown role"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;