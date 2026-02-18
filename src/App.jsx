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
  return (
    <MovieProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <NavBar />
      <main className="min-h-screen pt-28 pb-16 px-6">



        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      </div>
    </MovieProvider>
  );
}

export default App;
