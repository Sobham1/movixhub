import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites, currentUser } = useMovieContext();

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12 mt-10">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Your Favorites
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Movies you’ve saved for later.
        </p>
      </div>

      {/* Not Logged In State */}
      {!currentUser && favorites.length === 0 && (
        <div className="
          flex flex-col items-center justify-center
          py-24
          text-center
          bg-slate-900/40
          backdrop-blur-xl
          border border-white/5
          rounded-2xl
        ">
          <h3 className="text-xl text-white font-medium">
            Login to save your favorites
          </h3>

          <p className="text-gray-400 text-sm mt-3 max-w-md">
            Create an account to keep track of movies you love.
          </p>

          <Link
            to="/login"
            className="
              mt-6
              px-6 py-3
              bg-red-600
              hover:bg-red-500
              rounded-xl
              text-white
              font-medium
              transition
            "
          >
            Login Now
          </Link>
        </div>
      )}

      {/* Empty Logged-In State */}
      {currentUser && favorites.length === 0 && (
        <div className="
          flex flex-col items-center justify-center
          py-24
          text-center
          bg-slate-900/40
          backdrop-blur-xl
          border border-white/5
          rounded-2xl
        ">
          <h3 className="text-xl text-white font-medium">
            No favorites yet
          </h3>

          <p className="text-gray-400 text-sm mt-3 max-w-md">
            Browse movies and tap the ❤️ icon to add them here.
          </p>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <div className="
          grid
          gap-10
          grid-cols-[repeat(auto-fit,minmax(200px,240px))]
        ">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Favorites;
