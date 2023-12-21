import { MenuIcon } from '@/assets'
import { useState } from 'react'
import { BottomSheet, ConfirmModal, PlaylistItem } from '..'
import { useConfirm, useModal } from '@/hooks'
import Portal from '@/utils/portal'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/zustand'
import { SaveProps, addSavedTracklist } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const SearchResultPlaylist = ({ playlists }) => {
  const navigate = useNavigate()
  const [visibleTracks, setVisibleTracks] = useState(3)
  const userInfo = useUserStore(state => state.userInfo)
  const { modalType, closeModal } = useModal()
  const { openConfirm, closeConfirm, isShow, confirmType } = useConfirm()
  const queryClient = useQueryClient()
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>()

  //음악 서랍 저장
  const saveBillMutation = useMutation<any[], Error, SaveProps>({
    mutationFn: addSavedTracklist,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  const handleClickLModalItem = e => {
    closeModal()
    //비로그인유저면 로그인시키기
    if (!userInfo.id) {
      openConfirm('loginInduce')
      return
    }

    //로그인 사용자일 경우 db 업데이트
    if (e.target.innerText === '음악서랍에 저장하기') {
      openConfirm('addOwnPlaylist')
    }
  }

  const handleConfirmClick = () => {
    closeConfirm()
    if (confirmType === 'loginInduce') {
      navigate('/entry')
    } else {
      if (userInfo.saved_tracklist.includes(selectedPlaylist.id)) {
        saveBillMutation.mutateAsync({
          prevSavedTracklist: userInfo.saved_tracklist,
          billId: selectedPlaylist.id,
          userId: userInfo.id
        })
        closeConfirm()
      } else {
        openConfirm('alreadyOwnPlaylist')
      }
    }
  }

  const loadMore = () => {
    setVisibleTracks(prevVisibleTracks => prevVisibleTracks + 3)
  }

  if (!playlists || playlists.items.length === 0) {
    return (
      <div className="relative mt-22">
        <MenuIcon />
        <h2 className="absolute text-mainBlack top-3 left-50 desktop:top-15 desktop:left-100">
          음악영수증
        </h2>
        <p>No Item</p>
      </div>
    )
  }

  return (
    <>
      <MenuIcon />
      <h2 className="absolute text-mainBlack top-4 left-40 desktop:top-5 desktop:left-80">
        음악영수증
      </h2>
      <div className="desktop:px-3 px-1 mt-4">
        <ul className="border-b-1">
          {playlists &&
            playlists.items.slice(0, visibleTracks).map(item => (
              <PlaylistItem
                data={item}
                key={item.id}
                setSelectedPlaylist={setSelectedPlaylist}
              />
            ))}
          {visibleTracks < playlists.items.length && (
            <button
              className="border-1 border-b-0 w-full hover:underline"
              onClick={loadMore}>
              더보기
            </button>
          )}
        </ul>
      </div>
      <Portal>
        {modalType === 'playlistMore' && (
          <BottomSheet onClick={handleClickLModalItem} />
        )}
        {isShow && <ConfirmModal onConfirmClick={handleConfirmClick} />}
      </Portal>
    </>
  )
}
