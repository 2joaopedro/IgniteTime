import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from './Styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/CountDown'
import * as zod from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';

export function Home() {
  const {CreateNewCycle, InterruptCurrentCycle, activeCycle} = useContext(CyclesContext)
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser de no mínim de 5 minutos.')
      .max(60, 'O ciclo precisa ser de no máximo de 60 minutos.'),
  })
  
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm  = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, /*reset*/ } = newCycleForm

 

  const task = watch('task')
  const isSubmintDisabled = !task

  return (
    <HomeContainer>
      <form  onSubmit={handleSubmit(CreateNewCycle)}  action="" >
        
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
          <Countdown />        
      {activeCycle ? (
        <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
              <HandPalm size={24} />
              Interromper
        </StopCountdownButton>
      ) : (
        <StartCountdownButton disabled={isSubmintDisabled} type="submit">
          <Play size={24} />
          Começar
      </StartCountdownButton>
      )}
      </form>
    </HomeContainer>
  )
}
