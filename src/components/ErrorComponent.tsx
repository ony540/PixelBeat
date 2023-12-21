import { ERROR_TEXTS } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { SmallButton } from '.'

export const ErrorComponent = () => {
  const navigate = useNavigate()
  return (
    <div className="layout-screen-width outline text-center pt-60 text-16 leading-[1.5]">
      <header>{ERROR_TEXTS.headerText}</header>
      <div>{ERROR_TEXTS.apologyText}</div>
      <div>{ERROR_TEXTS.errorText}</div>
      <SmallButton
        onClick={() => navigate('/home')}
        text={ERROR_TEXTS.returnText}
        propsClass="w-150 mt-20 relative"
      />
    </div>
  )
}
