import { useUserStore } from '@/zustand'
import Proifile from '@/assets/imgs/Profile.png'
export const MyProfileInfo = () => {
  const userInfo = useUserStore(state => state.userInfo)

  return (
    <div
      className="bg-mainGreen w-full h-119 flex items-center 
                  desktop:px-60 
                  mobile:px-20">
      <img
        className="w-90 h-90 ml-10"
        src={userInfo.avatar_url || Proifile}
        alt={userInfo.username || 'profile image'}
      />
      <div className="ml-16 text-mainBlack">
        <p className="text-20">{userInfo.username}</p>
        <p className="text-16">
          {userInfo.introduce || '작성된 자기소개가 없습니다.'}
        </p>
      </div>
    </div>
  )
}
