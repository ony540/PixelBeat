import { ProgressBar, StandardVertex } from '.'
import { NextPlay, Pause, Play, PrevPlay } from '@/assets'
import { useModal, usePlayAndPausePreview } from '@/hooks'
import Portal from '@/utils/portal'
import { useNowPlayStore } from '@/zustand/nowPlayStore'
import { useEffect } from 'react'
import { Playnow } from './Playnow'
import { useNavigate } from 'react-router-dom'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'

export const PlayBar = ({ propsClass }: { propsClass?: string }) => {
  const navigate = useNavigate()
  const isPlaying = useNowPlayStore(state => state.isPlaying)
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const { name, album, artists, preview_url } = currentTrack || {
    name: '',
    album: { images: [{ url: '' }] },
    artists: [],
    duration_ms: 0,
    preview_url: ''
  }
  const {
    playAndPauseNowPlay,
    clickPrevButton,
    clickNextButton,
    audioRef,
    intervalIdRef
  } = usePlayAndPausePreview()

  const { openModal } = useModal()
  const handleClickPlayBar = () => {
    openModal()
  }

  const handleClickPrevButton = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    clickPrevButton()
  }
  const handleClickPlayAndPauseButton = (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation()
    playAndPauseNowPlay()
  }
  const handleClickNextButton = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    clickNextButton()
  }

  const handleClickAlbum = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/album/${album.id}`)
    e.stopPropagation()
  }
  const handleClickArtist = (
    e: React.MouseEvent<HTMLSpanElement>,
    artistId: string
  ) => {
    navigate(`/artist/${artistId}`)
    e.stopPropagation()
  }

  useEffect(() => {
    playAndPauseNowPlay()
    return () => {
      clearInterval(intervalIdRef.current!)
    }
  }, [])

  return (
    <>
      <aside
        className={`w-390 desktop:w-[720px] bg-mainBlack fixed left-[50%] translate-x-[-50%] ${propsClass}`}>
        <ProgressBar audioRef={audioRef} />
        <audio
          ref={audioRef}
          src={preview_url}
          loop={false}
        />
        <div
          onClick={handleClickPlayBar}
          className="flex justify-center items-center mx-auto px-20 desktop:px-60 h-68">
          {/* 앨범이미지 */}
          <div
            onClick={handleClickAlbum}
            className="relative mr-8 cursor-pointer shrink-0">
            <img
              src={album.images[2].url || defaultAlbumImg}
              alt={album.name}
              className="w-48 h-48"
            />
            <StandardVertex propsClass="h-48 absolute top-0" />
          </div>

          <div className="leading-[1.1] flex-1 basis-196 cursor-pointer overflow-hidden">
            <h5
              className={`text-16 desktop:text-20 ${
                name.length > 20 && 'text-flow-on-hover'
              }`}>
              {name}
            </h5>
            <p
              className={`text-mainGray200 text-12 desktop:text-16 ${
                artists.length > 3 && 'text-flow-on-hover'
              }`}>
              {artists.map((artist, idx) => (
                <span
                  onClick={e => handleClickArtist(e, artist.id)}
                  className="hover:underline"
                  key={idx}>
                  {artist.name}
                  {idx < artists.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
          <section className="h-24 ml-18 shrink-0">
            <button
              type="button"
              className="w-24 mr-10 hover:text-mainGreen"
              onClick={handleClickPrevButton}>
              <PrevPlay />
            </button>
            <button
              type="button"
              onClick={handleClickPlayAndPauseButton}
              className="w-24 mr-10 hover:text-mainGreen">
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button
              type="button"
              className="w-24 hover:text-mainGreen"
              onClick={handleClickNextButton}>
              <NextPlay />
            </button>
          </section>
        </div>
      </aside>
      <Portal>
        <Playnow
          audioRef={audioRef}
          playAndPauseNowPlay={playAndPauseNowPlay}
          clickNextButton={clickNextButton}
          clickPrevButton={clickPrevButton}
        />
      </Portal>
    </>
  )
}
