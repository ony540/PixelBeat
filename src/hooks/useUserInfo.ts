import { useNowPlayStore, useUserStore } from '@/zustand'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api'
import { useUserSession } from '.'

//직접 db에 접근해서 스토리지에 저장
export const useUserInfo = () => {
  const userId = useUserSession()
  const setUserInfo = useUserStore(state => state.setUserInfo)
  const setNowPlayStore = useNowPlayStore(state => state.setNowPlayStore)

  const {
    data: userInfo,
    error,
    isLoading
  } = useQuery({
    queryKey: ['profiles from supabase', userId],
    queryFn: async () => {
      const profile = await getProfile(userId)
      setUserInfo(profile)
      setNowPlayStore(profile.nowplay_tracklist)
      return profile
    },
    enabled: !!userId
  })

  return { userInfo, error, isLoading }
}
