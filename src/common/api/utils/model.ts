export interface SuccessApiData<T> {
  retcode: number
  data: T
}

export interface FailedApiData {
  retcode: number
  message: string
}

export type ApiData<T> = SuccessApiData<T> | FailedApiData
