import { setCurrentTrackAndPositionTable } from '@/api'
import { Track } from '@/types'
import { useNowPlayStore } from '@/zustand/nowPlayStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'

import { useLocation } from 'react-router-dom'
import { useUserStore } from '@/zustand'

export const usePlayAndPausePreview = () => {
  const isPlaying = useNowPlayStore(state => state.isPlaying)
  const tracks = useNowPlayStore(state => state.tracks)
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const playingPosition = useNowPlayStore(state => state.playingPosition)
  const setIsPlaying = useNowPlayStore(state => state.setIsPlaying)
  const setPlayingPosition = useNowPlayStore(state => state.setPlayingPosition)
  const setCurrentTrack = useNowPlayStore(state => state.setCurrentTrack)

  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  const userInfo = useUserStore(state => state.userInfo)
  const { pathname } = useLocation()
  const queryClient = useQueryClient()

  const setCurrentTrackAndPositionTableMutation = useMutation({
    mutationFn: setCurrentTrackAndPositionTable,
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
    audioRef.current!.play()

    intervalIdRef.current = setInterval(() => {
      const { currentTrack, tracks } = useNowPlayStore.getState()

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
        const isLastSong =
          tracks.findIndex(t => t.id === currentTrack!.id) === tracks.length - 1

        if (isLastSong) {
          pauseMusic()
          setCurrentTrack(null)
          setPlayingPosition(0)
        } else {
          setCurrentTrack(
            tracks[tracks.findIndex(t => t.id === currentTrack!.id) + 1]
          )
        }
      }
    }, 100)
  }

  //음악정지
  const pauseMusic = () => {
    const { playingPosition, currentTrack } = useNowPlayStore.getState()
    setIsPlaying(false)
    audioRef.current!.pause()
    clearInterval(intervalIdRef.current!)
    if (userInfo.id) {
      setCurrentTrackAndPositionTableMutation.mutateAsync({
        prevNowPlayTracklist: userInfo.nowplay_tracklist,
        track: currentTrack,
        playingPosition,
        userId: userInfo.id
      })
    }
  }

  //음악변경 후 재생
  const changeMusic = (changedTrack?: Track) => {
    const { currentTrack } = useNowPlayStore.getState()
    if (changedTrack) setCurrentTrack(changedTrack)
    const nowChangedTrack = changedTrack ? changedTrack : currentTrack
    audioRef.current!.src = nowChangedTrack?.preview_url!
    setPlayingPosition(0)
    audioRef.current!.load()

    audioRef.current!.addEventListener('canplay', function () {
      playMusic()
    })
  }

  // 재생 및 멈춤, 토글 버튼
  const playAndPauseNowPlay = useCallback(() => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  }, [isPlaying, tracks, setIsPlaying, setPlayingPosition, setCurrentTrack])

  //이전곡 재생
  const clickPrevButton = () => {
    const { currentTrack, tracks } = useNowPlayStore.getState()
    const isFirstSong = tracks.indexOf(currentTrack!) === 0

    setPlayingPosition(0)
    setCurrentTrack(
      isFirstSong
        ? tracks[tracks.length - 1]
        : tracks[tracks.findIndex(t => t.id === currentTrack!.id) - 1]
    )
  }

  //다음곡 재생
  const clickNextButton = () => {
    const { currentTrack, tracks } = useNowPlayStore.getState()
    const isLastSong =
      tracks.findIndex(t => t.id === currentTrack!.id) === tracks.length - 1
    setPlayingPosition(0)
    setCurrentTrack(
      isLastSong
        ? tracks[0]
        : tracks[tracks.findIndex(t => t.id === currentTrack!.id) + 1]
    )
  }

  //음악 변경을 감지, 재생목록에서 마우스 이벤트로 커런트 트랙이 바뀌는 경우
  useEffect(() => {
    if (audioRef.current) {
      const unsubscribe = useNowPlayStore.subscribe(state => {
        const srcChanged =
          state.currentTrack &&
          state.currentTrack?.preview_url !== audioRef.current?.src!

        if (srcChanged) {
          changeMusic()
          if (userInfo.id) {
            const { userInfo } = useUserStore.getState()
            setCurrentTrackAndPositionTableMutation.mutateAsync({
              prevNowPlayTracklist: userInfo.nowplay_tracklist,
              track: state.currentTrack,
              playingPosition: 0,
              userId: userInfo.id
            })
          }
        }
      })
      return unsubscribe
    }
    return
  }, [])

  //라우터바뀔 때 db update
  useEffect(() => {
    if (pathname && userInfo.id) {
      const { userInfo } = useUserStore.getState()
      const { currentTrack, playingPosition } = useNowPlayStore.getState()

      setCurrentTrackAndPositionTableMutation.mutateAsync({
        prevNowPlayTracklist: userInfo.nowplay_tracklist,
        track: currentTrack,
        playingPosition,
        userId: userInfo.id
      })
    }
  }, [pathname])

  return {
    playAndPauseNowPlay,
    clickPrevButton,
    clickNextButton,
    audioRef,
    intervalIdRef
  }
}
