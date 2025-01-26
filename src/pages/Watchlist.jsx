import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const removeFromWatchlist = (imdbID) => {
    const newWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  return (
    <div className="mx-8 my-12 font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-white">Watchlist</h1>
        <Link
          to="/"
          className="text-red-500 hover:text-red-700 text-lg"
        >
          Back to Home
        </Link>
      </div>

      {/* Watchlist Content */}
      <div className="flex flex-wrap gap-6">
        {watchlist.length === 0 ? (
          <p className="text-white">No movies in your watchlist</p>
        ) : (
          watchlist.map((movie) => (
            <Card
              key={movie.imdbID}
              movie={movie}
              isInWatchlist={true}
              removeFromWatchlist={removeFromWatchlist}
              addToWatchlist={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
