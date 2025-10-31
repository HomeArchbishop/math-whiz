import qs from 'qs'

import LoginInfo from '../login/model'
import { requestAuth } from '../request'
import { SuccessApiData } from './utils/model'

/** 获取题目 **/
interface GenerateQuizParams {
  loginInfo: LoginInfo
}

interface GenerateQuizResult {
  session_id: string
  questions: Array<{
    question_id: number
    type: 'addition' | 'subtraction' | 'multiplication' | 'division'
    content: string
    options: string[]
  }>
}

/** 提交答案 **/
interface SubmitAnswersParams {
  loginInfo: LoginInfo
  sessionId: string
  answers: Array<{
    question_id: number
    user_answer: string
  }>
}

interface SubmitAnswersResult {
  correct_count: number
  total_count: number
  accuracy_rate: number
  is_daily_limit_reached: boolean
}

/** 错题本 **/
interface GetWrongBookParams {
  loginInfo: LoginInfo
  limit?: number
  offset?: number
}

interface GetWrongBookResult {
  wrong_questions: Array<{
    id: number
    content: string
    correct_answer: string
    last_user_answer: string
    mistake_count: number
    last_mistake_date: string
  }>
}

/**
 * 获取题目
 */
export const generateQuiz = async ({ loginInfo }: GenerateQuizParams) => {
  const { data: { data: result } } = await requestAuth(loginInfo).get<SuccessApiData<GenerateQuizResult>>(
    '/api/v1/quiz/generate',
  )
  return result
}

/**
 * 提交答案
 */
export const submitAnswers = async ({ loginInfo, sessionId, answers }: SubmitAnswersParams) => {
  const { data: { data: result } } = await requestAuth(loginInfo).post<SuccessApiData<SubmitAnswersResult>>(
    '/api/v1/quiz/submit',
    {
      session_id: sessionId,
      answers,
    },
  )
  return result
}

/**
 * 获取错题本
 */
export const getWrongBook = async ({ loginInfo, limit = 10, offset = 0 }: GetWrongBookParams) => {
  const { data: { data: result } } = await requestAuth(loginInfo).get<SuccessApiData<GetWrongBookResult>>(
    `/api/v1/quiz/wrongbook?${qs.stringify({ limit, offset })}`,
  )
  return result
}
