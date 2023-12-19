import {
  SearchResultTrack,
  SearchResultArtist,
  SearchResultPlaylist,
  SearchResultAlbum
} from '.'
import { searchItem } from '@/api'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Album, Artist, Track } from '@/types'
import { Spinner } from '@/assets'

export interface SearchedData {
  tracks: Track[]
  artists: Artist[]
  playlists: any
  albums: Album[]
}
export const SearchResultWrap = () => {
  const [query] = useSearchParams()
  const queryValue = query.get('q') as string

  const { isLoading, data } = useQuery<
    SearchedData | Error,
    Error,
    SearchedData
  >({
    queryKey: ['search', queryValue],
    queryFn: () => searchItem(queryValue),
    refetchOnMount: false,
    enabled: !!queryValue
  })

  return (
    <>
      {isLoading && <Spinner text={'검색결과 불러오는 중...'} />}
      {data && (
        <div className="relative mt-58">
          <SearchResultTrack tracks={data?.tracks} />
        </div>
      )}

      {data && (
        <div className="relative mt-28">
          <SearchResultArtist artists={data.artists} />
        </div>
      )}
      {data && (
        <div className="relative mt-28">
          <SearchResultPlaylist playlists={data.playlists} />
        </div>
      )}

      {data && (
        <div className="relative mt-28 mb-100">
          <SearchResultAlbum albums={data.albums} />
        </div>
      )}
    </>
  )
}
