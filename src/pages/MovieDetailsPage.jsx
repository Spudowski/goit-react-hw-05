import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import api from '../api/api.js'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css'

const MovieDetails = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentLocation = useRef(location.state?.from || '/movies');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api.key}`);
                setMovieDetails(response.data);
            } catch (error) {
                setError('Failed to fetch movie details...', error);
            } finally {
                setLoading(false);
            }
        };


        fetchMovieDetails();
    }, [movieId]);

    return (
      <div>
        <Link to={currentLocation.current} className={styles.backbtn}>Back to movies</Link>

        {loading && <p>Loading movie details...</p>}
        {error && <p>{error}</p>}
        {movieDetails && (
          <div className={styles.root}>
            <div className={styles.container}>
              <div>
                <h1>{movieDetails.title}</h1>
                <p>{movieDetails.overview}</p>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            </div>
            <nav className={styles.nav}>
              <NavLink to="cast">Cast</NavLink>
              <NavLink to="reviews" state={{ from: currentLocation.current }}>
                Reviews
              </NavLink>
            </nav>
            <Outlet />
          </div>
        )}
      </div>
    );
}
export default MovieDetails