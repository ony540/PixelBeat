import { getPlaylistFromSpotify } from '@/api'
import { Spinner } from '@/assets'
import { BillBox, Header, NavBar } from '@/components'
import { BillButtonListSection } from '@/components/bill/BillButtonListSection'
import { useNowPlayStore } from '@/zustand'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const BillFromSpotify = () => {
  const { id: playlistId } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['playlistFromSpotify', playlistId],
    queryFn: () => getPlaylistFromSpotify(playlistId as string)
  })
  const currentTrack = useNowPlayStore(state => state.currentTrack)

  if (isLoading) return <Spinner />

  return (
    <>
      <Header
        type="bill"
        isNoneMore
      />
      <div className="w-390 desktop:w-[720px] h-52 bg-mainGreen pt-6">
        <div className="w-376 bg-[#282828] h-20 rounded-[10px] mx-auto"></div>
      </div>
      <BillBox data={data} />
      <BillButtonListSection
        data={data}
        propsClass={currentTrack ? 'mb-180' : 'mb-90'}
        isFromSpotify
      />
      <NavBar />
    </>
  )
}

export default BillFromSpotify
