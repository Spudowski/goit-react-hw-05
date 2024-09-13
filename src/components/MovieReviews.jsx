import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../api/api.js';
import styles from './MovieReview.module.css'

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${api.key}`);
        setReviews(response.data.results);
      } catch (error) {
        setError('Failed to fetch movie reviews.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && reviews.length === 0 && (
        <p>No reviews available.</p>
      )}

      {!loading && !error && reviews.length > 0 && (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className={styles.review}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;