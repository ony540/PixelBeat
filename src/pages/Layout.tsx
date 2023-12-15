import { PlayBar } from '@/components'
import Portal from '@/utils/portal'
import { useNowPlayStore } from '@/zustand'
import { Outlet, useLocation } from 'react-router-dom'

export const Layout = () => {
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const { pathname } = useLocation()
  const isNonUserBill = /^\/bill\/[^/]+$/.test(pathname)

  return (
    <div className="layout-screen-width outline outline-mainGreen">
      <Outlet />
      <Portal>
        {currentTrack && (
          <PlayBar
            propsClass={
              isNonUserBill ? 'bottom-0' : 'bottom-66 border-b border-mainGray'
            }
          />
        )}
      </Portal>
    </div>
  )
}
