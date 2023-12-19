import { Spinner } from '@/assets'
import { ErrorComponent, MusicBill, MusicList, NavBar } from '@/components'
import { useUserInfo } from '@/hooks'
import { useParams } from 'react-router-dom'

type ValidParams = 'playnow' | 'bill'
const isValidParamsId = (id: string): boolean =>
  ['playnow', 'bill'].includes(id as ValidParams)

const MyMusic = () => {
  const { isLoading: isUserInfoLoading } = useUserInfo()
  const { id: currentPath = 'playnow' } = useParams<string>()

  if (!isValidParamsId(currentPath)) {
    return <ErrorComponent />
  }
  if (isUserInfoLoading) return <Spinner />

  return (
    <>
      <div className="px-20 desktop:px-60">
        {currentPath === 'playnow' && <MusicList />}
        {currentPath === 'bill' && <MusicBill />}
      </div>
      <NavBar />
    </>
  )
}

export default MyMusic
