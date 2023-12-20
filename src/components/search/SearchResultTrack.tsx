import { MenuIcon } from '@/assets'
import { useState } from 'react'
import { BottomSheet, TrackItem } from '..'
import { useModal } from '@/hooks'
import { useNowPlayStore, useUserStore } from '@/zustand'
import Portal from '@/utils/portal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNowPlayTracklistTable } from '@/api'
import { Track } from '@/types'

export const SearchResultTrack = ({ tracks }: { tracks?: any }) => {
  const [visibleTracks, setVisibleTracks] = useState(3)
  const addTrackToNowPlay = useNowPlayStore(state => state.addTrackToNowPlay)
  const { modalType, closeModal } = useModal()
  const queryClient = useQueryClient()
  const userInfo = useUserStore(state => state.userInfo)
  const [selectedTrack, setSelectedTrack] = useState<Track>()

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
    setVisibleTracks(prevVisibleTracks => prevVisibleTracks + 3)
  }

  if (!tracks || tracks.items.length === 0) {
    return (
      <div className="relative mobile:mt-22 desktop:mt-50">
        <MenuIcon />
        <h2 className="absolute text-mainBlack top-3 mobile:left-50 desktop:top-15 desktop:left-100">
          음악
        </h2>
        <p>No Item</p>
      </div>
    )
  }

  return (
    <>
      <MenuIcon />
      <h2
        className="absolute text-mainBlack left-40 
                    mobile:top-4 
                    desktop:top-5 desktop:left-80">
        음악
      </h2>
      <div className="relative desktop:px-3 mobile:px-1 mt-4">
        <ul className="border-b-1">
          {tracks &&
            tracks.items.slice(0, visibleTracks).map(item => (
              <TrackItem
                key={item.id}
                data={item}
                setSelectedTrack={setSelectedTrack}
              />
            ))}
          {visibleTracks < tracks.items.length && (
            <button
              className="border-1 border-b-0 w-full hover:underline"
              onClick={loadMore}>
              더보기
            </button>
          )}
        </ul>
      </div>
      <Portal>
        {modalType === 'trackMore' && (
          <BottomSheet onClick={() => handleClickLModalItem(selectedTrack)} />
        )}
      </Portal>
    </>
  )
}
