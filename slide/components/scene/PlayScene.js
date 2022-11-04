import { Fragment, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import shake from 'shake.js'
import useGameController from '../../store/gameController'
import * as Tone from 'tone'

const GameGrid = ({ col, row, rowNum, colNum, isActive, children }) => {
  const haveRBorder = col % rowNum != rowNum - 1
  const lastRow = row === rowNum - 1
  // const [isActive, setIsActive] = useState(false)

  return (
    <div
      className={`
        w-full h-full border-b border-gray-800 
        ${haveRBorder && 'border-r'} 
        ${lastRow && 'bg-red-200'}
        ${isActive && 'bg-blue-500'}
      `}
    >
      {children}
    </div>
  )
}

const PlayScene = () => {
  const colNum = 5
  const rowNum = 6
  const defalutActiveCell = [false, false, false, false, false]
  const [activeCell, setActiveCell] = useState(defalutActiveCell)
  const [counter, setCounter] = useState(20)

  const addScore = useGameController.getState().addScore
  const score = useGameController((state) => state.score)
  const setMainState = useGameController.getState().setMainState

  useEffect(() => {
    // spawn new rule
    const startRandomArrray = Array.from({ length: rowNum }, () =>
      Math.floor(Math.random() * (rowNum - 1))
    )
    setActiveCell(startRandomArrray)
    return () => {}
  }, [])

  const spanwNewRow = () => {
    let _activeCell = activeCell
    _activeCell.pop()
    _activeCell.unshift(Math.floor(Math.random() * (rowNum - 1)))
    setActiveCell([..._activeCell])
  }

  const synth = new Tone.Synth().toDestination()
  const generateSound = ({ note = 'C4', type = 'sine' }) => {
    synth.triggerAttackRelease(note, '8n')
  }

  const clickOnCell = (col) => {
    if (col === activeCell[rowNum - 1]) {
      // one context per document
      const frequencyPreset = ['C4', 'D4', 'E4', 'G4', 'A4']
      generateSound({
        note: frequencyPreset[col],
      })
      spanwNewRow()
      addScore()
      // spawn
    } else {
      // error
      gsap.fromTo(
        '#main',
        0.01,
        { x: -2 },
        { x: 2, clearProps: 'x', repeat: 20 }
      )
      new shake({
        threshold: 15, // optional shake strength threshold
        timeout: 10,
      })
      generateSound({
        note: 'C3',
      })
    }
  }

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000)
    } else {
      // finish
      setMainState(0)
    }
  }, [counter])

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* point */}
      <div className="absolute top-4 flex items-center  w-full justify-center">
        <span>score</span>
        <span className="ml-1">{score}</span>
        <span>time</span>
        <span>{counter}</span>
      </div>
      {/* screen */}
      <div
        className={`grid grid-cols-${colNum} grid-rows-${rowNum} h-full w-full`}
      >
        {/* row */}
        {[...Array(rowNum)].map((x, row) => (
          <Fragment key={`col-${row}`}>
            {/* col */}
            {[...Array(colNum)].map((y, col) => (
              <GameGrid
                key={`col-${col}-${row}`}
                row={row}
                col={col}
                rowNum={rowNum}
                colNum={colNum}
                isActive={activeCell[row] === col}
              ></GameGrid>
            ))}
          </Fragment>
        ))}
      </div>
      {/* controller */}
      <div className="grid grid-cols-5 h-[16vh]">
        {[...Array(5)].map((y, col) => (
          <div
            key={`click-${col}`}
            onClick={() => clickOnCell(col)}
            className={`w-full h-full bg-red-300  border-b border-gray-800 ${
              col % 5 != 4 && 'border-r'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default PlayScene
