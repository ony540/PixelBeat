import { ProfileForm } from '@/components/Profile'
import { getUserId } from '@/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileEdit = () => {
  const isLoggedInUser = getUserId()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedInUser) {
      alert('로그인이 필요한 페이지 입니다.')
      navigate('/entry')
    }
  }, [isLoggedInUser, navigate])

  return (
    <div className="desktop:px-60 mobile:px-20">
      <h1 className="text-center text-24 font-normal pt-52">프로필 설정</h1>
      <h2 className="text-center text-14 font-normal not-italic mt-14">
        나중에 언제든지 변경할 수 있습니다.
      </h2>
      <ProfileForm />
    </div>
  )
}

export default ProfileEdit
