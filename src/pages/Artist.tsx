import {
  getArtistAlbums,
  getArtistInfo,
  getArtistTopTracks,
  getRelatedArtists
} from '@/api/recommendApis'
import { ErrorComponent } from '@/components'
import { ArtistImage, ArtistTopTrack, RelatedArtist } from '@/components/artist'
import ArtistAlbumList from '@/components/artist/ArtistAlbumList'
import { Header, NavBar } from '@/components/home'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const Artist = () => {
  const { id: artist_id } = useParams()

  const results = useQueries({
    queries: [
      {
        queryKey: ['artist-info', artist_id],
        queryFn: () => getArtistInfo(artist_id)
      },
      {
        queryKey: ['artist-albums', artist_id],
        queryFn: () => getArtistAlbums(artist_id as string)
      },
      {
        queryKey: ['artist-topTracks', artist_id],
        queryFn: () => getArtistTopTracks(artist_id)
      },
      {
        queryKey: ['artist-relatedArtist', artist_id],
        queryFn: () => getRelatedArtists(artist_id as string)
      }
    ]
  })

  const isLoading = results.some(result => result.isLoading)
  const isError = results.some(result => result.isError)

  const renderComponents = () => {
    if (isLoading) {
      return <h1>로딩중...</h1>
    }

    if (isError) {
      return <ErrorComponent />
    }

    return (
      <div>
        <Header />
        <ArtistImage artist_info={results[0].data} />
        <ArtistAlbumList artist_albums={results[1].data} /> 
        <ArtistTopTrack artist_topTracks={results[2].data} /> 
        <RelatedArtist artist_relatedArtistracks={results[3].data} /> 
        <NavBar />
      </div>
    )
  }

  return renderComponents()
}
