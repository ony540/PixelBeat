import {
  getArtistTopTracks,
  getRecommendations,
  getTracksAudioFeatures,
  updateOwnTracklist,
  uploadBill
} from '@/api'
import {
  useRecommendResultStore,
  useRecommendStore,
  useUserStore
} from '@/zustand'
import { RecommendTrackItem, StandardButton } from '..'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/assets'
import { getRandomArray, getRandomColor } from '@/utils'
import { initialAnalysisObject } from '@/components'
import { useNavigate } from 'react-router-dom'
import { Track, TrackAnalysis } from '@/types'
import { useState } from 'react'

export const TrackSelector = () => {
  const navigate = useNavigate()
  const userInfo = useUserStore(state => state.userInfo)
  const isLoggedIn = !!userInfo.id
  const initialStore = useRecommendStore(state => state.initialStore)
  const artistIdStore = initialStore.artist
  const TrackIdStore = initialStore.track
  const selectTrack = useRecommendStore(state => state.selectTrack)
  const isSelectedTrack = (trackId: string) => TrackIdStore.includes(trackId)
  const setResultBillId = useRecommendResultStore(
    state => state.setResultBillId
  )
  const [isSpin, setIsSpin] = useState(false)
  const isButtonDisabled = initialStore.track.length === 0

  if (initialStore.artist.length <= 0) {
    navigate('/recommend/genre')
  }

  // 좋아하는 가수 바탕으로 아티스트의 트랙을 배열로 불러와서 flat하게 만드는 쿼리
  const { data: tracks, isLoading } = useQuery<Track[], Error>({
    queryKey: ['artistTracks', artistIdStore],
    queryFn: async () => {
      const promises = artistIdStore.map(async item => {
        return getArtistTopTracks(item)
      })
      const results = await Promise.all(promises)
      return results.flat()
    },
    enabled: !!artistIdStore
  })

  if (isLoading) return <Spinner text={'트랙 리스트 불러오는 중...'} />

  // 위에서 받아온 데이터를 이용해서 추천 데이터 가져오기
  const getRecommendedTracks = async (): Promise<Track[]> => {
    const recommendedTracks = await getRecommendations(
      getRandomArray(initialStore.artist),
      getRandomArray(initialStore.genre),
      initialStore.track[0]
    )

    return recommendedTracks
  }

  // 분석 결과 리턴 + 슈퍼 베이스에 업로드
  const uploadTrackListToSupabase = async (
    trackList: Track[]
  ): Promise<string> => {
    try {
      const tracksAudioFeatures = await getTracksAudioFeatures(
        trackList.map(track => track.id)
      )

      const reduceAnalysisList = tracksAudioFeatures?.reduce(
        (acc: TrackAnalysis, cur: TrackAnalysis) => {
          for (const key in acc) {
            acc[key] += cur[key]
          }
          return acc
        },
        { ...initialAnalysisObject }
      )

      if (!reduceAnalysisList) {
        throw new Error('분석 데이터 에러')
      }

      const averageAnalysis = Object.fromEntries(
        Object.entries(reduceAnalysisList).map(([key, value]) => [
          key,
          (value as number) / trackList.length
        ])
      )

      const billId = await uploadBill({
        tracklist: trackList,
        analysis: averageAnalysis as TrackAnalysis,
        owner: isLoggedIn
          ? { userId: userInfo.id, username: userInfo.username }
          : null,
        color: isLoggedIn ? getRandomColor() : '#57FF57',
        name: isLoggedIn
          ? `${userInfo.username}의 음악영수증 #${
              userInfo.own_tracklist.length + 1
            }`
          : null
      })

      return billId
    } catch (error) {
      console.error(error)
      throw new Error('업로드 중 에러 발생')
    }
  }

  // 빌 생성
  const createBillAndNavigate = async () => {
    try {
      setIsSpin(true)
      const billId = await uploadTrackListToSupabase(
        await getRecommendedTracks()
      )

      if (isLoggedIn) {
        // 사용자가 로그인한 경우 음악 트랙 리스트 업데이트
        await updateOwnTracklist({
          prevOwnTracklist: userInfo.own_tracklist,
          billId,
          userId: userInfo.id
        })

        navigate(`/bill/${billId}/${userInfo.id}`)
      } else {
        setResultBillId(billId!)
        navigate(`/bill/${billId}`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSpin(false)
    }
  }

  if (isSpin) {
    return <Spinner text={'음악 스타일 분석 중...'} />
  }

  return (
    <div className="relative">
      <h1 className="text-22 desktop:text-40 mt-42 grid place-items-center">
        좋아하는 노래
      </h1>
      <h2 className="text-14 desktop:text-20 grid place-items-center mb-20">
        (최대 5개)
      </h2>

      {tracks &&
        tracks.map((track: any, idx) => (
          <RecommendTrackItem
            key={track.id + idx}
            id={track.id}
            track={track}
            onClick={selectTrack}
            isSelected={isSelectedTrack(track.id)}
          />
        ))}
      <div className="sticky bottom-0 mx-auto my-0 text-22 px-10 py-10 bg-mainBlack">
        <StandardButton
          height={70}
          onClick={createBillAndNavigate}
          text={'완 료'}
          propsClass="w-full"
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  )
}
