import { getArtistTopTracks } from '@/api/recommendApis'
import { useRecommendStore } from '@/zustand'
import { TrackItem } from '..'
import { useQuery } from '@tanstack/react-query'

export const TrackSelector = () => {
  const initialStore = useRecommendStore(state => state.initialStore)
  const artistIdStore = initialStore.artist
  const TrackIdStore = initialStore.track
  const selectTrack = useRecommendStore(state => state.selectTrack)
  const isSelectedTrack = (trackId: string) => TrackIdStore.includes(trackId)

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

  if (isLoading) return <>loading...</>

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
          <TrackItem
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
