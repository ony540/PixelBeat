import {
  MyProfileInfo,
  MyBillList,
  Header,
  NavBar,
  MyLikeBillList
} from '@/components'
import { Navigate, useParams } from 'react-router-dom'

const Profile = () => {
  const { id: currentPath } = useParams()

  if (currentPath !== 'me' && currentPath !== 'like') {
    return <Navigate to="/profile/me" />
  }

  const renderContents = (id: string) => {
    return {
      me: <MyBillList />,
      like: <MyLikeBillList />
    }[id]
  }

  return (
    <div>
      <Header type="profile" />
      <MyProfileInfo />
      {renderContents(currentPath)}
      <NavBar />
    </div>
  )
}

export default Profile
