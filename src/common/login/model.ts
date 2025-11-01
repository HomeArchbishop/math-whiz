type Nullable<T> = Partial<{ [K in keyof T]: T[K] | null }>

export default class LoginInfo {
  token: string = ''
  username: string = ''
  childName: string = ''
  grade: 1 | 2 | 3 | 4 | 5 | 6 = 1

  constructor (loginInfo: Nullable<LoginInfo>) {
    Object.assign(this, loginInfo)
  }

  isComplete () {
    return !!this.token && !!this.username && !!this.childName && !!this.grade
  }
}
