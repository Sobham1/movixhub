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
  const [showLoginToast, setShowLoginToast] = useState(false);

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
  setShowLoginToast(true);
  setTimeout(() => setShowLoginToast(false), 2500);
  return;
}


    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  return (
    <div className="group relative w-full">

  {/* Card */}
 <div
  className="group relative w-full fade-up"
  style={{ animationDelay: `${Math.random() * 0.3}s` }}
>


    {/* Poster */}
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="w-full aspect-[2/3] object-cover transition duration-700 group-hover:scale-105"

    />

    {/* Gradient fade bottom */}
    <div className="
      absolute inset-x-0 bottom-0
      h-28
      bg-gradient-to-t
      from-black/80
      via-black/40
      to-transparent
    " />

    {/* Info Overlay */}
    <div className="
      absolute bottom-4 left-4 right-4
      text-white
      opacity-0
      translate-y-4
      transition duration-500
      group-hover:opacity-100
      group-hover:translate-y-0
    ">
{/* Play Button Overlay */}
<button
  onClick={() => setShowTrailer(true)}
  className="
    absolute inset-0
    flex items-center justify-center
    opacity-0 group-hover:opacity-100
    transition duration-300
  "
>
  <div className="
    w-14 h-14
    rounded-full
    bg-white/20
    backdrop-blur-md
    flex items-center justify-center
    text-white
    text-xl
    hover:scale-110
    transition
  ">
    ▶
  </div>
</button>
{/* 🎬 TRAILER MODAL GOES HERE */}
    {showTrailer && trailerKey && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

        <div className="relative w-[90%] max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">

          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-3 right-3 text-white text-xl z-10"
          >
            ✕
          </button>

          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )}
  
     <h3 className="text-lg font-semibold tracking-tight">
  {movie.title}
</h3>


      <p className="text-sm text-gray-300">
        {movie.release_date?.split("-")[0]}
      </p>

    </div>

    {/* Favorite Button (Minimal Floating Dot) */}
    <button
      onClick={onFavoriteClick}
      className={`
        absolute top-4 right-4
        w-9 h-9
        rounded-full
        flex items-center justify-center
        backdrop-blur-md
        bg-black/40
        border border-white/10
        text-lg
        transition duration-300
        ${favorite ? "text-red-500" : "text-white"}
        hover:scale-110
      `}
    >
      ♥
    </button>

  </div>
  {showLoginToast && (
  <div className="
    fixed bottom-6 left-1/2 -translate-x-1/2
    bg-slate-900/90
    backdrop-blur-lg
    border border-white/10
    text-white
    px-6 py-3
    rounded-xl
    shadow-2xl
    text-sm
    z-50
    animate-fadeIn
  ">
    Login required to add favorites
  </div>
)}

</div>

  );
}

export default MovieCard;
