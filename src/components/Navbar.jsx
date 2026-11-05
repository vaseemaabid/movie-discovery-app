import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MovieDb
      </Link>

      <div className="nav-links">
        <Link to="/">Popular</Link>
        <Link to="/top-rated">Top Rated</Link>
        <Link to="/upcoming">Upcoming</Link>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Navbar;