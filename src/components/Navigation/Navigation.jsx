import { NavLink } from 'react-router-dom'
import style from './Navigation.module.css'

const Navigation = () => {
    return (
      <header className={style.container}>
        <nav className={style.nav}>
          <NavLink to="/" className={style.link}>
            Home
          </NavLink>
          <NavLink to="/movies" className={style.link}>
            Movies
          </NavLink>
        </nav>
      </header>
    );
}
export default Navigation