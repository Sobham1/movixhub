import "../css/MovieCard.css";
import { getMovieTrailer } from "../services/api.js";
import { useMovieContext } from "../contexts/MovieContext";
import { useState, useEffect } from "react";

function MovieCard({ movie }) {
  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    currentUser
  } = useMovieContext();

  const favorite = isFavorite(movie.id);

  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch trailer when requested
  useEffect(() => {
    if (!showTrailer) return;

    const fetchTrailer = async () => {
      const key = await getMovieTrailer(movie.id);
      setTrailerKey(key);
    };

    fetchTrailer();
  }, [showTrailer, movie.id]);

  // Handle favorite click
  const onFavoriteClick = e => {
    e.preventDefault();
    if (!currentUser) {
      alert("Login required to favorite movies.");
      return;
    }

    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>

      <button
        className="trailer-btn"
        onClick={() => setShowTrailer(prev => !prev)}
      >
        {showTrailer ? "Hide Trailer" : "Watch Trailer ▶️"}
      </button>

      {showTrailer && trailerKey && (
        <div className="trailer-preview">
          <iframe
            width="100%"
            height="200"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
