import { t } from 'i18next'

type ValidateResult = [boolean, string]

type Validator = (value: string) => ValidateResult

export const validatePipeline = (value: string, validators: Validator[]): ValidateResult => {
  for (const validator of validators) {
    const result = validator(value)
    if (!result[0]) {
      return result
    }
  }
  return [true, '']
}

export const usernameValidator = (value: string): ValidateResult => {
  return [
    value.length >= 3 && value.length <= 16,
    t('usernameMustBeBetween3And16Characters'),
  ]
}

export const gradeValidator = (value: string): ValidateResult => {
  const gradeNumber = Number(value)
  if (isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 3) {
    return [false, t('gradeMustBeBetween1And3')]
  }
  return [true, '']
}
