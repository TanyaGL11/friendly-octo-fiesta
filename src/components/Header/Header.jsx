import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from '../../context/appContext'
import s from "./style.module.css"

export const Header = ({ title = 'MINI GAMES', openModal, logout }) => {
  const { isLogin, currentUser } = useContext(AppContext)
  return (
    <header className={s.header}>
      <Link to="/statistics">
        <button className={s.button}>Statistics</button>
      </Link>
      <Link to="/">
        <span className={s.title}>{title}</span>
      </Link>
      {isLogin ? (
        <div className={s.action}>
          <span className={s.name}>{currentUser?.name}</span>
          <button className={s.button} onClick={logout}>Выйти</button>
        </div>
      ) : (
        <button className={s.button} onClick={() => openModal(true)}>Войти</button>
      )}
    </header>
  )
}