import { useState, useEffect } from "react";
import { getMovieTrailer } from "./services/api";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import ComingSoon from "./components/ComingSoon";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import About from "./pages/About";
function App() {
  const [activeTrailer, setActiveTrailer] = useState(null);

const handlePlayTrailer = async (movieId) => {
  const key = await getMovieTrailer(movieId);
  if (key) {
    setActiveTrailer(key);
  }
};
  return (
    <MovieProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <NavBar />
     <main className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">



        <Routes>
          <Route path="/" element={<Home onPlayTrailer={handlePlayTrailer} />} />
          <Route path="/search" element={<Search onPlayTrailer={handlePlayTrailer} />} />
          <Route path="/favorites" element={<Favorites onPlayTrailer={handlePlayTrailer} />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
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
        className="absolute top-3 right-3 text-white text-xl z-10"
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
      </main>
      <footer className="
  mt-16
  border-t border-white/10
  bg-slate-900/40
  backdrop-blur-md
">
  <div className="
    max-w-7xl mx-auto
    px-4 sm:px-6
    py-6
    text-center
    text-gray-400 text-sm
  ">
    © {new Date().getFullYear()} Sobham Sandilya · Jorhat Engineering College
  <div className="flex justify-center gap-6 mb-2 text-gray-400 text-sm">
  <a href="https://github.com/Sobham1" target="_blank" className="hover:text-white transition">
    GitHub
  </a>
  <a href="https://linkedin.com/in/sobham-sandilya" target="_blank" className="hover:text-white transition">
    LinkedIn
  </a>
</div>
  </div>
  
</footer>
      </div>
    </MovieProvider>
  );
}

export default App;
