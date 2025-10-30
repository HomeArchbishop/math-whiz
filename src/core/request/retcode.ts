export class RetcodeError extends Error {
  constructor (public readonly retcode: number, public readonly message: string) {
    super(message)
  }
}
