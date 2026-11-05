import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import TopRated from "./pages/TopRated.jsx";
import Upcoming from "./pages/Upcoming.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Header on every page */}
        <Navbar />

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/top-rated" element={<TopRated />} />

          <Route path="/upcoming" element={<Upcoming />} />

          <Route path="/search/:query" element={<SearchResults />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;