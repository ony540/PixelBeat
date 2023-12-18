import { useNavigate } from 'react-router-dom'
import defaultAlbumImg from '@/assets/imgs/default_album_artist.png'
import { MoreIcon, StandardVertex } from '@/assets'
import { useModal } from '@/hooks'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { setCurrentTrackTable, setPlayingPositionTable } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const MusicListItem = ({
  track,
  index,
  setSelectedTrack,
  isSelected
}) => {
  const navigate = useNavigate()
  const { name, artists, album } = track
  const { openModal } = useModal()
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)
  const setIsPlaying = useNowPlayStore(state => state.setIsPlaying)
  const userInfo = useUserStore(state => state.userInfo)
  const queryClient = useQueryClient()

  //현재 음악 설정
  const setCurrentTrackTableMutation = useMutation({
    mutationFn: setCurrentTrackTable,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  const handleClickTrack = () => {
    setCurrentTrack(track)
    setIsPlaying(true)
    // setCurrentTrackTableMutation.mutateAsync({
    //   prevNowPlayTracklist: userInfo.nowplay_tracklist,
    //   track,
    //   userId: userInfo.id
    // })
  }

  const handleClickAlbum = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.stopPropagation()
    navigate(`/album/${id}`)
  }

  const handleClickMoreButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    openModal('myNowPlayTrackMore')
    setSelectedTrack({ track, trackIndex: index })
  }

  return (
    <li
      className="group flex justify-between items-center border-b-1 w-full h-62 hover:bg-mainGray300"
      onClick={handleClickTrack}>
      <div className="flex">
        <div
          onClick={e => handleClickAlbum(e, album.id)}
          className="relative my-8 ml-10 mr-12 cursor-pointer w-44">
          <img
            src={album.images[1] ? album.images[1].url : defaultAlbumImg}
            alt={`${name}.img`}
            className="h-44"
          />
          <StandardVertex propsClass="h-44 absolute top-0 text-mainBlack group-hover:text-mainGray300" />
        </div>
        <div
          className={`flex flex-col text-18 leading-15 mt-18 ${
            isSelected && 'text-mainGreen'
          }`}>
          <h3 className="musicTitle truncate w-150">{name}</h3>
          <p className="text-14 text-start">
            {artists.map((artist, idx) => (
              <span key={idx}>
                {artist.name}
                {idx < artists.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleClickMoreButton}
        className="w-24 h-24 mr-16">
        <MoreIcon />
      </button>
    </li>
  )
}
