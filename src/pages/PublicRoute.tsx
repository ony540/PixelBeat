import { useUserInfo } from '@/hooks'

const PublicRoute = ({ LazyComponent }): React.ReactElement => {
 useUserInfo()

  return <LazyComponent />
}

export default PublicRoute
