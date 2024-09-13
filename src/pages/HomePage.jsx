import { useEffect, useState } from "react"
import api from '../api/api.js'
import axios from "axios";
import MovieList from '../components/MovieList/MovieList.jsx';
import styles from './HomePage.module.css'

const HomePage = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading(true);
            setError(null);

            try {
                const apiKey = api.key;
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
                setPopularMovies(response.data.results);
            } catch (error) {
                setError('Failed to fetch popular movies...', error);
            } finally {
                setLoading(false);
            }
        };


        fetchPopularMovies();
    }, []);

    return (
        <div className={styles.container}> 
            <h1>Popular Movies</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && popularMovies.length > 0 && (
                <MovieList movies={popularMovies} />
            )}
            {!loading && !error && popularMovies.length === 0 && (
                <p>No popular movies found.</p>
            )}
        </div>
    );
};

export default HomePage