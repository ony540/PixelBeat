import { MyProfileInfo, MyProfileBill, Header, NavBar } from '@/components'

export const Profile = () => {
  return (
    <>
      <Header type='profile' />
      <MyProfileInfo />
      <MyProfileBill />
      <NavBar />
    </>  
  )
}
