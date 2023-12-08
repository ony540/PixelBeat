import { ERROR_TEXTS } from '@/constants'

export const ErrorComponent = () => {
  return (
    <div className="min-w-[390px] max-w-[720px] m-0 mx-auto h-screen border-[5px] border-mainGreen">
      <header>{ERROR_TEXTS.headerText}</header>
      <div>{ERROR_TEXTS.apologyText}</div>
      <div>{ERROR_TEXTS.errorText}</div>
      <footer>{ERROR_TEXTS.returnText}</footer>
    </div>
  )
}
