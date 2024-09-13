import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import api from '../api/api.js'
import styles from './MovieCast.module.css'

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api.key}`);
        setCast(response.data.cast);
      } catch (error) {
        setError('Failed to fetch movie cast.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading cast information...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && cast.length === 0 && ( 
        <p>No cast information available.</p>
      )}

      {!loading && !error && cast.length > 0 && (
        <ul>
          {cast.map(actor => (
            <li key={actor.cast_id} className={styles.list}>
              <p><strong>{actor.name}</strong> as {actor.character}</p>
              {actor.profile_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                  alt={actor.name}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MovieCast