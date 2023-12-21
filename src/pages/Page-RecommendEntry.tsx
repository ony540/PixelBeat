import { StandardButton } from '@/components'
import { BUTTON_TEXT } from '@/constants'
import { useUserInfo } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import Logo from '@/assets/imgs/Logo.png'
import { Spinner } from '@/assets'

const RecommendEntry = () => {
  const navigate = useNavigate()
  const { isLoading: isUserInfoLoading } = useUserInfo()

  const moveToRecomend = () => {
    navigate('/recommend/genre')
  }
  const moveToEntry = () => {
    navigate('/entry')
  }

  if (isUserInfoLoading) return <Spinner />
  
  return (
    <div className="flex flex-col items-center">
      <img
        className="mx-auto 
        w-280 mt-[20vh]
        desktop:w-500 desktop:mt-[12vh]"
        src={Logo}
        alt="logo image"
      />
      <div
        className="fixed flex flex-col gap-7
                  top-[55vh]
                  desktop:top-[61vh]">
        <StandardButton
          propsClass={'w-356 h-56 desktop:w-[500px] desktop:h-60'}
          text={BUTTON_TEXT.ENTRY}
          onClick={moveToRecomend}
        />
        <StandardButton
          propsClass={'w-356 h-56 desktop:w-[500px] desktop:h-60'}
          fillColor="#FFFF57"
          text={BUTTON_TEXT.LOGIN}
          onClick={moveToEntry}
        />
      </div>
    </div>
  )
}

export default RecommendEntry
