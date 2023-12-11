import { SearchResultTrackItem, SearchResultArtistItem } from '.'
import { searchItem } from '@/api'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export const SearchResultWrap = () => {
  const [query] = useSearchParams()
  const queryValue = query.get('q') as string

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['search', queryValue],
    queryFn: () =>
      queryValue ? searchItem(queryValue) : Promise.resolve(null),
    refetchOnMount: false
  })

  return (
    <>
      {isLoading && <p>로딩중...</p>}
      {data && (
        <div className="relative mobile:mt-50 desktop:mt-100">
          <SearchResultTrackItem tracks={data?.tracks} />
        </div>
      )}

      {data && (
        <div className="relative mt-50">
          <SearchResultArtistItem artists={data.artists} />
        </div>
      )}
    </>
  )
}
