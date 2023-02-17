/* eslint-disable no-undef */
import { useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useStatistics } from "../../components/hooks/useStatistics"
import { GAME_STATE, HEROES } from './consts'
import s from './style.module.css'

const initialColumns = {
  center: HEROES,
  marvel: [],
  dc: [],
}

const GAME_DURATION = 30

const Navbar = ({ gameState, start, end, timer, score }) => {
  if (gameState === GAME_STATE.READY) {
    return (
      <div className={s.navbar}>
        <button className={s.button} onClick={start}>
          PLAY
        </button>
      </div>
    )
  }
  if (gameState === GAME_STATE.PLAYING) {
    return (
      <div className={s.navbar}>
        <button className={s.button} onClick={end}>
          END GAME
        </button>
        <div className={s.timer}>Score: {score}</div>
        <div className={s.timer}>{timer} Seconds left</div>
      </div>
    )
  }
}

const Card = ({ id, title, index }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => {
        return (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={s.card}>
            <img className={s['card__icon']} src={`../icons/${title.toLowerCase().replace(' ', '-')}.svg`} alt={title} />
            {title}
          </div>
        )
      }}
    </Draggable>
  )
}

const Column = ({ elements, id, isDropDisabled }) => {
  return (
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {(provided) => {
        return (
          <div {...provided.droppableProps} ref={provided.innerRef} className={s.column}>
            <div className={s.namecard}>{id.toUpperCase()}</div>
            {elements.map((element, index) => (
              <Card id={element.name} title={element.name} index={index} />
            ))}
          </div>
        )
      }}
    </Droppable>
  )
}

export const Heroes = () => {
  useStatistics()
  const [columns, setColumns] = useState(initialColumns)
  const [gameState, setGameState] = useState(GAME_STATE.READY)
  const [duration, setDuration] = useState(GAME_DURATION)
  const [timerActive, setTimerActive] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!timerActive || gameState === GAME_STATE.READY) return
    if (duration < 0) {
      setTimerActive(false)
      setGameState(GAME_STATE.READY)
    }
    const timerId = setTimeout(() => setDuration(duration - 1), 1000)
    return () => clearTimeout(timerId)
  }, [gameState, timerActive, duration, setDuration, setTimerActive, setGameState])

  const start = () => {
    setTimerActive(true)
    setGameState(GAME_STATE.PLAYING)
    setDuration(GAME_DURATION)
    setColumns(initialColumns)
  }

  const end = () => {
    setTimerActive(false)
    setGameState(GAME_STATE.READY)
    setDuration(GAME_DURATION)
  }

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return

    if (gameState !== GAME_STATE.PLAYING) {
      toast('Нажмите PLAY, чтобы Начать игру')
      return
    }

    const sourceColumn = [...columns[source.droppableId]]
    const destinationColumn = [...columns[destination.droppableId]]

    const isCurrentColumn = source.droppableId === destination.droppableId
    const invalidUniverse = sourceColumn[source.index].comics !== destination.droppableId

    if (invalidUniverse) {
      setDuration(duration - 3)
      toast('Персонаж из другой вселенной')
    }
    if (!invalidUniverse && !isCurrentColumn) {
      const [removed] = sourceColumn.splice(source.index, 1)
      destinationColumn.splice(destination.index, 0, removed)
      setScore(score + 1)
    }

    setColumns({
      ...columns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destinationColumn,
    })
  }

  return (
    <>
      <Navbar end={end} start={start} timer={duration} score={score} gameState={gameState} />
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className={s.content}>
          <Column id="marvel" elements={columns.marvel}></Column>
          <Column id="center" elements={columns.center}></Column>
          <Column id="dc" elements={columns.dc}></Column>
        </div>
      </DragDropContext>
      <ToastContainer />
    </>
  )
}
