import { signOutUser } from '@/api'
import {
  MyProfileInfo,
  MyBillList,
  Header,
  NavBar,
  MyLikeBillList,
  BottomSheet,
  ConfirmModal
} from '@/components'
import { useConfirm, useModal } from '@/hooks'
import Portal from '@/utils/portal'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
  const setUserInfo = useUserStore(state => state.resetUserInfo)
  const setNowPlayStore = useNowPlayStore(state => state.reset)

  const { id: currentPath } = useParams()
  const navigate = useNavigate()
  const { openModal, isVisible } = useModal()
  const { openConfirm, closeConfirm, isShow } = useConfirm()

  if (currentPath !== 'me' && currentPath !== 'like') {
    return <Navigate to="/profile/me" />
  }

  const renderContents = (id: string) => {
    return {
      me: <MyBillList />,
      like: <MyLikeBillList />
    }[id]
  }

  const handleBottomSheet = () => {
    openModal('profileMeMore')
  }

  const moveToHome = () => {
    navigate('/home')
  }

  const handleBottomSheetContentClick = async e => {
    const { innerText: contents } = e.target

    if (contents === '프로필 수정하기') {
      navigate('/profileedit')
    }

    if (contents === '로그아웃') {
      openConfirm('logout')
    }
  }

  const handleLogout = async () => {
    try {
      await signOutUser()
      setUserInfo()
      setNowPlayStore()
      navigate('/home')
    } catch (error) {
      console.error('로그아웃 에러:', error)
    }
  }

  return (
    <div>
      <Header
        type="profile"
        onClickRightButton={handleBottomSheet}
        onClickLeftButton={moveToHome}
      />
      <MyProfileInfo />
      {renderContents(currentPath)}
      <NavBar />

      <Portal>
        {isVisible && <BottomSheet onClick={handleBottomSheetContentClick} />}
        {isShow && (
          <ConfirmModal
            onCancelClick={closeConfirm}
            onConfirmClick={handleLogout}
          />
        )}
      </Portal>
    </div>
  )
}

export default Profile
