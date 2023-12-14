import { MyProfileInfo, MyProfileBill, Header, NavBar } from '@/components'

export const Profile = () => {
  return (
    <div className='pb-80'>
      <Header type='profile' />
      <MyProfileInfo />
      <MyProfileBill />
      <NavBar />
    </div>  
  )
}
