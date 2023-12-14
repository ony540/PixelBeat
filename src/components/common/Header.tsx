import { ArrowDown, MoreButton } from '@/assets'

type HeaderProps = {
  onClick?: () => void
}

const HomeHeader = () => {
  return <header className="h-55 flex items-center px-20">PIXELBEAT</header>
}

const PlayNowHeader = ({ onClick }: HeaderProps) => {
  return (
    <header className="h-55 relative">
      <h1 className="text-26 w-full text-center leading-55 ">Playing Now</h1>
      <button
        type="button"
        className="absolute right-0 top-14 pr-20 desktop:pr-60"
        onClick={onClick}>
        <ArrowDown />
      </button>
    </header>
  )
}

const ProfileHeader = ({ onClick }: HeaderProps) => {
  return (
    <header className='flex bg-mainGreen h-55 relative px-60 justify-between'>
      <button onClick={onClick} type='button' className='headerArrow rotate-90 ml-18 mt-6'>
        <ArrowDown fill='black' />
      </button>
      <button onClick={onClick} type='button' className='headerMore relative top-0 right-15'>
        <MoreButton fill='black' />
      </button>
    </header>
  )
}

export const Header = ({
  type = 'home',
  onClick
}: {
  type?: string
  onClick?: () => void
}) => {
  switch (type) {
    case 'home':
      return <HomeHeader />
    case 'playnow':
      return <PlayNowHeader onClick={onClick} />
    case 'profile':
      return <ProfileHeader onClick={onClick} />
    default:
      return null
  }
}
