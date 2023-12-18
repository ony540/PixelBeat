import { ErrorComponent, MusicBill, MusicList, NavBar } from '@/components'
import { useUserInfo } from '@/hooks'
import { useParams } from 'react-router-dom'

type ValidParams = 'playnow' | 'bill'
const isValidParamsId = (id: string): boolean =>
  ['playnow', 'bill'].includes(id as ValidParams)

export const MyMusic = () => {
  const { id: currentPath = 'playnow' } = useParams<string>()
  const {} = useUserInfo()

  if (!isValidParamsId(currentPath)) {
    return <ErrorComponent />
  }
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
