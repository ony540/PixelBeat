import { PlayBar } from '@/components'
import { useUserSession } from '@/hooks'
import Portal from '@/utils/portal'
import { useNowPlayStore, } from '@/zustand'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  const userId = useUserSession()
  const currentTrack = useNowPlayStore(state => state.currentTrack)

  return (
    <div className="layout-screen-width outline outline-mainGreen">
      <Outlet />
      <Portal>
        {currentTrack && (
          <PlayBar
            propsClass={
              userId ? 'bottom-66 border-b border-mainGray' : 'bottom-0'
            }
          />
        )}
      </Portal>
    </div>
  )
}
