interface MwCtx {
  request: Request
  response: Response
}

export type Middleware = (ctx: MwCtx, next: () => Promise<void>) => Promise<void>

const compose = (middlewares: Middleware[]) => {
  const funcs = [...middlewares].flat(Infinity)

  return async (ctx: MwCtx, next?: () => Promise<void>) => {
    const dispatch = async (i: number) => {
      const fn = i === funcs.length ? next : funcs[i]
      if (!fn) return
      const nextProxy = () => dispatch(i + 1)
      await fn(ctx, nextProxy)
    }
    dispatch(0)
  }
}

export class RequestHub {
  middlewares: Middleware[] = []

  use (middleware: Middleware) {
    this.middlewares.push(middleware)
    return this
  }

  async get (url: string, options: RequestInit = {}) {
    const request = new Request(url, {
      ...options,
      method: 'GET',
    })
    return this.dispatch(request)
  }

  async post (url: string, data: unknown = {}, options: RequestInit = {}) {
    const request = new Request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
    return this.dispatch(request)
  }

  async dispatch (request: Request) {
    const ctx: MwCtx = { request, response: new Response() }
    const middlewareFn = compose([...this.middlewares, this.send])
    await middlewareFn(ctx)
    return ctx.response.json()
  }

  async send (ctx: MwCtx) {
    Object.assign(ctx.response, await fetch(ctx.request))
  }
}

export default RequestHub
