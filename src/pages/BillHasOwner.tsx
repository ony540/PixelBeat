import { getBill } from '@/api'
import { BillBoxHasOwner, BottomSheet, Header, NavBar } from '@/components'
import { BillButtonListSection } from '@/components/bill/BillButtonListSection'
import { useModal, useUserInfo } from '@/hooks'
import { TrackList } from '@/types'
import Portal from '@/utils/portal'
import { useNowPlayStore } from '@/zustand'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const BillHasOwner = () => {
  const { id: playlistId, userid: userId } = useParams<string>()
  const { profile, isLoading: isUserInfoDaLoading } = useUserInfo()
  const { data, isLoading } = useQuery<TrackList | Error, Error, TrackList>({
    queryKey: ['bill', playlistId, userId],
    queryFn: () => getBill(playlistId!),
    enabled: !!playlistId
  })

  const { openModal, modalType } = useModal()
  const currentTrack = useNowPlayStore(state => state.currentTrack)

  const handleClickMoreButton = () => {
    openModal('myBillMore')
  }

  //수정하기, 삭제하기 기능
  const handleClickModalButton = () => {}

  if (isLoading || isUserInfoDaLoading) return <>loading..</>

  return (
    <>
      <Header
        type="bill"
        onClickRightButton={handleClickMoreButton}
        isNoneMore={!profile.id || profile.id !== userId}
      />
      <div className="w-390 desktop:w-[720px] h-52 bg-mainGreen pt-6">
        <div className="w-376 bg-[#282828] h-20 rounded-[10px] mx-auto"></div>
      </div>
      <BillBoxHasOwner
        data={data}
        profile={profile}
      />
      <BillButtonListSection
        data={data}
        propsClass={currentTrack ? 'mb-180' : 'mb-90'}
        profile={profile}
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
