import axios from "axios";
import { useState } from "react";
import api from "../api/api.js";
import MovieList from "../components/MovieList/MovieList.jsx";
import styles from './MoviesPage.module.css'

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setMovies([]);
    setSubmitted(false);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          api.key
        }&query=${encodeURIComponent(query)}`
      );
      setMovies(response.data.results);
    } catch (error) {
      setError("Failed to fetch movies. Please try again..", error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Search movies</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input className={styles.input}
          type="text"
          placeholder="Enter movie title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && submitted && movies.length === 0 && (
        <p>No movies found. Try a diffrent search term.</p>
      )}
      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
export default MoviesPage;
