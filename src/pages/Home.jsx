import { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";
import ComingSoon from "../components/ComingSoon";
import { getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const upcomingRef = useRef(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load popular movies.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  return (
    <div className="home">
      <button
        className="coming-soon-btn"
        onClick={() => upcomingRef.current?.scrollIntoView({ behavior: "smooth" })}
      >
        Coming Soon 🔻
      </button>

      <h2
        className="home-title"
        style={{
          fontFamily: "Lucida Console",
          fontSize: "1.8rem",
          marginLeft: "30px",
        }}
      >
        📽️ Popular Movies
      </h2>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div
          className="loading"
          style={{ fontFamily: "Lucida Console", fontSize: "1.2rem" }}
        >
          Loading...
        </div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <div>
        <ComingSoon scrollRef={upcomingRef} />
      </div>
    </div>
  );
}

export default Home;
