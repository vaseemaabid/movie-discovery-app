import { useEffect, useState } from "react";
import { getMovies } from "../services/movieApi";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getMovies("upcoming", page)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="container">
      <h1 className="page-title">Upcoming Movies</h1>

      {loading ? (
        <p className="status-message">Loading movies...</p>
      ) : (
        <>
          <MovieList movies={movies} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default Upcoming;