import { Spinner } from '@/assets'
import { ErrorComponent, MusicList, MusicShelf, NavBar } from '@/components'
import { useUserInfo } from '@/hooks'
import { useParams } from 'react-router-dom'

type ValidParams = 'playnow' | 'shelf'
const isValidParamsId = (id: string): boolean =>
  ['playnow', 'shelf'].includes(id as ValidParams)

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
        {currentPath === 'shelf' && <MusicShelf />}
      </div>
      <NavBar />
    </>
  )
}

export default MyMusic
