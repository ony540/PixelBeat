import { getPlaylistFromSpotify } from '@/api'
import { BillBox, Header, NavBar } from '@/components'
import { BillButtonListSection } from '@/components/bill/BillButtonListSection'
import { useNowPlayStore } from '@/zustand'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const BillFromSpotify = () => {
  const { id: playlistId } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['playlistFromSpotify', playlistId],
    queryFn: () => getPlaylistFromSpotify(playlistId as string)
  })
  const currentTrack = useNowPlayStore(state => state.currentTrack)

  const handleClickMoreButton = () => {
    // 다른사람이면 -> 공유하기 바텀시트
    // 본인빌지면 -> 수정하기 바텀시트
  }

  if (isLoading) return <>loading..</>

  return (
    <>
      <Header
        type="bill"
        onClickRightButton={handleClickMoreButton}
      />
      <div className="w-390 desktop:w-[720px] h-52 bg-mainGreen pt-6">
        <div className="w-376 bg-[#282828] h-20 rounded-[10px] mx-auto"></div>
      </div>
      <BillBox data={data} />
      <BillButtonListSection
        data={data}
        propsClass={`mb-90 ${currentTrack && 'mb-180'}`}
      />
      <NavBar />
    </>
  )
}
