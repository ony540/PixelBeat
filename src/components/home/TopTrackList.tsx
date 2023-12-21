import { MenuIcon, Spinner } from '@/assets'
import { TopTrackItem } from './TopTrackItem'
import { useQuery } from '@tanstack/react-query'
import { getPlaylistFromSpotify } from '@/api'
const TOP_50 = import.meta.env.VITE_SPOTIFY_TOP_50_KR

export const TopTrackList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['top50-trackList', TOP_50],
    queryFn: () => getPlaylistFromSpotify(TOP_50),
    staleTime: 1000 * 60 * 60 * 24
  })
  if (isLoading) return <Spinner />

  return (
    <div className="px-20 desktop:px-60 mt-53 relative">
      <MenuIcon />
      <h1 className="absolute text-mainBlack top-4 left-70 desktop:top-5 desktop:left-130">
        TOP 50
      </h1>

      <div>
        <TopTrackItem tracks={data.tracks.items} />
      </div>
    </div>
  )
}
