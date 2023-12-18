import { MyProfileInfo, MyProfileBill, Header, NavBar } from '@/components'

const Profile = () => {
  return (
    <div className="pb-80">
      <Header type="profile" />
      <MyProfileInfo />
      <MyProfileBill />
      <NavBar />
    </div>
  )
}

export default Profile
