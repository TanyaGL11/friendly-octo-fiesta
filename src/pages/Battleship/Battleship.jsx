/* eslint-disable no-undef */
import { useState } from "react"
import s from './style.module.css'
import cn from "classnames"
import { ReactComponent as CrossIcon } from './cross.svg'
import { ReactComponent as SquareIcon } from './square.svg'
import { FIELD_BATTLESHIP } from "../../utils/consts"
import { useStatistics } from "../../components/hooks/useStatistics"


const Cell = ({ isShip, onClick }) => {
  const [offended, setOffended] = useState(false)
  return (
    <>
      <div
        className={s.cell}
        onClick={() => {
          if (offended) return
          setOffended(true)
          onClick()
        }}
      >
        <SquareIcon className={cn(s.square, { [s.offended]: offended && !isShip })} />
        {offended && isShip && <CrossIcon className={s.cross} />}
      </div>
    </>
  )
}

const Board = ({ field, onClickCell }) => {
  const board = new Array(10).fill(new Array(10).fill(<></>))
  const isShipCeil = (x, y) => field[x][y] === 'X'

  return (
    <div className={s.board}>
      {board.map((row, x) => (
        <div className={s.row} key={x}>
          {row.map((ceil, y) => (
            <Cell key={`${x}-${y}`} onClickCell={onClickCell} onClick={() => onClickCell(x, y)} isShip={isShipCeil(x, y)} />))}
        </div>))}
    </div>
  )
}

export const Battleship = () => {
  useStatistics()
  const [shots, steShots] = useState(0)
  const [hits, steHits] = useState(0)
  const isShipCeil = (x, y) => FIELD_BATTLESHIP[x][y] === 'X'
  const onClickCell = (x, y) => {
    if (isShipCeil(x, y)) {
      steHits(hits + 1)
    }
    steShots(shots + 1)
  }
  return (
    <>
      <div className={s.info}>
        <div>Shots: {shots}</div>
        <div>Hits: {hits}</div>
      </div>
      <Board field={FIELD_BATTLESHIP} onClickCell={onClickCell}></Board>

    </>
  )
}
