/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import style from './style.module.css'
import { useStatistics } from "../../components/hooks/useStatistics"

const uniqCards = [
  {
    type: 'cat1',
    image: '../images/cat1.jpeg',
  },
  {
    type: 'cat2',
    image: '../images/cat2.jpeg',
  },
  {
    type: 'cat3',
    image: '../images/cat3.gif',
  },
  {
    type: 'cat4',
    image: '../images/cat4.jpeg',
  },
  {
    type: 'cat5',
    image: '../images/cat5.png',
  },
  {
    type: 'cat6',
    image: '../images/cat6.png',
  },
]

const shuffle = (array) => {
  const length = array.length
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i)
    const temp = array[i - 1]
    array[i - 1] = array[randomIndex]
    array[randomIndex] = temp
  }

  return array;
}

function Card({ index, card, isDisabled, isFlipped, isInactive, onClick }) {
  const handleClick = () => {
    !isInactive && !isDisabled && onClick(index)
  }

  return (
    <div className={cn(style.card, { [style.inactive]: isInactive })} onClick={handleClick}>
      {isFlipped ? <img src={card.image} alt={card.type} /> : <img src='../images/background.png'alt='нет картинки' />}
    </div>
  )
}

export function MemoryGame() {
  useStatistics()
  const [cards, setCards] = useState(shuffle(uniqCards.concat(uniqCards)))
  const [openCards, setOpenCards] = useState([])
  const [clearedCards, setClearedCards] = useState({})
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false)
  const [moves, setMoves] = useState(0)

  const restart = () => {
    setCards(shuffle(uniqCards.concat(uniqCards)))
    setOpenCards([])
    setClearedCards({})
    setMoves(0)
    setShouldDisableAllCards(false)
  }

  const isFlipped = (index) => openCards.includes(index)
  const isInactive = (card) => Boolean(clearedCards[card.type])
  const gameOver = () => Object.keys(clearedCards).length === uniqCards.length

  const onClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards([...openCards, index])
      setShouldDisableAllCards(true)
      setMoves(moves + 1)
    } else {
      setOpenCards([index])
    }
  }

  const checkPair = () => {
    const [firstCard, secondCard] = openCards;
    if (cards[firstCard].type === cards[secondCard].type) {
      setTimeout(() => {
        setOpenCards([])
        setClearedCards({ ...clearedCards, [cards[firstCard].type]: true })
        setShouldDisableAllCards(false)
      }, 500);
    }
    setTimeout(() => {
      setOpenCards([])
      setShouldDisableAllCards(false)
    }, 500)
  }

  useEffect(() => {
    if (openCards.length === 2) {
      checkPair()
    }
  }, [checkPair, openCards])

  useEffect(() => {
    if (gameOver()) {
      toast('Вы победили')
      restart()
    }
  }, [clearedCards])

  return (
    <>
      <h3>Memory game</h3>
      <div className={style.info}>
        <button className={style.button} onClick={restart}>
          Restart
        </button>
        <div className={style.moves}>Moves: {moves}</div>
      </div>
      <div className={style.container}>
        {cards.map((card, i) => (
          <Card key={i} index={i} card={card} isDisabled={shouldDisableAllCards} isInactive={isInactive(card)} isFlipped={isFlipped(i)} onClick={(index) => onClick(index)} />
        ))}
      </div>
    </>
  )
}
