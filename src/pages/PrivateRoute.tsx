import { ConfirmModal } from '@/components'
import { useUserInfo } from '@/hooks'
import { getUserId } from '@/utils'
import Portal from '@/utils/portal'
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

  if (error) {
    console.error('private route:', error)
  }

  const handleNavigateHome = () => {
    navigate('/home')
  }
  const handleNavigateEntry = () => {
    navigate('/entry')
  }

  if (!isLoggedUser && authentication) {
    return (
      <Portal>
        <ConfirmModal
          onConfirmClick={handleNavigateEntry}
          onCancelClick={handleNavigateHome}
        />
      </Portal>
    )
  }

  return <LazyComponent />
}

export default PrivateRoute
