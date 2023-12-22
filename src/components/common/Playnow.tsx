import {
  CirclePause,
  CirclePlay,
  NextPlay,
  PrevPlay,
  SoundOff,
  SoundOn,
  StandardVertex
} from '@/assets'
import { MusicList } from '@/assets/icons/play/MusicList'
import { Header, ProgressBar } from '@/components'
import { useModal } from '@/hooks/useModal'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { useState } from 'react'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'
import { useNavigate } from 'react-router-dom'

export const Playnow = ({
  playAndPauseNowPlay,
  clickPrevButton,
  clickNextButton,
  audioRef
}: {
  playAndPauseNowPlay: () => void
  clickPrevButton: () => void
  clickNextButton: () => void
  audioRef: React.RefObject<HTMLAudioElement>
}) => {
  const navigate = useNavigate()
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const isPlaying = useNowPlayStore(state => state.isPlaying)
  const userId = useUserStore(state => state.userInfo.id)

  const { isShow, isVisible, closeModal } = useModal()

  const [isMuted, setIsMuted] = useState<boolean>(
    audioRef ? audioRef.current?.muted! : false
  )

  if (!isVisible) return null

  const handleClickSoundButton = () => {
    setIsMuted(prevMuted => !prevMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const handleClickListButton = () => {
    closeModal()
    if (userId) {
      navigate('/mymusic/playnow')
    }
  }

  return (
    <div
      className={`${
        isShow ? 'open-playnow' : 'closing-playnow'
      } absolute w-390 desktop:w-[720px] bg-mainBlack left-[50%] translate-x-[-50%] top-0 h-[calc(100vh-10px)] pt-10`}>
      <Header
        type="playnow"
        onClickRightButton={closeModal}
      />
      <div className="flex flex-col h-[calc(100vh-360px)] pt-16 justify-between">
        {/* 앨범이미지 */}
        <div className="relative min-w-224 w-[36vh] mx-auto aspect-square">
          <img
            src={
              currentTrack!.album.images[0]
                ? currentTrack!.album.images[0].url
                : defaultAlbumImg
            }
            alt={currentTrack!.album.name}
          />
          <StandardVertex propsClass="min-w-224 w-[36.2vh] aspect-square absolute top-0 text-black" />
        </div>

        <div className="w-[calc(100%-20px)] px-20 desktop:px-60 mt-10 mx-auto shrink-0 overflow-x-hidden">
          <h2
            className={`text-20 desktop:text-28 ${
              currentTrack!.name.length > 20 && 'text-flow-on-hover'
            }`}>
            {currentTrack!.name}
          </h2>
          <p
            className={`text-16 desktop:text-20 ${
              currentTrack!.artists.length > 3 && 'text-flow-on-hover'
            }`}>
            {currentTrack!.artists.map((artist, idx) => (
              <span
                className="hover:underline"
                key={idx}>
                {artist.name}
                {idx < currentTrack!.artists.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
        <div className="w-[calc(100%-20px)] px-20 desktop:px-60 h-30 pt-15 shrink-0 ">
          <ProgressBar
            audioRef={audioRef}
            isPlayNow
          />
        </div>
      </div>
      {/* 버튼리스트 */}
      <section className="playnowCircle">
        <button
          type="button"
          className="playnowBtn"
          onClick={handleClickListButton}>
          <MusicList />
        </button>
        <div className="flex items-center gap-20 mobile:gap-36 desktop:gap-36">
          <button
            type="button"
            className="playnowBtn"
            onClick={clickPrevButton}>
            <PrevPlay />
          </button>
          <button
            type="button"
            onClick={playAndPauseNowPlay}
            className="hover:text-mainGreen">
            {isPlaying ? <CirclePause /> : <CirclePlay />}
          </button>
          <button
            type="button"
            className="playnowBtn"
            onClick={clickNextButton}>
            <NextPlay />
          </button>
        </div>
        <button
          type="button"
          className="playnowBtn"
          onClick={handleClickSoundButton}>
          {isMuted ? <SoundOff /> : <SoundOn />}
        </button>
      </section>
    </div>
  )
}
