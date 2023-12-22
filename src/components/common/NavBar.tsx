import { NAV_BAR_TEXT } from '@/constants'
import { useLocation, useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleIconClick = path => {
    navigate(path)
  }

  return (
    <div className="fixed bottom-0 pt-19 py-23 w-full mobile:w-390 desktop:w-[718px] bg-mainBlack h-66 desktop:border-e-1">
      <nav className="flex justify-around items-center desktop:px-40">
        {NAV_BAR_TEXT.map(({ icon: IconComponent, path }, idx) => (
          <div
            className={`cursor-pointer ${
              location.pathname.split('/')[1] === path.split('/')[1]
                ? 'selected-item'
                : ''
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
