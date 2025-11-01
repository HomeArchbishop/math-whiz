import { produce } from 'immer'
import { useState } from 'react'

export interface QuestionSegment {
  type: 'number' | 'operator'
  content: string
}

interface ParsedQuestion {
  id: number
  raw: string
  question: QuestionSegment[]
  correctAnswer: string
  answer: string
}

interface Questions {
  questions: ParsedQuestion[]
  current: number
  comfirmed: number
  comfirmThis: () => void
  setAnswer: (fn: (answer: string) => string) => void
  toNext: () => boolean
}

const questionsData: ParsedQuestion[] = [
  {
    id: 1,
    raw: '1+1=',
    question: [
      { type: 'number', content: '1' },
      { type: 'operator', content: '+' },
      { type: 'number', content: '1' },
    ],
    correctAnswer: '2',
    answer: '',
  },
  {
    id: 2,
    raw: '2-1',
    question: [
      { type: 'number', content: '2' },
      { type: 'operator', content: '-' },
      { type: 'number', content: '1' },
    ],
    correctAnswer: '1',
    answer: '',
  },
  {
    id: 3,
    raw: '3*4',
    question: [
      { type: 'number', content: '3' },
      { type: 'operator', content: '*' },
      { type: 'number', content: '4' },
    ],
    correctAnswer: '12',
    answer: '',
  },
  {
    id: 4,
    raw: '4/2',
    question: [
      { type: 'number', content: '4' },
      { type: 'operator', content: '/' },
      { type: 'number', content: '2' },
    ],
    correctAnswer: '2',
    answer: '',
  },
]

export const useQuestions = (): Questions => {
  const [questions, setQuestions] = useState(questionsData)

  const [current, setCurrent] = useState(0)
  const [comfirmed, setComfirmed] = useState(0)

  const toNext = () => {
    const hasNext = current < questions.length - 1
    if (hasNext) {
      setCurrent(current + 1)
    }
    return hasNext
  }

  const comfirmThis = () => {
    setComfirmed(comfirmed + 1)
  }

  const setAnswer = (fn: (answer: string) => string) => {
    setQuestions(produce(questions, (draft) => {
      draft[current].answer = fn(draft[current].answer)
    }))
  }

  return {
    questions,
    comfirmed,
    comfirmThis,
    current,
    setAnswer,
    toNext,
  }
}
