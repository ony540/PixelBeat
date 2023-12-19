import { addCurrentTrackTable } from '@/api'
import { CirclePlaySmall } from '@/assets'
import { Track } from '@/types'
import { msToMinutesAndSeconds } from '@/utils'
import { useNowPlayStore, useUserStore } from '@/zustand'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const BillItem = ({
  track,
  trackNumber
}: {
  track: Track
  trackNumber: number
}) => {
  const { minutes, seconds } = msToMinutesAndSeconds(track.duration_ms)
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)
  const setIsPlaying = useNowPlayStore(state => state.setIsPlaying)
  const addTrackToNowPlay = useNowPlayStore(state => state.addTrackToNowPlay)
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

  const handleClickPreviewPlayButton = (track: Track) => {
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

  return (
    <li className="group mx-16 h-48 text-left text-16 flex items-center justify-between hover:bg-bgGray ">
      <div className="flex items-center">
        <span className="ml-8 mr-22">
          {String(trackNumber + 1).padStart(2, '0')}
        </span>
        <div className="leading-[1.2] inline-block w-194 overflow-hidden truncate">
          <div
            className={`${
              track.name.length >= 28 ? 'text-flow-on-hover' : ''
            }`}>
            <h3>{track.name}</h3>
          </div>
          <p
            className={`${
              track.artists.length >= 3
                ? 'text-flow-on-hover self-end text-14'
                : 'self-end text-14'
            }`}>
            {track.artists.map((artist, idx) => (
              <span key={idx}>
                {artist.name}
                {idx < track.artists.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="pr-3 flex">
        {track.preview_url && (
          <button
            className="hidden group-hover:block mr-18"
            onClick={() => handleClickPreviewPlayButton(track)}>
            <CirclePlaySmall />
          </button>
        )}

        <p className="mt-4">{`${minutes}:${seconds}`}</p>
      </div>
    </li>
  )
}
