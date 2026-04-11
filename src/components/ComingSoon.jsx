import { useEffect, useState } from "react";
import { getUpcomingMovies } from "../services/api";
import ComingSoonCard from "../components/ComingSoonCard";

function ComingSoon({ scrollRef }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUpcoming = async () => {
      try {
        const upcoming = await getUpcomingMovies();
        setMovies(upcoming);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUpcoming();
  }, []);

  return (
    <div ref={scrollRef} className="mt-28 space-y-10">

      {/* Section Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Coming Soon
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Upcoming movies you shouldn’t miss.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-gray-400 animate-pulse">
          Loading upcoming movies...
        </div>
      )}

      {/* Grid */}
      {!loading && (
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
">

          {movies.map(movie => (
            <ComingSoonCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

    </div>
    
  );
  
}

export default ComingSoon;
