import { shareData } from '@/utils'
import { StandardButton } from '..'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { useLocation, useNavigate } from 'react-router-dom'
import { addNowPlayTracklistAndPlaySongTable } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const BillButtonListSection = ({
  data,
  propsClass,
  isFromSpotify
}: {
  data?: any
  propsClass?: string
  isFromSpotify?: boolean
}) => {
  const navigate = useNavigate()
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)
  const setNowPlayList = useNowPlayStore(state => state.setNowPlayList)
  const setNowPlayStore = useNowPlayStore(state => state.setNowPlayStore)
  const nowPlayTracks = useNowPlayStore(state => state.tracks)
  const setIsPlaying = useNowPlayStore(state => state.setIsPlaying)
  const userInfo = useUserStore(state => state.userInfo)
  const setUserInfo = useUserStore(state => state.setUserInfo)
  const queryClient = useQueryClient()
  const { pathname } = useLocation()

  //전체 재생
  const addNowPlayTracklistAndPlaySongTableMutation = useMutation({
    mutationFn: addNowPlayTracklistAndPlaySongTable,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
      setUserInfo(data)
      setNowPlayStore(data.nowplay_tracklist)
    },
    onError(error) {
      console.log(error)
    }
  })

  const handleClickPlayAllTrackButton = () => {
    const billTracks = isFromSpotify
      ? data.tracks.items
          .map(item => item.track)
          .filter(track => track.preview_url)
      : data.tracks.filter(track => track.preview_url)
    setIsPlaying(true)

    const newNowPlayTracklist = [
      ...billTracks,
      ...nowPlayTracks.filter(
        item => billTracks.findIndex(t => t.id === item.id) !== -1
      )
    ]
    setNowPlayList(newNowPlayTracklist)
    setCurrentTrack(billTracks[0])

    //로그인 유저면 db 업데이트
    if (userInfo.id) {
      addNowPlayTracklistAndPlaySongTableMutation.mutateAsync({
        prevNowPlayTracklist: userInfo.nowplay_tracklist,
        tracks: billTracks,
        userId: userInfo.id
      })
    }
  }

  const handleClickToLoginButton = () => {
    navigate('/entry')
  }

  const handleClickShareButton = () => {

    const shareLink = `https://pixel-beat-alpha.vercel.app/
    ${pathname}`
    const text = '내 취향에 딱 맞는 음악영수증을 발급받고 공유해보세요. PixelBeat는 사용자의 응답에 따라 추천 음악 영수증을 제공해 음악 성향을 확인하고 다양한 음악을 접해볼 수 있는 플랫폼입니다'
    const title = 'PixelBeat 추천 음악영수증 발급받기'

    shareData({ url: shareLink, text, title })
  }

  return (
    <section className={`button-section w-356 mx-auto text-20 ${propsClass}`}>
      <StandardButton
        text={data ? '전체 재생하기' : '다른 영수증 구경가기'}
        onClick={
          data ? handleClickPlayAllTrackButton : handleClickToLoginButton
        }
      />
      <StandardButton
        text={'공유하기'}
        onClick={handleClickShareButton}
        fillColor="#FFFF57"
        propsClass="mt-12 mb-42"
      />
    </section>
  )
}
