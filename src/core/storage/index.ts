import { AsyncStorage } from './async-storage'
import { BasicStorage, StorageCache, StorageOptions, StrategyStorage } from './model'
import { SecureStorage } from './secure-storage'

export * from './async-storage'
export * from './secure-storage'

class Storage implements StrategyStorage, StorageCache {
  private constructor () {}

  private static instance = new Storage()

  private asyncStorage = AsyncStorage.getInstance()
  private secureStorage = SecureStorage.getInstance()

  static getInstance () {
    return this.instance
  }

  cache: Map<'async' | 'secure', Map<string, string>> = new Map()

  private basicStorage (secure: boolean): BasicStorage {
    return secure ? this.secureStorage : this.asyncStorage
  }

  private basicCache (secure: boolean): Map<string, string> {
    const cacheType = secure ? 'secure' : 'async'
    const cache = this.cache.get(cacheType)
    if (!cache) {
      const newCache: Map<string, string> = new Map()
      this.cache.set(cacheType, newCache)
      return newCache
    }
    return cache
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
    this.basicCache(secure).set(key, value)
    return await this.basicStorage(secure).setItem(key, value)
  }

  removeItem = async (key: string, options: StorageOptions = {}): Promise<void> => {
    const secure = !!options.secure
    this.basicCache(secure).delete(key)
    return await this.basicStorage(secure).removeItem(key)
  }

  getItemAsJSON = async <T>(key: string, options: StorageOptions = {}): Promise<T | null> => {
    const secure = !!options.secure
    return await this.basicStorage(secure).getItemAsJSON(key)
  }

  setItemAsJSON = async <T>(key: string, value: T, options: StorageOptions = {}): Promise<void> => {
    const secure = !!options.secure
    return await this.basicStorage(secure).setItemAsJSON(key, value)
  }
}

export const storage = Storage.getInstance()

export const useStorage = () => {
  return storage
}
