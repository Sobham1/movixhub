import { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";
import ComingSoon from "../components/ComingSoon";
import { getPopularMovies } from "../services/api";



function Home({onPlayTrailer}) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const upcomingRef = useRef(null);
  const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [showTopBtn, setShowTopBtn] = useState(false);
const [activeTrailer, setActiveTrailer] = useState(null);

// const handlePlayTrailer = async (movieId) => {
//   const key = await getMovieTrailer(movieId);
//   if (key) {
//     setActiveTrailer(key);
//   }
// };
const loadMovies = async (pageNumber) => {
  try {
    const newMovies = await getPopularMovies(pageNumber);

    if (newMovies.length === 0) {
      setHasMore(false);
      return;
    }

    setMovies(prev => [...prev, ...newMovies]);
  } catch (err) {
    setError("Failed to load popular movies.");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 400) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  loadMovies(page);
}, []);



  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10 space-y-12 sm:space-y-16">

    {/* Section Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white text-center sm:text-left">
        Popular Movies
      </h2>

      <button
        onClick={() =>
          upcomingRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        className="
          text-sm
          px-4 py-2
          rounded-xl
          bg-slate-800/60
          backdrop-blur-md
          border border-white/10
          text-gray-300
          hover:text-white
          transition
          self-center sm:self-auto
        "
      >
        Coming Soon ↓
      </button>
    </div>
        
    {/* Error */}
    {error && (
      <div className="text-red-400 text-sm text-center">
        {error}
      </div>
    )}

    {/* Loading */}
    {loading ? (
      <div className="text-gray-400 text-center animate-pulse">
        Loading movies...
      </div>
    ) : (
      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        gap-x-4
        gap-y-8
        sm:gap-x-8
        sm:gap-y-12
      ">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPlayTrailer={onPlayTrailer}
          />
        ))}
      </div>
    )}

    {/* Load More */}
    {hasMore && !loading && (
      <div className="flex justify-center mt-10 sm:mt-16">
        <button
          onClick={async () => {
            const nextPage = page + 1;
            setPage(nextPage);
            await loadMovies(nextPage);
          }}
          className="
            px-6 sm:px-8
            py-3
            rounded-xl
            bg-slate-800/70
            backdrop-blur-md
            border border-white/10
            text-white
            hover:bg-white/10
            transition
            text-sm sm:text-base
          "
        >
          Load More
        </button>
      </div>
    )}

    {/* Coming Soon */}
    <div>
      <ComingSoon scrollRef={upcomingRef} />
    </div>

    {/* Scroll To Top */}
    {showTopBtn && (
      <button
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="
          fixed bottom-6 right-4
          sm:bottom-8 sm:right-8
          w-11 h-11 sm:w-12 sm:h-12
          rounded-full
          bg-slate-800/80
          backdrop-blur-xl
          border border-white/10
          text-white
          shadow-2xl
          flex items-center justify-center
          hover:scale-110
          transition
          z-50
        "
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    )}

    {/* Trailer Modal */}
    {activeTrailer && (
      <div
        onClick={() => setActiveTrailer(null)}
        className="
          fixed inset-0
          bg-black/80
          backdrop-blur-md
          flex items-center justify-center
          z-[100]
        "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            w-full
            max-w-5xl
            mx-4
            aspect-video
            rounded-xl
            overflow-hidden
            shadow-2xl
            bg-black
          "
        >
          <button
            onClick={() => setActiveTrailer(null)}
            className="
              absolute top-3 right-3
              text-white text-xl
              z-10
            "
          >
            ✕
          </button>

          <iframe
            src={`https://www.youtube.com/embed/${activeTrailer}?autoplay=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )}

  </div>
);
}

export default Home;
