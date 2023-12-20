import Portal from '@/utils/portal'
import { BottomSheet, TrackItem } from '..'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNowPlayTracklistTable } from '@/api'
import { useModal } from '@/hooks'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { Track } from '@/types'

export const AlbumList = ({ album_list }) => {
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

  const albumData = {
    id: album_list.id,
    images: album_list.images,
    name: album_list.name
  }

  return (
    <div className="mobile:px-20 desktop:px-60 mt-20 mx-auto ">
      <ul className="border-b-1 relative">
        {album_list &&
          album_list.tracks.items.map(item => (
            <TrackItem
              key={item.id}
              data={{ ...item, album: albumData }}
              setSelectedTrack={setSelectedTrack}
            />
          ))}
      </ul>
      <Portal>
        {modalType === 'trackMore' && (
          <BottomSheet onClick={() => handleClickLModalItem(selectedTrack)} />
        )}
      </Portal>
    </div>
  )
}
