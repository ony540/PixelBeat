import { getPlaylistFromSpotify } from '@/api'
import { BillBox, Header, NavBar, PlayBar } from '@/components'
import { BillButtonListSection } from '@/components/bill/BillButtonListSection'
import Portal from '@/utils/portal'
import { useNowPlayStore } from '@/zustand'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

export const BillFromSpotify = () => {
  const { id: playlistId } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['playlistFromSpotify', playlistId],
    queryFn: () => getPlaylistFromSpotify(playlistId as string)
  })
  const navigate = useNavigate()
  const currentTrack = useNowPlayStore(state => state.currentTrack)

  const handleClickBackButton = () => {
    navigate(-1)
  }
  const handleClickMoreButton = () => {
    //다른사람이면 -> 공유하기 바텀시트
    // 본인빌지면 -> 수정하기 바텀시트
  }

  if (isLoading) return <>loading..</>

  return (
    <>
      <Header
        type="bill"
        onClickLeftButton={handleClickBackButton}
        onClickRightButton={handleClickMoreButton}
      />
      <div className="w-390 desktop:720 h-52 bg-mainGreen pt-6">
        <div className="w-376 bg-[#282828] h-20 rounded-[10px] mx-auto"></div>
      </div>
      <BillBox data={data} />
      <BillButtonListSection
        data={data}
        propsClass={`mb-90 ${currentTrack && 'mb-150'}`}
      />
      <NavBar />
    </>
  )
}