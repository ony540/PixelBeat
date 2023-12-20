import {
  deleteTrackToNowPlayTable,
  getBill,
  getPlaylistFromSpotify
} from '@/api'
import { ArrowDown, MoreCircle, Spinner } from '@/assets'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { BottomSheet, MusicListItem, NavBar } from '@/components'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { useState } from 'react'
import { useModal, useUserInfo } from '@/hooks'
import Portal from '@/utils/portal'

const MyMusicShelfDetail = () => {
  const { isLoading: isUserInfoLoading } = useUserInfo()
  const { id: billId } = useParams<string>()
  const isSpotify = !(billId!.length === 36)
  const navigate = useNavigate()
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const userId = useUserStore(state => state.userInfo.id)
  const nowPlaylist = useUserStore(state => state.userInfo.nowplay_tracklist)
  const [selectedTrack, setSelectedTrack] = useState<any>()
  const { modalType, closeModal } = useModal()
  const queryClient = useQueryClient()

  const query = isSpotify
    ? {
        //스포티파이 내 영수증
        queryKey: ['bill from spotify', billId],
        queryFn: () => getPlaylistFromSpotify(billId!)
      }
    : {
        //픽셀비트 내 영수증
        queryKey: ['bill from PixelBeat', billId],
        queryFn: () => getBill(billId!)
      }
  const { data, isLoading } = useQuery(query)
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

  const handelNavigatePlaynow = () => {
    navigate('/mymusic/playnow')
  }
  const handelNavigateShelf = () => {
    navigate('/mymusic/shelf')
  }

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

  if (isLoading || isUserInfoLoading)
    return <Spinner text={'음악영수증 불러오는 중...'} />

  return (
    <>
      <div className="flex flex-col px-20 desktop:px-60">
        <section className="mt-30 text-20 flex justify-between">
          <div>
            <button
              className="musicList w-113"
              onClick={handelNavigatePlaynow}>
              재생목록
            </button>
            <button
              className="musicListGreen text-mainBlack w-113"
              onClick={handelNavigateShelf}>
              음악서랍
            </button>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-24 h-24 ">
            <ArrowDown />
          </button>
        </section>
        <ul className="mx-auto w-full border min-h-[80vh] mb-140">
          <li className="group relative flex items-center justify-between pl-12 pr-16 border-b-1 w-full h-62 hover:bg-mainGray300 cursor-pointer">
            <p className="text-16 desktop:text-18 truncate ">
              {data.name} (
              {isSpotify
                ? data.tracks.items.filter(item => item.track.preview_url)
                    .length
                : data.tracks.filter(item => item.preview_url).length}
              )
            </p>
            <button
              type="button"
              onClick={handelNavigateShelf}>
              <MoreCircle />
            </button>
          </li>
          {isSpotify
            ? data.tracks.items
                .filter(item => item.track.preview_url)
                .map((item, idx) => (
                  <MusicListItem
                    track={item.track}
                    key={item.track.id + idx}
                    setSelectedTrack={setSelectedTrack}
                    isSelected={item.track.id === currentTrack?.id}
                  />
                ))
            : data.tracks
                .filter(item => item.preview_url)
                .map((item, idx) => (
                  <MusicListItem
                    track={item}
                    key={item.id + idx}
                    setSelectedTrack={setSelectedTrack}
                    isSelected={item.id === currentTrack?.id}
                  />
                ))}
        </ul>
      </div>
      <NavBar />
      <Portal>
        {modalType === 'myNowPlayTrackMore' && (
          <BottomSheet onClick={handleClickModelList} />
        )}
      </Portal>
    </>
  )
}

export default MyMusicShelfDetail
