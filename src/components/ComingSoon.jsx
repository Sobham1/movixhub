import { useEffect, useState } from "react";
import { getUpcomingMovies } from "../services/api.js";
import "../css/ComingSoon.css";

// import "../css/ComingSoon.css";

function ComingSoon({ scrollRef }) {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const movies = await getUpcomingMovies();
      setUpcoming(movies);
    };
    fetchUpcoming();
  }, []);

  return (
    <div className="coming-soon" ref={scrollRef}>
      <h2>🎬 Coming Soon</h2>
      <div className="movie-grid">
        {upcoming.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h4>{movie.title}</h4>
            <p>Releases: {movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComingSoon;
