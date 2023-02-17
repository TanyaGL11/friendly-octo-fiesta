import { Link } from 'react-router-dom'
import { CardGame } from '../CardGame/CardGame'
import s from './style.module.css'
export const CardGameList = ({ games }) => {
    return (<div className={s.games}>
        { games.map((game) => (
            <Link to={`/game/${game.name.toLowerCase()}`}>
                <CardGame key={game.name} {...game}>
                </CardGame>
            </Link>)
            )
        }
    </div>
    )
}