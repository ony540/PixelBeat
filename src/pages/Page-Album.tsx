import { addNowPlayTracklistAndPlaySongTable, getAlbum } from '@/api'
import { Spinner } from '@/assets'
import { Header, NavBar, StandardButton } from '@/components'
import { AlbumList } from '@/components/album'
import { AlbumArtistInfo } from '@/components/album/AlbumArtistInfo'
import { useUserInfo } from '@/hooks'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'

const Album = () => {
  const { isLoading: isUserInfoLoading } = useUserInfo()
  const { id: albumId } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['album', albumId],
    queryFn: () => getAlbum(albumId as string)
  })

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
    const billTracks = data.tracks.filter(track => track.preview_url)
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

  if (isLoading || isUserInfoLoading) return <Spinner />
  return (
    <>
      <Header type="album" />
      <AlbumArtistInfo album_data={data} />
      <AlbumList album_list={data} />
      <StandardButton
        text={'전체 재생하기'}
        onClick={handleClickPlayAllTrackButton}
        propsClass="w-full mt-20 mb-160 px-14 desktop:px-52"
      />
      <NavBar />
    </>
  )
}
export default Album
