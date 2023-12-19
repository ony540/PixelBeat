import { getArtistId, getArtistInfo } from '@/api'
import { useRecommendStore } from '@/zustand'
import { useEffect, useState } from 'react'
import { RecommendArtistItem } from '..'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/assets'

export const ArtistSelector = () => {
  const selectArtist = useRecommendStore(state => state.selectArtist)
  const initialStore = useRecommendStore(state => state.initialStore)
  const genreStore = initialStore.genre
  const artistIdStore = initialStore.artist
  const [selectedArtistIds, setSelectedArtistIds] = useState<any>(null)
  const isArtistSelected = (artistId: string) =>
    artistIdStore.includes(artistId)

  //Supabase로부터 아티스트 ID 가져오기
  const {
    data: artistIdsfromSupabase,
    isLoading: isartistIdsfromSupabaseLoading
  } = useQuery({
    queryKey: ['artistIdsfromSupabase', genreStore],
    queryFn: () => getArtistId(genreStore),
    enabled: !!genreStore
  })

  //선택된 아티스트 ID로 Spotify 정보 가져오기
  const { data: artistInfoBySpotify } = useQuery({
    queryKey: ['detailData', selectedArtistIds],
    queryFn: () => getArtistInfo(selectedArtistIds),
    enabled: !!selectedArtistIds
  })

  useEffect(() => {
    const getSelectedArtistIds = artistIds => {
      if (genreStore.length < 3) {
        return artistIds?.map(item => item.artist_id) || []
      }
      const artistsByGenre: { [key: string]: string[] } = {}
      artistIds?.forEach(item => {
        const genre = item.genre
        artistsByGenre[genre] = artistsByGenre[genre] || []
        artistsByGenre[genre].push(item.artist_id)
      })

      const selectedArtists: string[] = []
      Object.values(artistsByGenre).forEach(artists => {
        selectedArtists.push(...artists.slice(0, 6))
      })
      return selectedArtists
    }
    if (artistIdsfromSupabase) {
      const selectedArtist = getSelectedArtistIds(artistIdsfromSupabase)
      setSelectedArtistIds(selectedArtist)
    }
  }, [artistIdsfromSupabase])

  if (isartistIdsfromSupabaseLoading || !artistInfoBySpotify)
    return <Spinner text={'가수 리스트 불러오는중...'} />

  return (
    <div>
      <h1 className="text-22 desktop:text-40 mt-42 grid place-items-center">
        좋아하는 가수
      </h1>
      <h2 className="text-14 desktop:text-20 grid place-items-center mb-20">
        (최대 5개)
      </h2>
      {artistInfoBySpotify &&
        artistInfoBySpotify.map(artist => (
          <RecommendArtistItem
            key={artist.id}
            artist={artist}
            isSelected={isArtistSelected(artist.id)}
            onClick={selectArtist}
          />
        ))}
    </div>
  )
}
