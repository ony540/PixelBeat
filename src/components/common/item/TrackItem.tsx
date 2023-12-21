import { CirclePlaySmall, MoreIcon } from '@/assets'
import { useModal } from '@/hooks'
import { Track } from '@/types'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { useNavigate } from 'react-router-dom'
import defaultAlbumImg from '@/assets/imgs/default_album_artist.png'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCurrentTrackTable } from '@/api'

export const TrackItem = ({
  data,
  setSelectedTrack
}: {
  data: Track
  setSelectedTrack: (track: Track) => void
}) => {
  const navigate = useNavigate()

  const { openModal } = useModal()
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

  const handleClickAlbum = (id: string) => {
    navigate(`/album/${id}`)
  }

  const handleClickAritst = (id: string) => {
    navigate(`/artist/${id}`)
  }

  const handleClickPlayButton = (track: Track) => {
    addTrackToNowPlay(track)
    setCurrentTrack(track)
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

  const handleClickMoreButton = () => {
    openModal('trackMore')
    setSelectedTrack(data)
  }

  return (
    <li className="border-1 border-b-0 flex datas-center gap-10 hover:bg-mainGray300 relative group">
      <img
        onClick={() => handleClickAlbum(data.album.id)}
        className="w-50 h-51 mr-4
                 desktop:w-65 desktop:h-66 cursor-pointer"
        src={data.album.images[1] ? data.album.images[1].url : defaultAlbumImg}
        alt={`${data.name}.img`}
      />
      <div className="flex flex-col overflow-hidden justify-center w-214 desktop:w-450 leading-[1.2] desktop:text-20 truncate">
        <p className={data.name.length > 20 ? 'text-flow-on-hover' : ''}>
          {data.name}
        </p>
        <p className={data.artists.length > 2 ? 'text-flow-on-hover' : ''}>
          {data.artists.map((artist, idx) => (
            <span
              key={idx}
              className="cursor-pointer hover:underline"
              onClick={() => handleClickAritst(artist.id)}>
              {artist.name}
              {idx < data.artists.length - 1 && ', '}
            </span>
          ))}
        </p>
      </div>

      {data.preview_url && (
        <button
          type="button"
          onClick={() => handleClickPlayButton(data)}
          className="absolute top-[50%] translate-y-[-50%] right-42">
          <CirclePlaySmall isWhite />
        </button>
      )}
      <button
        type="button"
        onClick={handleClickMoreButton}
        className="absolute top-[50%] translate-y-[-50%] right-10">
        <MoreIcon />
      </button>
    </li>
  )
}
