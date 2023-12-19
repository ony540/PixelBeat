import { useUserInfo } from '@/hooks'

const PublicRoute = ({ LazyComponent }): React.ReactElement => {
  const { userInfo } = useUserInfo()

  return <LazyComponent />
}

export default PublicRoute
