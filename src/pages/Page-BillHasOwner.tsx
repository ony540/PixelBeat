import { deleteBill, getBill } from '@/api'
import { Spinner } from '@/assets'
import { BillBoxHasOwner, BottomSheet, Header, NavBar } from '@/components'
import { BillButtonListSection } from '@/components/bill/BillButtonListSection'
import { useModal } from '@/hooks'
import { TrackList } from '@/types'
import Portal from '@/utils/portal'
import { useNowPlayStore, useRecommendStore, useUserStore } from '@/zustand'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BillHasOwner = () => {
  const userInfo = useUserStore(state => state.userInfo)
  const { id: playlistId, userid: userId } = useParams<string>()
  const { openModal, modalType, closeModal } = useModal()
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const resetRecommendStore = useRecommendStore(
    state => state.resetRecommendStore
  )

  useEffect(() => {
    resetRecommendStore()
  }, [])

  const { data, isLoading } = useQuery<TrackList | Error, Error, TrackList>({
    queryKey: ['bill', playlistId, userId],
    queryFn: () => getBill(playlistId!),
    enabled: !!playlistId
  })

  const deleteBillMutation = useMutation({
    mutationFn: deleteBill,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userId]
      })
      navigate('/home')
      closeModal()
    },
    onError(error) {
      console.log(error)
    }
  })

  const handleClickMoreButton = () => {
    openModal('myBillMore')
  }

  // 수정하기 기능 추가 예정
  const handleClickModalButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.innerText) {
      case '삭제하기':
        deleteBillMutation.mutateAsync(playlistId)
        break
      default:
        return
    }
  }

  if (isLoading) return <Spinner />

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
      <BillBoxHasOwner data={data} />
      <BillButtonListSection
        data={data}
        propsClass={currentTrack ? 'mb-180' : 'mb-90'}
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
