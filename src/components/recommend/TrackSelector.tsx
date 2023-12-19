import { getArtistTopTracks } from '@/api'
import { useRecommendStore } from '@/zustand'
import { RecommendTrackItem } from '..'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/assets'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const TrackSelector = () => {
  const navigate = useNavigate()
  const initialStore = useRecommendStore(state => state.initialStore)
  const artistIdStore = initialStore.artist
  const TrackIdStore = initialStore.track
  const selectTrack = useRecommendStore(state => state.selectTrack)
  const isSelectedTrack = (trackId: string) => TrackIdStore.includes(trackId)

  useEffect(() => {
    if (initialStore.artist.length === 0) {
      navigate('/recommend/genre')
    }
  }, [])

  const { data: tracks, isLoading } = useQuery({
    queryKey: ['artistTracks', artistIdStore],
    queryFn: async () => {
      const promises = artistIdStore.map(async item => {
        return getArtistTopTracks(item)
      })
      const results = await Promise.all(promises)
      return results.flat()
    },
    enabled: !!artistIdStore
  })

  if (isLoading) return <Spinner text={'트랙 리스트 불러오는 중...'} />

  return (
    <div>
      <h1 className="text-22 desktop:text-40 mt-42 grid place-items-center">
        좋아하는 노래
      </h1>
      <h2 className="text-14 desktop:text-20 grid place-items-center mb-20">
        (최대 5개)
      </h2>
      {tracks &&
        tracks.map((track: any) => (
          <RecommendTrackItem
            key={track.id}
            id={track.id}
            track={track}
            onClick={selectTrack}
            isSelected={isSelectedTrack(track.id)}
          />
        ))}
    </div>
  )
}
