import { MenuIcon } from '@/assets'
import { TopTrackItem } from './TopTrackItem'
import { getPlaylistTop50 } from '@/api/recommendApis'
import { useQuery } from '@tanstack/react-query'
const TOP_50 = import.meta.env.VITE_SPOTIFY_TOP_50_KR
export const TopTrackList = () => {
  
  const { data } = useQuery({
    queryKey: ['top50-trackList', TOP_50],
    queryFn: () => getPlaylistTop50(TOP_50),
    staleTime: 1000 * 60 * 60 * 24
  })

  return (
    <div className="mobile:px-20 desktop:px-60 mt-53 relative">
      <MenuIcon />
      <h1 className="absolute text-mainBlack mobile:top-4 left-70 desktop:top-5 desktop:left-130">
        TOP 50
      </h1>
      
      <div>
        <TopTrackItem tracks={data?.trackList} />
      </div>
    </div>
  )
}
