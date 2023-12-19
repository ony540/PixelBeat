import { StandardPixelBorder, StandardVertex, CirclePlaySmall } from '@/assets'
import { Track } from '@/types'
import { useNowPlayStore, useUserStore } from '@/zustand'
import defaultAlbumImg from '../../assets/imgs/default_album_artist.png'
import { useNavigate } from 'react-router-dom'
import { useSwipe } from '@/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCurrentTrackTable } from '@/api'

export const TopTrackItem = ({ tracks }) => {
  const navigate = useNavigate()
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)
  const addTrackToNowPlay = useNowPlayStore(state => state.addTrackToNowPlay)
  const setIsPlaying = useNowPlayStore(state => state.setIsPlaying)
  const setNowPlayStore = useNowPlayStore(state => state.setNowPlayStore)
  const userInfo = useUserStore(state => state.userInfo)
  const setUserInfo = useUserStore(state => state.setUserInfo)
  const queryClient = useQueryClient()

  //현재재생목록에 추가 및 지금 재생
  const addCurrentTrackTableMutation = useMutation({
    mutationFn: addCurrentTrackTable,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
      setUserInfo(data)
      setNowPlayStore(data.nowplay_tracklist)
    },
    onError(error) {
      console.log(error)
    }
  })

  const handleClickPlayButton = (track: Track) => {
    setCurrentTrack(track)
    addTrackToNowPlay(track)
    setIsPlaying(true)
    //로그인 유저 db update
    if (userInfo.id) {
      addCurrentTrackTableMutation.mutateAsync({
        prevNowPlayTracklist: userInfo.nowplay_tracklist,
        track,
        userId: userInfo.id
      })
    }
  }
  const handleClickAlbum = (id: string) => {
    navigate(`/album/${id}`)
  }

  const handleClickAritst = (id: string) => {
    navigate(`/artist/${id}`)
  }

  const {
    isDrag,
    scrollRef,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd
  } = useSwipe()

  return (
    <ul
      ref={scrollRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      className="top-track-grid overflow-y-hidden h-295 mb-180 mt-16">
      {tracks &&
        tracks.map((item, idx) => (
          <li
            className="group relative mobile:h-60 mobile:w-330 desktop:h-60 desktop:w-[450px] hover:bg-"
            key={item + idx}>
            <StandardPixelBorder isHeight={66} />
            <div
              className="w-48 h-48 absolute left-10 top-9  cursor-pointer"
              onClick={() => {
                if (!isDrag) handleClickAlbum(item.track.album.id)
              }}>
              <img
                src={
                  item.track.album
                    ? item.track.album?.images[2]?.url
                    : defaultAlbumImg
                }
                loading="lazy"
              />
              <StandardVertex propsClass="text-black absolute w-48 h-48 top-0" />
            </div>
            <p className="absolute top-20 left-59 desktop:left-62 w-30 text-center">
              {idx + 1}
            </p>
            <div
              className={`absolute whitespace-nowrap mobile:top-12 desktop:top-10 ${
                idx >= 9 ? 'left-105' : 'left-90 desktop:left-100'
              } w-180 desktop:w-[280px] overflow-hidden text-18 desktop:text-20 leading-[1.2]`}>
              <div
                className={`${
                  item.track.name.length > 26 ? 'text-flow-on-hover' : ''
                }`}>
                <p>{item.track.name}</p>
              </div>
              <p className=" text-14 desktop:text-16">
                {item.track.artists.map((artist, idx) => (
                  <span
                    key={idx}
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      if (!isDrag) handleClickAritst(artist.id)
                    }}>
                    {artist.name}
                    {idx < item.track.artists.length - 1 && ', '}
                  </span>
                ))}
              </p>
            </div>
            {item.track.preview_url && (
              <button
                className="absolute top-20 right-18 "
                onClick={() => {
                  if (!isDrag) handleClickPlayButton(item.track)
                }}>
                <CirclePlaySmall
                  isWhite
                  isBig
                />
              </button>
            )}
          </li>
        ))}
    </ul>
  )
}
