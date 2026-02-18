import { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";
import ComingSoon from "../components/ComingSoon";
import { getPopularMovies } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const upcomingRef = useRef(null);
  const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [showTopBtn, setShowTopBtn] = useState(false);

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
    <div className="max-w-7xl mx-auto px-6 space-y-12">

  {/* Section Header */}
  <div className="flex items-center justify-between">
   <h2 className="text-4xl font-semibold tracking-tight text-white">
  Popular Movies
</h2>


    <button
      onClick={() => upcomingRef.current?.scrollIntoView({ behavior: "smooth" })}
      className="
        text-sm
        px-4 py-2
        rounded-xl
        bg-slate-800/50
        backdrop-blur-md
        border border-white/10
        text-gray-300
        hover:text-white
        transition
      "
    >
      Coming Soon ↓
    </button>
  </div>


      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div
          className="loading"
          style={{ fontFamily: "Lucida Console", fontSize: "1.2rem" }}
        >
          Loading...
        </div>
      ) : (
        <div className="
  grid
  grid-cols-2
  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-5
  xl:grid-cols-6
  gap-x-8
  gap-y-12
">
  {movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ))}
</div>

      )}
{hasMore && (
  <div className="flex justify-center mt-16">
    <button
      onClick={async () => {
  const nextPage = page + 1;
  setPage(nextPage);
  await loadMovies(nextPage);
}}

      className="
        px-8 py-3
        rounded-xl
        bg-slate-800/60
        backdrop-blur-md
        border border-white/10
        text-white
        hover:bg-white/10
        transition
      "
    >
      Load More
    </button>
  </div>
)}

      <div>
        <ComingSoon scrollRef={upcomingRef} />
      </div>
      {showTopBtn && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="
      fixed bottom-8 right-8
      w-12 h-12
      rounded-full
      bg-slate-800/70
      backdrop-blur-xl
      border border-white/10
      text-white
      shadow-2xl
      flex items-center justify-center
      hover:scale-110
      transition duration-300
      z-50
    "
  >
  <svg
  className="w-5 h-5"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  viewBox="0 0 24 24"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
</svg>

  </button>
)}

    </div>
  );
}

export default Home;
