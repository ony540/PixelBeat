import { getArtistTracks } from '@/api/recommendApis'
import { recommendStore } from '@/zustand'
import { useEffect, useState } from 'react'
import { TrackItem } from '..'

export const TrackSelector = () => {
  const { initialStore }: any = recommendStore()
  const artistIdStore: string[] = initialStore.artist
  const TrackIdStore: string[] = initialStore.track
  const [tracks, setTracks] = useState<any>([])
  const selectTrack = recommendStore((state: any) => state.selectTrack)
  const isSelectedTrack = (trackId: string) => TrackIdStore.includes(trackId)

  useEffect(() => {
    const fetchData = async () => {
      const promises = artistIdStore.map(async item => {
        return getArtistTracks(item)
      })
      const results = await Promise.all(promises)
      const combinedSongList = results.reduce(
        (acc, curr) => acc.concat(curr),
        []
      )
      setTracks(combinedSongList)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-40 grid place-items-center">좋아하는 노래</h1>
      <h2 className="text-20 grid place-items-center mb-20">(최대 5개)</h2>
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
