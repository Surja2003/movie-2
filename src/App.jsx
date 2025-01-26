import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WatchList from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
