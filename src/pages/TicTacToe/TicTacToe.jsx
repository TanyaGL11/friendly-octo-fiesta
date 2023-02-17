import { useEffect, useState } from 'react'
import { useStatistics } from "../../components/hooks/useStatistics"
import s from './style.module.css'


const calculateWinner = (field) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (field[a] && field[a] === field[b] && field[b] === field[c]) {
            return field[a]
        }
    }
    return null
}

const Board = ({ field, currentPlayer, gameOver, onClick }) => {
    const board = new Array(9).fill(<></>)
    const handleClick = (i) => {
        if (field[i] || gameOver) return
        const newField = [...field]
        newField[i] = currentPlayer
        onClick(newField)
    }
    return (
        <div className={s.board}>
            {board.map((_, i) => (
                <div onClick={() => handleClick(i)} key={i} className={s.square}>
                    {field[i]}
                </div>
            )
            )}
        </div>)
}
export const Game = () => {
    useStatistics()
    const emptyField = new Array(9).fill(null)
    const [currentField, setCurrentField] = useState(emptyField)
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winner, setWinner] = useState(false)
    const defaultstatus = `Сейчас должен ходить: ${currentPlayer}`
    const [status, setStatus] = useState(defaultstatus)
    useEffect(() => {
        if (winner) {
            setStatus(`Игра окончена! Победил игрок-"${currentPlayer}"!Поздавляем!`)
        } else { setStatus(defaultstatus) }

    }, [defaultstatus, winner, currentPlayer])
    const play = (newField) => {
        setCurrentField(newField)
        const winner = calculateWinner(newField)
        if (winner) {
            setWinner(winner)
            return
        }
        setCurrentPlayer((player) => (player === 'X' ? '0' : 'X'))
    }
    return <div className={s.game}>
        <div className={s.status}>
            {status}
        </div>
        <Board
            field={currentField}
            currentPlayer={currentPlayer}
            gameOver={winner}
            onClick={play}
        />
    </div>
}