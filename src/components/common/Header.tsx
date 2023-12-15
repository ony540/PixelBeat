import { ArrowDown, MoreIcon } from '@/assets'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  onClickLeftButton?: () => void
  onClickRightButton?: () => void
}

const HomeHeader = () => {
  return <header className="h-55 flex items-center px-20">PIXELBEAT</header>
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
  onClickRightButton
}: HeaderProps) => {
  return (
    <header className="flex bg-mainGreen h-55 relative px-20 desktop:px-60 items-center justify-between">
      <button
        onClick={onClickLeftButton}
        type="button"
        className="rotate-90">
        <ArrowDown fill="black" />
      </button>
      <button onClick={onClickRightButton}>
        <MoreIcon fill="black" />
      </button>
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
  onClickLeftButton,
  onClickRightButton
}: {
  type?: string
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
    case 'bill':
      return (
        <BgGreenHeader
          onClickLeftButton={handleClickBackButton}
          onClickRightButton={onClickRightButton}
        />
      )
    default:
      return null
  }
}
