import { useEffect } from 'react'
import { TinyEmitter } from 'tiny-emitter'

import { useAsync } from '../functional/async'
import { AsyncStorage } from './async-storage'
import { BasicStorage, StorageOptions, StrategyStorage } from './model'
import { SecureStorage } from './secure-storage'

export * from './async-storage'
export * from './secure-storage'

class Storage implements StrategyStorage {
  private constructor () {}

  private static instance = new Storage()

  static getInstance () {
    return this.instance
  }

  private asyncStorage = AsyncStorage.getInstance()
  private secureStorage = SecureStorage.getInstance()

  private cache: Map<'async' | 'secure', Map<string, string>> = new Map()

  private asyncStorageEmitter = new TinyEmitter()
  private secureStorageEmitter = new TinyEmitter()

  private basicStorage (secure: boolean): BasicStorage {
    return secure ? this.secureStorage : this.asyncStorage
  }

  private basicCache (secure: boolean): Map<string, string | null> {
    const cacheType = secure ? 'secure' : 'async'
    const cache = this.cache.get(cacheType)
    if (!cache) {
      const newCache: Map<string, string> = new Map()
      this.cache.set(cacheType, newCache)
      return newCache
    }
    return cache
  }

  private basicEmitter (secure: boolean): TinyEmitter {
    return secure ? this.secureStorageEmitter : this.asyncStorageEmitter
  }

  watch = (key: string, options: StorageOptions, callback: (value: string | null) => void) => {
    const secure = !!options.secure
    this.basicEmitter(secure).on(key, callback)
    return () => {
      this.basicEmitter(secure).off(key, callback)
    }
  }

  getItem = async (key: string, options: StorageOptions = {}): Promise<string | null> => {
    const secure = !!options.secure
    const cacheValue = this.basicCache(secure).get(key)
    if (cacheValue !== undefined) {
      return cacheValue
    }
    const value = await this.basicStorage(secure).getItem(key)
    if (value !== null) {
      this.basicCache(secure).set(key, value)
    }
    return value
  }

  setItem = async (key: string, value: string, options: StorageOptions = {}): Promise<void> => {
    const secure = !!options.secure
    // do NOT use delete, set `null` marked as cached empty value
    // delete will cause the cache to be `undefined`
    this.basicCache(secure).set(key, value)
    this.basicEmitter(secure).emit(key, value)
    return await this.basicStorage(secure).setItem(key, value)
  }

  removeItem = async (key: string, options: StorageOptions = {}): Promise<void> => {
    const secure = !!options.secure
    this.basicCache(secure).set(key, null)
    this.basicEmitter(secure).emit(key, null)
    return await this.basicStorage(secure).removeItem(key)
  }

  getItemAsJSON = async <T>(key: string, options: StorageOptions = {}): Promise<T | null> => {
    const secure = !!options.secure
    return await this.basicStorage(secure).getItemAsJSON(key)
  }

  setItemAsJSON = async <T>(key: string, value: T, options: StorageOptions = {}): Promise<void> => {
    const secure = !!options.secure
    this.basicCache(secure).set(key, JSON.stringify(value))
    return await this.basicStorage(secure).setItemAsJSON(key, value)
  }
}

export const storage = Storage.getInstance()

export const useStorage = (key: string, options: StorageOptions = {}) => {
  const [value, , refresh] = useAsync(() => storage.getItem(key, options), [key, options])

  useEffect(() => {
    return storage.watch(key, options, refresh)
  }, [key, options])

  return value ?? null
}
