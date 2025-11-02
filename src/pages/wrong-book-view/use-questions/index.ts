export interface QuestionSegment {
  type: 'number' | 'operator'
  content: string
}

export interface ParsedWrongQuestion {
  id: number
  raw: string
  question: QuestionSegment[]
  correctAnswer: string
  answer: string
}

const questionsData: ParsedWrongQuestion[] = [
  {
    id: 1,
    raw: '1+1',
    question: [
      { type: 'number', content: '1' },
      { type: 'operator', content: '+' },
      { type: 'number', content: '1' },
    ],
    correctAnswer: '2',
    answer: '1',
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
    answer: '2',
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
    answer: '3',
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
    answer: '4',
  },
  {
    id: 5,
    raw: '5+5',
    question: [
      { type: 'number', content: '5' },
      { type: 'operator', content: '+' },
      { type: 'number', content: '5' },
    ],
    correctAnswer: '10',
    answer: '5',
  },
]

export const useWrongQuestions = (): ParsedWrongQuestion[] => {
  return questionsData
}
