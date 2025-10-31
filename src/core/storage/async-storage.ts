import NativeStorage from '@react-native-async-storage/async-storage'

import { BasicStorage } from './model'

export class AsyncStorage implements BasicStorage {
  private constructor () {}

  private static instance = new AsyncStorage()

  static getInstance () {
    return this.instance
  }

  getItem = async (key: string): Promise<string | null> => {
    return await NativeStorage.getItem(key)
  }

  setItem = async (key: string, value: string): Promise<void> => {
    return await NativeStorage.setItem(key, value)
  }

  removeItem = async (key: string): Promise<void> => {
    return await NativeStorage.removeItem(key)
  }

  getItemAsJSON = async <T>(key: string): Promise<T | null> => {
    return await this.getItem(key).then((value) => value ? JSON.parse(value) : null)
  }

  setItemAsJSON = async <T>(key: string, value: T): Promise<void> => {
    return await this.setItem(key, JSON.stringify(value))
  }
}
