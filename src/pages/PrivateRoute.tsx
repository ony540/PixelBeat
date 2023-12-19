import { useUserInfo } from '@/hooks'
import { getUserId } from '@/utils'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({
  authentication,
  LazyComponent
}: {
  authentication?: boolean
  LazyComponent?: any
}): React.ReactElement => {
  const isLoggedUser = getUserId()
  const { error } = useUserInfo()

  if (error) {
    console.error('private route:', error)
  }

  if (!isLoggedUser && authentication) {
    alert('로그인 필요~~')
    return <Navigate to="/entry" />
  }

  return <LazyComponent />
}

export default PrivateRoute
