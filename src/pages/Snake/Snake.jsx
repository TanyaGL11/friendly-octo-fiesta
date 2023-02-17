/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import s from './style.module.css'
import AppleLogo from './iconsApple.png'
import { useStatistics } from "../../components/hooks/useStatistics"

const initialSnake = [[10, 10]]
const initialApple = [10, 11]
const initialDirection = [0, 1]

export const Snake = () => {
  useStatistics()
  const [snake, setSnake] = useState(initialSnake)
  const [apple, setApple] = useState(initialApple)
  const [direction, setDirection] = useState(initialDirection)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [delay, setDelay] = useState(null)

  useEffect(() => {
    let fruit = document.getElementById('apple')
    let canvas = document.getElementById('canvas')

    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.setTransform(50, 0, 0, 50, 0, 0)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
      snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1))
    }
  }, [snake, apple])

  const play = () => {
    setApple(initialApple)
    setSnake(initialSnake)
    setDirection(initialDirection)
    setScore(0)
    setGameOver(false)
    setDelay(200)
  }

  const runGame = () => {
    const newSnake = [...snake]
    const newHeadSnake = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]]
    newSnake.unshift(newHeadSnake)
    if (checkCollision(newHeadSnake)) {
      setDelay(null)
      setGameOver(true)
    }
    if (!eatApple(newHeadSnake)) {
      newSnake.pop()
    }
    setSnake(newSnake)
    setDelay(200)
  }

  useEffect(() => {
    if (delay === null || gameOver) return
    const id = setTimeout(runGame, delay)

    return () => clearTimeout(id)
  }, [runGame, delay, gameOver])

  const checkCollision = (head) => {
    if (head[0] < 0 || head[0] > 19 || head[1] < 0 || head[1] > 19) {
      return true
    }
    for (const square of snake) {
      if (head[0] === square[0] && head[1] === square[1]) {
        return true
      }
    }

    return false
  }

  const eatApple = (head) => {
    let newAppleCoordinate = apple.map(() => Math.floor((Math.random() * 1000) / 50))
    if (head[0] === apple[0] && head[1] === apple[1]) {
      setApple(newAppleCoordinate)
      setScore(score + 1)
      return true
    }
    return false
  }

  const changeDirection = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        setDirection([0, 1])
        break
      case 'ArrowUp':
        setDirection([0, -1])
        break
      case 'ArrowLeft':
        setDirection([-1, 0])
        break
      case 'ArrowRight':
        setDirection([1, 0])
        break
      default:
        break
    }
  }

  return (
    <div onKeyDown={(e) => changeDirection(e)}>
      <div className={s.info}>
        <div className={s.score}> <br/>Score: {score}</div>
        <button className={s.button} onClick={play}>
          Play
        </button>
      </div>
      <img src={AppleLogo} id="apple" className={s.apple} alt="apple" width={30} />
      <canvas id="canvas" className={s.canvas} width="1000px" height="1000px" />
      {gameOver && <div className={s.gameOver}>Game Over</div>}
    </div>
  )
}
