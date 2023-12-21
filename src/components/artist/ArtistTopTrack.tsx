import { useState } from 'react'
import { MenuIcon } from '@/assets'
import { BottomSheet, TrackItem } from '..'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNowPlayStore, useUserStore } from '@/zustand'
import Portal from '@/utils/portal'
import { useModal } from '@/hooks'
import { addNowPlayTracklistTable } from '@/api'
import { Track } from '@/types'

export const ArtistTopTrack = ({ artist_topTracks }) => {
  const [visibleTracks, setVisibleTracks] = useState(5)
  const addTrackToNowPlay = useNowPlayStore(state => state.addTrackToNowPlay)
  const queryClient = useQueryClient()
  const userInfo = useUserStore(state => state.userInfo)
  const [selectedTrack, setSelectedTrack] = useState<Track>()
  const { isShow, closeModal } = useModal()

  const addNowPlayTracklistTableMutation = useMutation({
    mutationFn: addNowPlayTracklistTable,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

    //재생목록에 추가하기
    const handleClickLModalItem = track => {
      addTrackToNowPlay(track)
  
      //로그인 사용자일 경우 db에 useMutation 해야함
      if (userInfo.id) {
        addNowPlayTracklistTableMutation.mutateAsync({
          prevNowPlayTracklist: userInfo.nowplay_tracklist,
          track,
          userId: userInfo.id
        })
      }
  
      closeModal()
    }

  const loadMore = () => {
    setVisibleTracks(prevVisibleTracks => prevVisibleTracks + 5)
  }

  return (
    <div className="px-20 desktop:px-60 mt-27 relative">
      <MenuIcon />
      <h1 className="absolute text-mainBlack top-4 left-60 desktop:top-5 desktop:left-130">
        인기 트랙
      </h1>
      <div className="relative desktop:pl-3 px-1 mt-6">
        <ul className="border-b-1">
          {artist_topTracks &&
            artist_topTracks.slice(0, visibleTracks).map(item => (
              <TrackItem
                data={item}
                key={item.id}
                setSelectedTrack={setSelectedTrack}
              />
            ))}
        </ul>
        {visibleTracks < artist_topTracks.length && (
          <button
            className="border-1 border-t-0 w-full hover:underline"
            onClick={loadMore}>
            더보기
          </button>
        )}
      </div>
      <Portal>
        {isShow && (
          <BottomSheet onClick={() => handleClickLModalItem
            (selectedTrack)} />
        )}
      </Portal>
    </div>
  )
}

export default ArtistTopTrack
