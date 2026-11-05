import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { searchMovies } from "../services/movieApi";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

function SearchResults() {
  const { query } = useParams();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    searchMovies(query, page)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="container">
      <h1 className="page-title">
        Search Results: {decodeURIComponent(query)}
      </h1>

      {loading && <p className="status-message">Searching movies...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
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

export default SearchResults;