import { shareData } from '@/utils'
import { StandardButton } from '..'
import { useNowPlayStore } from '@/zustand'
import { useNavigate } from 'react-router-dom'

export const BillButtonListSection = ({
  data,
  propsClass
}: {
  data?: any
  propsClass?: string
}) => {
  const navigate = useNavigate()
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)
  const setNowPlayList = useNowPlayStore(state => state.setNowPlayList)
  const nowPlayTracks = useNowPlayStore(state => state.tracks)

  const handleClickPlayAllTrackButton = () => {
    const billTracks = data.tracks.items
      .map(item => item.track)
      .filter(track => track.preview_url)
    setNowPlayList([...nowPlayTracks, billTracks])
    setCurrentTrack(billTracks[0])
  }

  const handleClickToLoginButton = () => {
    navigate('/entry')
  }

  const handleClickShareButton = () => {
    // 배포 후 수정(data타입으로 수정)
    const shareLink = 'YOUR_SHARE_LINK'
    shareData({ url: shareLink })
  }

  return (
    <section className={`button-section w-356 mx-auto text-20 ${propsClass}`}>
      <StandardButton
        text={data ? '전체 재생하기' : '다른 영수증 구경가기'}
        onClick={
          data ? handleClickPlayAllTrackButton : handleClickToLoginButton
        }
      />
      <StandardButton
        text={'공유하기'}
        onClick={handleClickShareButton}
        fillColor="#FFFF57"
        propsClass="mx-auto mt-12 mb-42"
      />
    </section>
  )
}
