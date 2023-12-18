import { setCurrentTrackTable, setPlayingPositionTable } from '@/api'
import { Track } from '@/types'
import { useNowPlayStore } from '@/zustand/nowPlayStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { useUserStore } from '@/zustand'

export const usePlayAndPausePreview = () => {
  const isPlaying = useNowPlayStore(state => state.isPlaying)
  const playingPosition = useNowPlayStore(state => state.playingPosition)
  const tracks = useNowPlayStore(state => state.tracks)
  const setIsPlaying = useNowPlayStore(state => state.setIsPlaying)
  const setPlayingPosition = useNowPlayStore(state => state.setPlayingPosition)
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)

  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

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

  //재생시간 지정
  const setPlayingPositionTableMutation = useMutation({
    mutationFn: setPlayingPositionTable,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  //음악재생
  const playMusic = () => {
    setIsPlaying(true)
    audioRef.current!.currentTime =
      (audioRef.current?.duration! * playingPosition) / 100
    audioRef.current!.play()

    intervalIdRef.current = setInterval(() => {
      const { currentTrack } = useNowPlayStore.getState()

      if (audioRef.current?.duration) {
        setPlayingPosition(
          Math.round(
            (audioRef.current?.currentTime! / audioRef.current?.duration!) *
              10000
          ) / 100
        )
      }

      //노래가 끝나면 다음곡으로 넘기기
      if (audioRef.current?.ended) {
        const isLastSong = tracks.indexOf(currentTrack!) === tracks.length - 1

        if (isLastSong) {
          pauseMusic()
          setCurrentTrack(null)
          setCurrentTrackTableMutation.mutateAsync({
            prevNowPlayTracklist: userInfo.nowplay_tracklist,
            track: null,
            userId: userInfo.id
          })

          setPlayingPosition(0)
        } else {
          changeMusic(tracks[tracks.indexOf(currentTrack!) + 1])
        }
      }
    }, 100)
  }

  //음악정지
  const pauseMusic = () => {
    const { playingPosition } = useNowPlayStore.getState()
    setIsPlaying(false)
    audioRef.current!.pause()
    clearInterval(intervalIdRef.current!)
    if (userInfo.id) {
      setPlayingPositionTableMutation.mutateAsync({
        prevNowPlayTracklist: userInfo.nowplay_tracklist,
        playingPosition,
        userId: userInfo.id
      })
    }
  }

  //음악변경 후 재생
  const changeMusic = (changedTrack?: Track) => {
    const { currentTrack } = useNowPlayStore.getState()

    if (changedTrack) {
      setCurrentTrack(changedTrack)
      if (userInfo.id) {
        setCurrentTrackTableMutation.mutateAsync({
          prevNowPlayTracklist: userInfo.nowplay_tracklist,
          track: changedTrack,
          userId: userInfo.id
        })
      }
    }
    const nowChangedTrack = changedTrack ? changedTrack : currentTrack
    audioRef.current!.src = nowChangedTrack?.preview_url!
    setPlayingPosition(0)
    audioRef.current!.load()

    audioRef.current!.addEventListener('canplay', function () {
      playMusic()
    })
  }

  //재생 및 멈춤
  const playAndPauseNowPlay = useCallback(() => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  }, [isPlaying, tracks, setIsPlaying, setPlayingPosition, setCurrentTrack])

  //이전곡 재생
  const clickPrevButton = () => {
    const { currentTrack } = useNowPlayStore.getState()
    const isFirstSong = tracks.indexOf(currentTrack!) === 0

    setPlayingPosition(0)
    changeMusic(
      isFirstSong
        ? tracks[tracks.length - 1]
        : tracks[tracks.indexOf(currentTrack!) - 1]
    )
  }

  //다음곡 재생
  const clickNextButton = () => {
    const { currentTrack } = useNowPlayStore.getState()
    const isLastSong = tracks.indexOf(currentTrack!) === tracks.length - 1

    setPlayingPosition(0)
    changeMusic(
      isLastSong ? tracks[0] : tracks[tracks.indexOf(currentTrack!) + 1]
    )
  }

  //음악 변경을 감지
  useEffect(() => {
    if (audioRef.current) {
      const unsubscribe = useNowPlayStore.subscribe(state => {
        if (
          state.currentTrack &&
          state.currentTrack?.preview_url !== audioRef.current?.src!
        ) {
          changeMusic()
        }
      })
      return unsubscribe
    }
    return
  }, [])

  return {
    playAndPauseNowPlay,
    clickPrevButton,
    clickNextButton,
    audioRef,
    intervalIdRef
  }
}
