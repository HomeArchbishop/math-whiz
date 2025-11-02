import { ParsedWrongQuestion } from '.'

export const toParamQuestions = (questions: ParsedWrongQuestion[]) => {
  return questions.map((question) => {
    return `[${question.id}]${question.raw}=${question.correctAnswer}`
  }).join(',')
}
