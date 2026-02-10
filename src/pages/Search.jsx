// src/pages/Search.jsx
import { useState } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../css/Home.css"; // reuse same styles if needed

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const movies = await searchMovies(searchQuery);
      setResults(movies);
      setError(null);
    } catch (err) {
      setError("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
       <button type="submit" className="search-button-img">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M10 2a8 8 0 105.293 14.293l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 0010 2z" />
  </svg>
</button>

      </form>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
