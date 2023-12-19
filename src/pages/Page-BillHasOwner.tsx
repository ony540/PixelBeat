import { getBill } from '@/api'
import { Spinner } from '@/assets'
import { BillBoxHasOwner, BottomSheet, Header, NavBar } from '@/components'
import { BillButtonListSection } from '@/components/bill/BillButtonListSection'
import { useModal, useUserInfo } from '@/hooks'
import { TrackList } from '@/types'
import Portal from '@/utils/portal'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const BillHasOwner = () => {
  const { isLoading: isUserInfoLoading } = useUserInfo()
  const { id: playlistId, userid: userId } = useParams<string>()

  const { data, isLoading } = useQuery<TrackList | Error, Error, TrackList>({
    queryKey: ['bill', playlistId, userId],
    queryFn: () => getBill(playlistId!),
    enabled: !!playlistId
  })

  const { openModal, modalType } = useModal()
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const userInfo = useUserStore(state => state.userInfo)

  const handleClickMoreButton = () => {
    openModal('myBillMore')
  }

  //수정하기, 삭제하기 기능
  const handleClickModalButton = () => {}

  if (isLoading || isUserInfoLoading) return <Spinner />

  return (
    <>
      <Header
        type="bill"
        onClickRightButton={handleClickMoreButton}
        isNoneMore={!userInfo.id || userInfo.id !== userId}
      />
      <div className="w-390 desktop:w-[720px] h-52 bg-mainGreen pt-6">
        <div className="w-376 bg-[#282828] h-20 rounded-[10px] mx-auto"></div>
      </div>
      <BillBoxHasOwner
        data={data}
        profile={userInfo}
      />
      <BillButtonListSection
        data={data}
        propsClass={currentTrack ? 'mb-180' : 'mb-90'}
        profile={userInfo}
      />
      <NavBar />
      <Portal>
        {modalType === 'myBillMore' && (
          <BottomSheet onClick={handleClickModalButton} />
        )}
      </Portal>
    </>
  )
}

export default BillHasOwner
