import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  const addToWatchlist = (movie) => {
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (imdbID) => {
    const newWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  if (loading) return <p className="text-white">Loading...</p>;

  if (!movie) return <p className="text-white">Movie not found!</p>;

  const isInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="mx-8 my-12">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="text-white md:w-2/3">
          <h2 className="text-3xl font-semibold mb-4">{movie.Title}</h2>
          <p className="text-lg mb-2">Released: {movie.Released}</p>
          <p className="text-lg mb-2">Director: {movie.Director}</p>
          <p className="text-lg mb-2">IMDb Rating: {movie.imdbRating}</p>

          {/* Genre */}
          <p className="text-lg mb-2">Genre: {movie.Genre}</p>

          {/* Plot */}
          <p className="text-lg mb-4">{movie.Plot}</p>

          {/* Target Audience */}
          <p className="text-lg mb-4">
            <strong>Target Audience:</strong> {movie.Rated}
          </p>

          {/* Actor Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Cast:</h3>
            <div className="flex gap-4">
              {movie.Actors.split(", ").map((actor, index) => (
                <div key={index} className="text-center">
                  {/* Actor Image Placeholder */}
                  <img
                    src={`https://www.imdb.com/name/${actor.replace(/\s+/g, '')}/`}
                    alt={actor}
                    className="w-16 h-16 rounded-full border-2 border-gray-300 mb-2"
                  />
                  <p>{actor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Movie Buttons Section */}
          <div className="flex gap-4 mt-6">
            {/* Watch Now Button */}
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
              onClick={() => alert("Watch Now")}
            >
              Watch Now
            </button>

            {/* Add to Watchlist Button */}
            <button
              className={`${
                isInWatchlist ? "bg-red-600" : "bg-gray-700"
              } text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all`}
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(movie.imdbID);
                } else {
                  addToWatchlist(movie);
                }
              }}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>

            {/* Download Movie Button */}
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              onClick={() => alert("Downloading movie...")}
            >
              Download Movie
            </button>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="text-red-500 hover:text-red-700 mt-6 inline-block"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default MovieDetails;
