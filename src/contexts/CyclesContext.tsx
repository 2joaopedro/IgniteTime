import { ReactNode, createContext, useState } from "react";

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    isActive: boolean
    startDate: Date
    interruptDate?: Date
    finshedDate?: Date
}

interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrebtCycleAsFinished: () => void
    amauntSecondsPassed: number
    setSecondsPassed: (seconds: number) =>  void
    CreateNewCycle: (data: CreateCycleData) => void
    InterruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}
export function CycleContextProvider({ children } : CyclesContextProviderProps){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amauntSecondsPassed, setAuntSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    

  function setSecondsPassed(seconds: number) {
    setAuntSecondsPassed(seconds)
  }

  function markCurrebtCycleAsFinished(){
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {...cycle, finshedDate: new Date()}
      } else {
        return cycle
      }
    }),
    )
  }

  function CreateNewCycle(data: CreateCycleData) {
    const id =  String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      isActive: false
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAuntSecondsPassed(0)
    // reset()
  }

  function InterruptCurrentCycle() {
    setActiveCycleId(null)
    setCycles(state => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return {...cycle, interruptDate: new Date()}
      } else {
        return cycle
      }
    }))
    setActiveCycleId(null)
  }

    return(
        <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrebtCycleAsFinished, 
        amauntSecondsPassed, setSecondsPassed, CreateNewCycle, InterruptCurrentCycle, cycles}}>
          {children}
        </CyclesContext.Provider >
    )
}