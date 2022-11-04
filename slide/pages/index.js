import PlayScene from '../components/scene/PlayScene'
import StartScene from '../components/scene/StartScene'
import useGameController from '../store/gameController'

const GameController = ({ children }) => {
  const mainState = useGameController((state) => state.mainState)
  let renderComponent = <StartScene></StartScene>
  if (mainState == 1) renderComponent = <PlayScene></PlayScene>
  return renderComponent
}

const Main = () => {
  return (
    <>
      <GameController></GameController>
    </>
  )
}

export default Main
