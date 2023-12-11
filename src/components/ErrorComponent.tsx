import { ERROR_TEXTS } from '@/constants'

export const ErrorComponent = () => {
  return (
    <div>
      <header>{ERROR_TEXTS.headerText}</header>
      <div>{ERROR_TEXTS.apologyText}</div>
      <div>{ERROR_TEXTS.errorText}</div>
      <footer>{ERROR_TEXTS.returnText}</footer>
    </div>
  )
}
