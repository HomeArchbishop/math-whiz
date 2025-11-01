type Nullable<T> = Partial<{ [K in keyof T]: T[K] | null }>

export default class LoginInfo {
  token: string = ''

  constructor (loginInfo: Nullable<LoginInfo>) {
    Object.assign(this, loginInfo)
  }

  isComplete () {
    return !!this.token
  }
}

export type NotSecureLoginInfo = Omit<LoginInfo, 'token'>
