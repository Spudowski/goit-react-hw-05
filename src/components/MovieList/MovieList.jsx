import styles from './MovieList.module.css'
import { Link, useLocation } from 'react-router-dom'

const MovieList = ({ movies }) => {
    const location = useLocation();

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.items}>
          <Link className={styles.link} to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              className={styles.img}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList