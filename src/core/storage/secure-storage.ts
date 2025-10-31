import * as NativeStorage from 'expo-secure-store'

import { BasicStorage } from './model'

export class SecureStorage implements BasicStorage {
  private constructor () {}

  private static instance = new SecureStorage()

  static getInstance () {
    return this.instance
  }

  getItem = async (key: string): Promise<string | null> => {
    return NativeStorage.getItem(key)
  }

  setItem = async (key: string, value: string): Promise<void> => {
    return NativeStorage.setItem(key, value)
  }

  removeItem = async (key: string): Promise<void> => {
    return await NativeStorage.deleteItemAsync(key)
  }

  getItemAsJSON = async <T>(key: string): Promise<T | null> => {
    return this.getItem(key).then((value) => value ? JSON.parse(value) : null)
  }

  setItemAsJSON = async <T>(key: string, value: T): Promise<void> => {
    return this.setItem(key, JSON.stringify(value))
  }
}
