import {
  MyProfileInfo,
  MyBillList,
  Header,
  NavBar,
  MyLikeBillList,
  BottomSheet
} from '@/components'
import { useModal } from '@/hooks'
import Portal from '@/utils/portal'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
  const { id: currentPath } = useParams()
  const navigate = useNavigate()
  const { openModal } = useModal()

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

  const moveToProfileEdit = () => {
    navigate('/profileedit')
  }

  return (
    <div>
      <Header
        type="profile"
        onClickRightButton={handleBottomSheet}
      />
      <MyProfileInfo />
      {renderContents(currentPath)}
      <NavBar />

      <Portal>
        <BottomSheet onClick={moveToProfileEdit} />
      </Portal>
    </div>
  )
}

export default Profile
