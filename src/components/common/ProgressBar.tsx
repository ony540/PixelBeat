import progressDot from '@/assets/imgs/progressDot.png'
import { useNowPlayStore } from '@/zustand'

type ProgressBartProps = {
  audioRef: React.RefObject<HTMLAudioElement>
  isPlayNow?: boolean
}

export const ProgressBar = ({
  audioRef,
  isPlayNow = false
}: ProgressBartProps) => {
  const playingPosition = useNowPlayStore(state => state.playingPosition)
  const setPlayingPosition = useNowPlayStore(state => state.setPlayingPosition)

  const handleChangePlayingPosition = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlayingPosition(e.target.value as unknown as number)
    const newPosition =
      Math.round(audioRef.current?.duration! * +e.target.value) / 100
    audioRef.current!.currentTime = newPosition
  }

  return (
    <div className="relative">
      <div className="w-inherit h-3 bg-mainWhite relative">
        <div
          className={`bg-mainGreen h-3 transition-all ease-linear duration-100`}
          style={{ width: `${playingPosition}%` }}></div>
        <div
          className="w-12 absolute top-[-5px] desktop:w-18 desktop:top-[-9px] transition-all ease-linear duration-100"
          style={{
            left: `${
              isPlayNow
                ? playingPosition
                : playingPosition < 97.8
                  ? playingPosition
                  : 97.8
            }%`
          }}>
          <img
            src={progressDot}
            alt="음악 플레이 핸들이미지"
          />
        </div>
      </div>
      <label
        htmlFor="musicPlayingPosition"
        className="a11y-hidden">
        음악진행도
      </label>
      <input
        type="range"
        id="musicPlayingPosition"
        className="progressbar"
        min="0"
        max="100"
        step="0.5"
        value={playingPosition}
        onChange={handleChangePlayingPosition}
      />
    </div>
  )
}
