import { NAV_BAR_TEXT } from '@/constants'
import { useLocation, useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleIconClick = path => {
    navigate(path)
  }

  return (
    <div className="fixed bottom-0 mobile:w-[390px] pt-19 py-23 desktop:w-[720px] bg-mainBlack h-66">
      <nav className="flex justify-around items-center desktop:px-40">
        {NAV_BAR_TEXT.map(({ icon: IconComponent, path }, idx) => (
          <div
            className={`cursor-pointer ${
              location.pathname === path ? 'selected-item' : ''
            }`}
            key={path + idx}
            onClick={() => handleIconClick(path)}>
            <IconComponent />
          </div>
        ))}
      </nav>
    </div>
  )
}
