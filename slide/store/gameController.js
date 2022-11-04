import create from 'zustand'

const useGameController = create((set, get) => ({
  mainState: 0,
  score: 0,
  addScore: () => {
    set((state) => ({ score: state.score + 1 }))
  },
  setMainState: (nextState) => set((state) => ({ mainState: nextState })),
  resetScore: () => set({ score: 0 }),
}))

export default useGameController
