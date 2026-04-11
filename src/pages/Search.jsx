import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function Search({onPlayTrailer}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  //  Auto suggestions while typing (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const movies = await searchMovies(searchQuery);
        setSuggestions(movies.slice(0, 5)); // limit suggestions
      } catch (err) {
        console.error(err);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearch = async (query = searchQuery) => {
  if (!query.trim()) return;

  setLoading(true);
  setShowSuggestions(false);
  setHasSearched(true); //important

  try {
    const movies = await searchMovies(query);
    setResults(movies);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">

      {/* Title */}
     <div className="text-center">
  <h2 className="text-3xl font-semibold tracking-tight text-white">
    Search Movies
  </h2>
  <p className="text-gray-400 mt-2 text-sm">
    Find your favorite films instantly.
  </p>
</div>


      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mx-auto">

        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="
            w-full
            bg-slate-800/60
            backdrop-blur-md
            border border-white/10
            rounded-xl
            px-5 py-3
            text-white
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-red-500/60
            transition
          "
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="
            absolute
            mt-2
            w-full
            bg-slate-900/80
            backdrop-blur-xl
            border border-white/10
            rounded-xl
            shadow-2xl
            overflow-hidden
            z-50
          ">
            {suggestions.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  setSearchQuery(movie.title);
                  handleSearch(movie.title);
                }}
                className="
                  px-4 py-3
                  text-sm text-gray-300
                  hover:bg-white/10
                  hover:text-white
                  cursor-pointer
                  transition
                "
              >
                {movie.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-gray-400 animate-pulse">
          Searching movies...
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="
  grid
  grid-cols-2
  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-5
  gap-x-4
  gap-y-8
  sm:gap-x-8
  sm:gap-y-12
  justify-center
  
">

          {results.map(movie => (
            <MovieCard key={movie.id} movie={movie} 
            onPlayTrailer={onPlayTrailer}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && hasSearched && results.length === 0 && (
        <div className="text-gray-500 text-sm text-center">
          No results found.
        </div>
      )}

    </div>
  );
}

export default Search;
