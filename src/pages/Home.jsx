
import { useEffect, useState } from "react";
import { getMovies } from "../services/movieApi.js";
import MovieList from "../components/MovieList.jsx";
import Pagination from "../components/Pagination.jsx";

function Home() {
  // Store movies
  const [movies, setMovies] = useState([]);

  // Store current page number
  const [page, setPage] = useState(1);

  // Store total pages
  const [totalPages, setTotalPages] = useState(1);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error message
  const [error, setError] = useState("");

  // Fetch popular movies from TMDB
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovies("popular", page);

        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));

      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [page]);

  return (
    <div className="container">

      {/* Page Heading */}
      <h1 className="page-title">
        Popular Movies
      </h1>

      {/* Loading Message */}
      {loading && (
        <h2 className="status-message">
          Loading movies...
        </h2>
      )}

      {/* Error Message */}
      {!loading && error && (
        <h2 className="error-message">
          {error}
        </h2>
      )}

      {/* Movie List */}
      {!loading && !error && (
        <>
          <MovieList movies={movies} />

          {/* Pagination */}
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

export default Home;
