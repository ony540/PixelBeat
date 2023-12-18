import { PlayBar } from '@/components'
import { useUserInfo } from '@/hooks'
import Portal from '@/utils/portal'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const Wrapper = () => {
  const userId = useUserStore(state => state.userInfo.id)
  const currentTrack = useNowPlayStore(state => state.currentTrack)

  return (
    <div className="layout-screen-width outline outline-mainGreen">
      <Suspense fallback={<></>}>
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
      </Suspense>
    </div>
  )
}

export default Wrapper
