import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="favorites" style={{ fontFamily: "Lucida Console",border:"2px solid gray",borderStyle:"double",borderRadius:"10px",padding:"20px",marginTop:"20px" }}>
        <h2 style={{color:"gray",textDecorationLine:"underline",textDecorationColor:"gray"}}>Your Favorites...</h2>
        <div className="movies-grid" style={{marginTop: "20px"}}>
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;