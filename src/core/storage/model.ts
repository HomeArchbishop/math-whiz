export interface StorageOptions {
  secure?: boolean
}

/**
 * 基础存储接口，用于基本存储功能
 */
export interface BasicStorage {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
  getItemAsJSON: <T>(key: string) => Promise<T | null>
  setItemAsJSON: <T>(key: string, value: T) => Promise<void>
}

/**
 * 策略模式，策略存储接口
 */
export interface StrategyStorage {
  getItem: (key: string, options?: StorageOptions) => Promise<string | null>
  setItem: (key: string, value: string, options?: StorageOptions) => Promise<void>
  removeItem: (key: string, options?: StorageOptions) => Promise<void>
  getItemAsJSON: <T>(key: string, options?: StorageOptions) => Promise<T | null>
  setItemAsJSON: <T>(key: string, value: T, options?: StorageOptions) => Promise<void>
}
