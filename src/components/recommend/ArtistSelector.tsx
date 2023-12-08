import { getArtistId } from '@/api'
import { getArtistInfo } from '@/api/recommendApis'
import { recommendStore } from '@/zustand'
import { useEffect, useState } from 'react'
import { ArtistItem } from '..'

export const ArtistSelector = () => {
  const { initialStore }: any = recommendStore()
  const genreStore: string[] = initialStore.genre
  const selectArtist = recommendStore((state: any) => state.selectArtist)
  const artistIdStore: string[] = initialStore.artist
  const [artists, setArtists] = useState<any[]>([])

  const isArtistSelected = (artistId: string) =>
    artistIdStore.includes(artistId)

  useEffect(() => {
    const getArtistIdBySupabase = async (params: string[]) => {
      const artistIds = await getArtistId(params)

      if (params.length < 3) {
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

    const fetchData = async () => {
      const selectedArtistIds = await getArtistIdBySupabase(genreStore)
      const getArtistInfoBySpotify = await getArtistInfo(selectedArtistIds)
      setArtists(getArtistInfoBySpotify)
    }

    fetchData()
  }, [genreStore])

  return (
    <div>
      <h1 className="text-40 grid place-items-center">좋아하는 가수</h1>
      <h2 className="text-20 grid place-items-center mb-20">(최대 5개)</h2>
      {artists &&
        artists.map(artist => (
          <ArtistItem
            key={artist.id}
            artist={artist}
            isSelected={isArtistSelected(artist.id)}
            onClick={selectArtist}
          />
        ))}
      {!artists && (
        <div className="mx-auto my-0 w-[330px]">
          먼저 장르를 선택하고 오세요...
        </div>
      )}
    </div>
  )
}
