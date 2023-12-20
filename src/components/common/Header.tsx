import { ArrowDown, MoreIcon } from '@/assets'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  onClickLeftButton?: () => void
  onClickRightButton?: () => void
  isNoneMore?: boolean
}

const HomeHeader = () => {
  const navigate = useNavigate()
  const moveToHome = () => {
    navigate('/home')
  }
  return (
    <header className="h-55 flex items-center mobile:px-20 desktop:px-60 ">
      <div
        className="cursor-pointer"
        onClick={moveToHome}>
        PIXELBEAT
      </div>
    </header>
  )
}

const PlayNowHeader = ({ onClickRightButton }: HeaderProps) => {
  return (
    <header className="h-55 relative">
      <h1 className="text-26 w-full text-center leading-55 ">Playing Now</h1>
      <button
        type="button"
        className="absolute right-0 top-14 pr-20 desktop:pr-60"
        onClick={onClickRightButton}>
        <ArrowDown />
      </button>
    </header>
  )
}

const BgGreenHeader = ({
  onClickLeftButton,
  onClickRightButton,
  isNoneMore
}: HeaderProps) => {
  return (
    <header className="flex bg-mainGreen h-55 relative px-20 desktop:px-60 items-center justify-between">
      <button
        onClick={onClickLeftButton}
        type="button"
        className="rotate-90">
        <ArrowDown fill="black" />
      </button>
      {!isNoneMore && (
        <button onClick={onClickRightButton}>
          <MoreIcon fill="black" />
        </button>
      )}
    </header>
  )
}

const BgBlackHeader = ({ onClickLeftButton }: HeaderProps) => {
  return (
    <header className="flex h-55 relative px-20 desktop:px-60 items-center justify-between">
      <button
        onClick={onClickLeftButton}
        type="button"
        className="rotate-90">
        <ArrowDown />
      </button>
    </header>
  )
}

export const Header = ({
  type = 'home',
  isNoneMore,
  onClickRightButton,
  onClickLeftButton
}: {
  type?: string
  isNoneMore?: boolean
  onClickLeftButton?: () => void
  onClickRightButton?: () => void
}) => {
  const navigate = useNavigate()
  const handleClickBackButton = () => {
    navigate(-1)
  }
  switch (type) {
    case 'home':
      return <HomeHeader />
    case 'playnow':
      return <PlayNowHeader onClickRightButton={onClickRightButton} />
    case 'album':
    case 'artist':
      return <BgBlackHeader onClickLeftButton={handleClickBackButton} />
    case 'profile':
      return (
        <BgGreenHeader
          onClickLeftButton={onClickLeftButton}
          onClickRightButton={onClickRightButton}
          isNoneMore={isNoneMore}
        />
      )
    case 'bill':
      return (
        <BgGreenHeader
          onClickLeftButton={handleClickBackButton}
          onClickRightButton={onClickRightButton}
          isNoneMore={isNoneMore}
        />
      )
    default:
      return null
  }
}
