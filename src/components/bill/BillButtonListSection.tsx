import { shareData } from '@/utils'
import { StandardButton } from '..'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { useNavigate } from 'react-router-dom'
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
    // 배포 후 수정(data타입으로 수정)
    const shareLink = 'YOUR_SHARE_LINK'
    shareData({ url: shareLink })
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
        propsClass="mx-auto mt-12 mb-42"
      />
    </section>
  )
}
