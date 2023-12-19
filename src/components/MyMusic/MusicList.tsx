import { useNavigate } from 'react-router-dom'
import { MusicListItem } from './MusicListItem'
import { useNowPlayStore, useUserStore } from '@/zustand'
import Portal from '@/utils/portal'
import { BottomSheet } from '..'
import { useModal } from '@/hooks'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTrackToNowPlayTable } from '@/api'
import { ArrowDown } from '@/assets'

export const MusicList = () => {
  const navigate = useNavigate()
  const userId = useUserStore(state => state.userInfo.id)
  const nowPlaylist = useUserStore(state => state.userInfo.nowplay_tracklist)
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const { modalType, closeModal } = useModal()
  const [selectedTrack, setSelectedTrack] = useState<any>()
  const queryClient = useQueryClient()

  const goToMusicRepo = () => {
    navigate('/mymusic/bill')
  }

  const deleteTrackToNowPlayTableMutation = useMutation({
    mutationFn: deleteTrackToNowPlayTable,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userId]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  const handleClickModelList = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.innerText) {
      case '삭제하기':
        deleteTrackToNowPlayTableMutation.mutateAsync({
          prevNowPlayTracklist: nowPlaylist,
          track: selectedTrack,
          userId
        })
        break
      case '가수 정보 보기':
        navigate(`/artist/${selectedTrack.artists[0].id}`)
        break
      case '앨범 정보 보기':
        navigate(`/album/${selectedTrack.album.id}`)
        break
      default:
        return
    }
    closeModal()
  }

  return (
    <>
      <div className="flex flex-col">
        <section className="mt-30 text-20 flex justify-between">
          <div>
            <button className="musicListGreen text-mainBlack w-113 ">
              재생목록
            </button>
            <button
              className="musicList w-113 "
              onClick={goToMusicRepo}>
              음악서랍
            </button>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-24 h-24">
            <ArrowDown />
          </button>
        </section>
        <ul className="mx-auto w-full border min-h-[80vh] mb-140">
          {nowPlaylist.tracks.map((track, idx) => (
            <MusicListItem
              track={track}
              key={track.id + idx}
              setSelectedTrack={setSelectedTrack}
              isSelected={currentTrack?.id == track.id}
            />
          ))}
        </ul>
      </div>
      <Portal>
        {modalType === 'myNowPlayTrackMore' && (
          <BottomSheet onClick={handleClickModelList} />
        )}
      </Portal>
    </>
  )
}
