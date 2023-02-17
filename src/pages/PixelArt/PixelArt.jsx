import { useRef } from 'react'
import { useState } from 'react'
import { CirclePicker } from 'react-color'
import { exportComponentAsPNG } from 'react-component-export-image'
import { useStatistics } from "../../components/hooks/useStatistics"
import style from './style.module.css'

function Pixel({ selectedColor }) {
  const [currentColor, setCurrentColor] = useState('#fff')
  const [prevColor, setPrevColor] = useState(currentColor)
  const [isClicked, setIsClicked] = useState(false)

  const onClick = () => {
    setCurrentColor(selectedColor)
    setIsClicked(true)
  }

  const onMouseEnter = () => {
    setPrevColor(currentColor)
    setCurrentColor(selectedColor)
    setIsClicked(false)
  }

  const onMouseLeave = () => {
    if (isClicked) return
    setCurrentColor(prevColor)
  }

  return <div className={style.pixel} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ backgroundColor: currentColor }}></div>
}

function DrawingPannel({ width, height, selectedColor }) {
  const board = new Array(width).fill(new Array(height).fill(<></>))
  const boardRef = useRef()

  return (
    <>
      <button onClick={() => exportComponentAsPNG(boardRef)}>Export as PNG</button>
      <div className={style.drawingPannel} ref={boardRef}>
        {board.map((row, i) => (
          <div key={i} className={style.row}>
            {row.map((_, i) => (
              <Pixel key={i} selectedColor={selectedColor} />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default function PixelArt() {
  useStatistics()
  const [height, setHeight] = useState(20)
  const [width, setWidth] = useState(20)
  const [selectedColor, setSelectedColor] = useState('#000')
  const [startDrawing, setStartDrawing] = useState(false)

  return (
    <>
      <div className={style.editor}>
        <button className={style.button} onClick={() => setStartDrawing(!startDrawing)}>
          {startDrawing ? 'reset' : 'start drawing'}
        </button>
      </div>
      {!startDrawing ? (
        <>
          <h2>Задайте ширину холста</h2>
          <div className={style.options}>
            <div className={style.option}>
              <span>width</span>
              <input max={30} type="number" className={style.input} defaultValue={20} onChange={(e) => setWidth(Number(e.target.value))} />
            </div>
            <div className={style.option}>
              <span>height</span>
              <input max={30} type="number" className={style.input} defaultValue={20} onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
          </div>
        </>
      ) : (
        <>
          <CirclePicker color={selectedColor} onChangeComplete={(color) => setSelectedColor(color.hex)}></CirclePicker>
          <DrawingPannel width={width} height={height} selectedColor={selectedColor}></DrawingPannel>
        </>
      )}
    </>
  )
}
