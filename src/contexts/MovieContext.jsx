import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase"; // Firebase Auth

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
useEffect(() => {
  if (!currentUser) {
    setFavorites([]);
  }
}, [currentUser]);
  // Track Firebase login state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Load favorites from localStorage (only on load)
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add movie to favorites (requires login)
  const addToFavorites = movie => {
    if (!currentUser) {
      alert("Please log in to add favorites.");
      return;
    }
    setFavorites(prev => [...prev, movie]);
  };

  // Remove movie from favorites
  const removeFromFavorites = movieId => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  // Check if a movie is already favorited
  const isFavorite = movieId => {
    return favorites.some(movie => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    currentUser
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
