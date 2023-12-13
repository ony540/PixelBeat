import {
  CirclePause,
  CirclePlay,
  NextPlay,
  PrevPlay,
  SoundOff,
  SoundOn
} from '@/assets'
import { MusicList } from '@/assets/icons/play/MusicList'
import { Header, ProgressBar, StandardVertex } from '@/components'
import { useModal } from '@/hooks/useModal'
import { useNowPlayStore } from '@/zustand'
import { useState } from 'react'

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
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const isPlaying = useNowPlayStore(state => state.isPlaying)

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

  return (
    <div
      className={`${
        isShow ? 'open-playnow' : 'closing-playnow'
      } absolute w-390 desktop:w-[720px] bg-mainBlack left-[50%] translate-x-[-50%] top-0 h-[100vh] pt-10`}>
      <Header
        type="playnow"
        onClick={closeModal}
      />
      <div className="flex flex-col h-[calc(100vh-360px)] pt-16 justify-between">
        {/* 앨범이미지 */}
        <div className="relative min-w-224 w-[36vh] mx-auto aspect-square">
          <img
            src={currentTrack!.album.images[0].url}
            alt={currentTrack!.album.name}
          />
          <StandardVertex propsClass="min-w-224 w-[36.2vh] aspect-square absolute top-0" />
        </div>

        <div className="w-[calc(100%-20px)] px-20 desktop:px-60 mx-auto overflow-x-hidden">
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
        <div className="w-[calc(100%-20px)] px-20 desktop:px-60 h-30 pt-15 ">
          <ProgressBar
            audioRef={audioRef}
            isPlayNow
          />
        </div>
      </div>
      {/* 버튼리스트 */}
      <section className="w-full fixed bottom-20 flex flex-col justify-between items-center gap-32 px-13 py-20 playnowCircle">
        <button
          type="button"
          className="w-36 hover:text-mainGreen"
          onClick={closeModal}>
          <MusicList />
        </button>
        <div className="flex items-center gap-36">
          <button
            type="button"
            className="w-36 hover:text-mainGreen"
            onClick={clickPrevButton}>
            <PrevPlay />
          </button>
          <button
            type="button"
            onClick={playAndPauseNowPlay}
            className=" hover:text-mainGreen">
            {isPlaying ? <CirclePause /> : <CirclePlay />}
          </button>
          <button
            type="button"
            className="w-36 hover:text-mainGreen"
            onClick={clickNextButton}>
            <NextPlay />
          </button>
        </div>
        <button
          type="button"
          className="w-36 hover:text-mainGreen"
          onClick={handleClickSoundButton}>
          {isMuted ? <SoundOff /> : <SoundOn />}
        </button>
      </section>
    </div>
  )
}
