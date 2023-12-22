import { ProfileForm, ConfirmModal } from '@/components'
import { useConfirm } from '@/hooks'
import { getUserId } from '@/utils'
import Portal from '@/utils/portal'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileEdit = () => {
  const isLoggedInUser = getUserId()
  const navigate = useNavigate()
  const { openConfirm, isShow, closeConfirm } = useConfirm()

  useEffect(() => {
    if (!isLoggedInUser) {
      openConfirm('loginInduce')
    }
  }, [isLoggedInUser, navigate])

  const handleNavigateEntry = () => {
    closeConfirm()
    navigate('/entry')
  }

  return (
    <div className="desktop:px-60 px-20">
      <h1 className="text-center text-24 font-normal pt-52">프로필 설정</h1>
      <h2 className="text-center text-14 font-normal not-italic mt-14">
        나중에 언제든지 변경할 수 있습니다.
      </h2>
      <ProfileForm />
      {isShow && (
        <Portal>
          <ConfirmModal onConfirmClick={handleNavigateEntry} />
        </Portal>
      )}
    </div>
  )
}

export default ProfileEdit
