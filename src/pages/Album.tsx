import { getAlbum } from '@/api'
import { Header, NavBar, StandardButton } from '@/components'
import { AlbumList } from '@/components/album'
import { AlbumArtistInfo } from '@/components/album/AlbumArtistInfo'
import { useNowPlayStore } from '@/zustand'
import { useQuery } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'

export const Album = () => {
  const { id: albumId } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['album', albumId],
    queryFn: () => getAlbum(albumId as string)
  })

  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)
  const setNowPlayList = useNowPlayStore(state => state.setNowPlayList)
  const nowPlayTracks = useNowPlayStore(state => state.tracks)

  const handleClickPlayAllTrackButton = () => {
    const billTracks = data.tracks.items
      .map(item => item.track)
      .filter(track => track.preview_url)
    setNowPlayList([...nowPlayTracks, billTracks])
    setCurrentTrack(billTracks[0])
  }

  if (isLoading) return <>loading..</>
  return (
    <>
      <Header type="album" />
      <AlbumArtistInfo album_data={data} />
      <AlbumList album_list={data} />

      <StandardButton
        text={'전체 재생하기'}
        onClick={handleClickPlayAllTrackButton}
        propsClass="mt-20 mb-160 mobile:px-14 desktop:px-52"
      />
      <NavBar />
    </>
  )
}
