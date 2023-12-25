import { Spinner } from '@/assets'
import { PlayBar } from '@/components'
import { ScreenBackground } from '@/components/common/ScreenBackground'
import Portal from '@/utils/portal'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
const regexShow =
  /^(?!\/$|\/recommend|\/entry|\/signupwithemail|\/signinwithemail|\/profileedit|\/profileupload).+/

export const Wrapper = () => {
  const userId = useUserStore(state => state.userInfo.id)
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const { pathname } = useLocation()
  const isPlayBarShow = regexShow.test(pathname)
  const isPlayBarDown =
    pathname.includes('/bill/') &&
    pathname.split('/').length <= 4 &&
    !pathname.split('/')[3]

  return (
    <div>
      <ScreenBackground />
      <div className="layout-screen-width bg-mainBlack relative z-1 desktop:border-x-[1.8px] middle:outline  desktop:outline-none desktop:pt-[22.5px]">
        <Suspense fallback={<Spinner />}>
          <div className="hidden desktop:block w-[720px] fixed top-0 left-1/2 translate-x-[-50%] topbar z-20"></div>
          <Outlet />
          <Portal>
            {currentTrack && isPlayBarShow && (
              <PlayBar
                propsClass={
                  isPlayBarDown && !userId
                    ? 'bottom-0 border-x-white border-x-[1.8px] desktop:border-x-0'
                    : 'bottom-66 border border-t-0 desktop:border-x-white desktop:border-x-[1.8px] border-b-mainGray'
                }
              />
            )}
          </Portal>
        </Suspense>
      </div>
    </div>
  )
}

export default Wrapper
