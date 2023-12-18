import { shareData } from '@/utils'
import { StandardButton } from '..'
import { useNowPlayStore } from '@/zustand'
import { useNavigate } from 'react-router-dom'
import { addCurrentTrackTable, addNowPlayTracklistTable } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types'

export const BillButtonListSection = ({
  data,
  propsClass,
  isFromSpotify,
  profile
}: {
  data?: any
  profile: User
  propsClass?: string
  isFromSpotify?: boolean
}) => {
  const navigate = useNavigate()
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)
  const setNowPlayList = useNowPlayStore(state => state.setNowPlayList)
  const nowPlayTracks = useNowPlayStore(state => state.tracks)
  const queryClient = useQueryClient()

  const addNowPlayTracklistTableMutation = useMutation({
    mutationFn: addNowPlayTracklistTable,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', profile.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  const addCurrentTrackTableMutation = useMutation({
    mutationFn: addCurrentTrackTable,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', profile.id]
      })
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

    setNowPlayList([...nowPlayTracks, billTracks])
    setCurrentTrack(billTracks[0])

    //로그인 유저면 db 업데이트
    if (profile.id) {
      addNowPlayTracklistTableMutation.mutateAsync({
        prevNowPlayTracklist: profile.nowplay_tracklist,
        tracks: billTracks,
        userId: profile.id
      })
      addCurrentTrackTableMutation.mutateAsync({
        prevNowPlayTracklist: profile.nowplay_tracklist,
        track: billTracks[0],
        userId: profile.id
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
