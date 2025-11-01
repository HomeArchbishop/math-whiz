import { useState } from 'react'

export const useInput = () => {
  const [value, setValue] = useState('')
  const onChangeText = (text: string) => {
    setValue(text)
  }
  return [value, onChangeText] as const
}
