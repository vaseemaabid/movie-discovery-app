
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

// Get Popular, Top Rated and Upcoming Movies
export async function getMovies(category, page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movies");
  }

  return await response.json();
}

// Get Movie Details
export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movie details");
  }

  return await response.json();
}

// Get Movie Cast
export async function getMovieCredits(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movie cast");
  }

  return await response.json();
}

// Search Movies
export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Unable to search movies");
  }

  return await response.json();
}
