import { ArrowDown } from '@/assets'

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

    default:
      return null
  }
}
