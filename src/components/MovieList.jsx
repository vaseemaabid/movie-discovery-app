import MovieCard from "./MovieCard.jsx";

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className="status-message">No movies found.</p>;
  }

  return (
    <div
      className="movie-list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "20px",
        width: "100%",
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;