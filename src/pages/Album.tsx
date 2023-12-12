import { getAlbum } from '@/api/recommendApis'
import { AlbumList } from '@/components/album'
import { AlbumArtistInfo } from '@/components/album/AlbumArtistInfo'
import { Header, NavBar } from '@/components/home'
import { useQuery } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'

export const Album = () => {
  const { id: albumId } = useParams()
  const { data } = useQuery({
    queryKey: ['album', albumId],
    queryFn: () => getAlbum(albumId as string)
  })

  return (
    <>
      <Header />
      <AlbumArtistInfo album_data={data} />
      <AlbumList album_list={data} />
      <NavBar />
    </>
  )
}
