import { Spinner } from '@/assets'
import { PlayBar } from '@/components'
import Portal from '@/utils/portal'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
const regex = /^(?!\/$|\/recommend|\/entry|\/profileedit).+/

export const Wrapper = () => {
  const userId = useUserStore(state => state.userInfo.id)
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const { pathname } = useLocation()
  const isPlayBarShow = regex.test(pathname)

  return (
    <div className="layout-screen-width outline outline-mainGreen">
      <Suspense fallback={<Spinner />}>
        <Outlet />
        <Portal>
          {currentTrack && isPlayBarShow && (
            <PlayBar
              propsClass={
                userId ? 'bottom-66 border-b border-mainGray' : 'bottom-0'
              }
            />
          )}
        </Portal>
      </Suspense>
    </div>
  )
}

export default Wrapper
