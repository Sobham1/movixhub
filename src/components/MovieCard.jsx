import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useState, useEffect } from "react";

function MovieCard({ movie,onPlayTrailer }) {
  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    currentUser
  } = useMovieContext();

  const favorite = isFavorite(movie.id);

  //const [trailerKey, setTrailerKey] = useState(null);
  //const [showTrailer, setShowTrailer] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);



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
      opacity-100 sm:opacity-0
translate-y-0 sm:translate-y-4
sm:group-hover:opacity-100
sm:group-hover:translate-y-0

    ">
{/* Play Button Overlay */}
 <button
  onClick={() => onPlayTrailer(movie.id)}
  className="
    absolute inset-0
    flex items-center justify-center
    opacity-100 sm:opacity-0 sm:group-hover:opacity-100
    transition duration-300
  "
>
  <div className="
   w-12 h-12 sm:w-14 sm:h-14

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
