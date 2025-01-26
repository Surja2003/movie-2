import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import searchBg from "../assets/netflix_3.jpg";
import { useNavigate } from "react-router-dom"; // We'll use this for redirecting

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [sortOption, setSortOption] = useState("title"); // Default sort by title
  const [page, setPage] = useState(1); // Current page number
  const [inputPage, setInputPage] = useState(""); // For redirecting based on user input

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const navigate = useNavigate();

  const searchMovies = async (query, pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${pageNumber}&type=movie`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
      }
    } catch (error) {
      setError("Unable to fetch movies. Try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const randomMovies = ["Avengers", "Batman", "Spider-Man", "Harry Potter"];
    const randomQuery =
      randomMovies[Math.floor(Math.random() * randomMovies.length)];
    searchMovies(randomQuery, page);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setMovies([]);
      searchMovies(searchTerm, page);
    }
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
    const sortedMovies = [...movies].sort((a, b) => {
      if (e.target.value === "title") {
        return a.Title.localeCompare(b.Title);
      }
      if (e.target.value === "released") {
        return new Date(a.Released) - new Date(b.Released);
      }
      if (e.target.value === "rating") {
        return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
      }
      return 0;
    });
    setMovies(sortedMovies);
  };

  const handleRedirectToPage = () => {
    if (inputPage && !isNaN(inputPage) && inputPage > 0) {
      setPage(Number(inputPage));
      searchMovies(searchTerm, Number(inputPage)); // Redirect and search for that page
    }
  };

  return (
    <div className="mx-8 my-10 font-sans">
      {/* Hero Section */}
      <div
        className="h-64 flex items-center justify-center relative rounded-lg shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url(${searchBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </div>

      {/* Header Section with Sort and Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6">
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all">
            Home
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
            Watchlist
          </button>
        </div>
        <div className="flex gap-4 items-center">
          {/* Sort By Dropdown */}
          <select
            className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
            value={sortOption}
            onChange={handleSort}
          >
            <option value="title">Sort by Title</option>
            <option value="released">Sort by Release Date</option>
            <option value="rating">Sort by IMDb Rating</option>
          </select>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <input
              className="bg-white text-gray-900 px-6 py-3 w-96 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-all"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Movies Section */}
      <div className="mt-12">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Card
                key={movie.imdbID}
                movie={movie}
                isInWatchlist={watchlist.some(
                  (m) => m.imdbID === movie.imdbID
                )}
                addToWatchlist={() => {}}
                removeFromWatchlist={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      {/* Page Redirect Input and Go Button */}
      <div className="flex justify-center mt-6 gap-6">
        <input
          type="number"
          className="bg-white text-gray-900 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none w-24"
          placeholder="Go to page"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
        />
        <button
          onClick={handleRedirectToPage}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Go
        </button>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage(page + 1)}
          className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-all"
        >
          Load More Movies
        </button>
      </div>
    </div>
  );
};

export default Home;
