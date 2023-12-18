import { StandardButton } from '@/components'
import { BUTTON_TEXT, RECEIPT_TEXT } from '@/constants'
import { useUserInfo } from '@/hooks'
import { useNavigate } from 'react-router-dom'

const RecommendEntry = () => {
  const navigate = useNavigate()
  const { isLoading: isUserInfoLoading } = useUserInfo()

  const moveToRecomend = () => {
    navigate('/recommend/genre')
  }

  if (isUserInfoLoading) return <>로딩중</>
  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-6xl mt-24">{RECEIPT_TEXT.TITLE}</h1>
      <div className="fixed top-[55%] text-20">
        <StandardButton
          text={BUTTON_TEXT.ENTRY}
          onClick={moveToRecomend}
        />
      </div>
    </div>
  )
}

export default RecommendEntry
