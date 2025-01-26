import React from "react";
import { Link } from "react-router-dom";

const Card = ({ movie, isInWatchlist, addToWatchlist, removeFromWatchlist }) => {
  return (
    <div className="w-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img
        className="w-full h-96 object-cover"
        src={movie.Poster}
        alt={movie.Title}
      />
      <div className="p-4 text-white">
        <h3 className="font-semibold text-lg">{movie.Title}</h3>
        <p className="text-sm">{movie.Year}</p>
        <div className="mt-4">
          <Link
            to={`/movie/${movie.imdbID}`}
            className="text-red-500 hover:text-red-700 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
