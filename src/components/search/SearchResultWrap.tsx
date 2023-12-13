import { SearchResultTrackItem, SearchResultArtistItem } from '.'
import { searchItem } from '@/api'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BottomSheet } from '..'
import Portal from '@/utils/portal'
import { Artist, Track } from '@/types'

export interface SearchedData {
  tracks: Track[]
  artists: Artist
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
      {isLoading && <p>로딩중...</p>}
      {data && (
        <div className="relative mt-58">
          <SearchResultTrackItem tracks={data?.tracks} />
        </div>
      )}

      {data && (
        <div className="relative mt-28">
          <SearchResultArtistItem artists={data.artists} />
        </div>
      )}

      <Portal>
        <BottomSheet />
      </Portal>
    </>
  )
}
