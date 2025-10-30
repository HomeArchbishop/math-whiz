import { RetcodeError } from '../request/retcode'
import { useAsync } from './async'

type FalsyValue = false | null | undefined | '' | 0

type Resolved<T> = T extends Promise<infer U> ? U : T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class ApiCenter<Api extends Record<string, (...args: unknown[]) => Promise<any>>> {
  constructor (private readonly apiCollection: Api) {}

  useApi = <T extends keyof Api, E extends Error = RetcodeError>(
    name: T,
    args: FalsyValue | Parameters<Api[T]>,
  ) => {
    const deps: unknown[] = [!!args]
    if (args) {
      deps.push(...args)
    }
    while (deps.length < 10) {
      deps.push(undefined)
    }

    const api = this.apiCollection[name]

    const task = args && typeof api === 'function' && (() => api(...args))
    const [result, error, refresh, clear] = useAsync<Resolved<ReturnType<Api[T]>>, E>(task, deps)

    return [result, error, refresh, clear] as const
  }
}
