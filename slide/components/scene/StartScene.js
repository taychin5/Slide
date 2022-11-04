import useGameController from '../../store/gameController'

const StartScene = () => {
  const setMainState = useGameController.getState().setMainState
  const resetScore = useGameController.getState().resetScore
  const score = useGameController((state) => state.score)
  const start = () => {
    setMainState(1)
    resetScore()
  }
  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <button className="" onClick={() => start()}>
          START
        </button>
        {/* previous score */}
        <div>{!!score && <div>score = {score}</div>}</div>
      </div>
    </>
  )
}

export default StartScene
