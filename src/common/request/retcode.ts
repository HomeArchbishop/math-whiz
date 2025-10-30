export const Retcode = Object.freeze({
  SUCCESS: 0,
  NO_RESPONSE: 10000,
})

export class RetcodeError extends Error {
  constructor (public readonly retcode: number, public readonly message: string) {
    super(message)
  }
}
