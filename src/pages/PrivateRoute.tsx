import { ConfirmModal } from '@/components'
import { useConfirm, useUserInfo } from '@/hooks'
import { getUserId } from '@/utils'
import Portal from '@/utils/portal'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({
  authentication,
  LazyComponent
}: {
  authentication?: boolean
  LazyComponent?: any
}): React.ReactElement => {
  const navigate = useNavigate()
  const isLoggedUser = getUserId()
  const { error } = useUserInfo()
  const { openConfirm, isShow, closeConfirm, confirmType } = useConfirm()

  if (error) {
    console.error('private route:', error)
  }

  const handleNavigateHome = () => {
    closeConfirm()
    navigate('/home')
  }

  const handleNavigateEntry = () => {
    closeConfirm()
    navigate('/entry')
  }

  useEffect(() => {
    if (!isLoggedUser && authentication) {
      openConfirm('loginInduce')
    }
  }, [isShow])

  return (
    <>
      {confirmType !== 'logout' && confirmType !== 'profileEdit' && isShow ? (
        <Portal>
          <ConfirmModal
            onConfirmClick={handleNavigateEntry}
            onCancelClick={handleNavigateHome}
          />
        </Portal>
      ) : (
        <LazyComponent />
      )}
    </>
  )
}

export default PrivateRoute
