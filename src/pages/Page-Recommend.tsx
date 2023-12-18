import {
  ArtistSelector,
  ErrorComponent,
  GenreSelector,
  StandardButton,
  TrackSelector,
  initialAnalysisObject
} from '@/components'
import { useRecommendStore, useUserStore } from '@/zustand'
import { useNavigate, useParams } from 'react-router-dom'
import { TrackAnalysis } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getRandomArray, getRandomColor } from '@/utils'
import {
  updateOwnTracklist,
  getRecommendations,
  getTracksAudioFeatures
} from '@/api'
import { uploadBill } from '@/api'

type ValidParams = 'genre' | 'artist' | 'track'

const isValidParamsId = (id: string): boolean =>
  ['genre', 'artist', 'track'].includes(id as ValidParams)

const Recommend = () => {
  const navigate = useNavigate()
  const { id: currentPath = 'genre' } = useParams<string>()
  const initialStore = useRecommendStore(state => state.initialStore)
  const { artist, genre, track } = initialStore
  const setResultBillId = useRecommendStore(state => state.setResultBillId)
  const resetRecommendStore = useRecommendStore(
    state => state.resetRecommendStore
  )
  const userInfo = useUserStore(state => state.userInfo)

  if (!isValidParamsId(currentPath)) {
    return <ErrorComponent />
  }

  const handleNextButtonClick = async (currentPath: string) => {
    const nextPage = {
      genre: '/recommend/artist',
      artist: '/recommend/track'
    }[currentPath]

    if (currentPath === 'track') {
      await fetchRecommendations()
    }

    if (!nextPage) return
    navigate(nextPage)
  }

  const {
    data: recommendedTracks,
    isLoading: isRecommendedTracksLoading,
    refetch: fetchRecommendations
  } = useQuery({
    queryKey: ['recommendedTracks', initialStore],
    queryFn: () =>
      getRecommendations(
        getRandomArray(artist),
        getRandomArray(genre),
        track[0]
      ),
    enabled: false
  })

  const { isLoading: isUploadingTrackList } = useQuery({
    queryKey: ['uploadTrackListToSupabase'],
    queryFn: async () => {
      const tracksAudioFeatures = await getTracksAudioFeatures(
        recommendedTracks.map(track => track.id)
      )
      const reduceAnalysisList: TrackAnalysis = tracksAudioFeatures?.reduce(
        (acc: TrackAnalysis, cur: TrackAnalysis) => {
          for (const key in acc) {
            acc[key] += cur[key]
          }
          return acc
        },
        { ...initialAnalysisObject }
      )
      if (reduceAnalysisList) {
        const averageAnalysis: TrackAnalysis = Object.fromEntries(
          Object.entries(reduceAnalysisList).map(([key, value]) => [
            key,
            value / recommendedTracks.length
          ])
        ) as unknown as TrackAnalysis

        //슈퍼베이스에 업로드
        const isLoggedIn = !!userInfo.id
        const uploadTrackListToSupabaseId = await uploadBill({
          tracklist: recommendedTracks,
          analysis: averageAnalysis,
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
        resetRecommendStore()

        if (isLoggedIn) {
          await updateOwnTracklist(
            userInfo.own_tracklist,
            uploadTrackListToSupabaseId,
            userInfo.id
          )
          navigate(`/bill/${uploadTrackListToSupabaseId}/${userInfo.id}`)
          return uploadTrackListToSupabaseId
        }

        setResultBillId(uploadTrackListToSupabaseId)
        navigate(`/bill/${uploadTrackListToSupabaseId}`)
        return uploadTrackListToSupabaseId
      }
    },
    enabled: !!recommendedTracks
  })

  const renderButtonText = () =>
    currentPath === 'genre' || currentPath === 'artist' ? '다 음' : '완 료'

  const isButtonDisabled =
    (currentPath === 'genre' && initialStore.genre.length === 0) ||
    (currentPath === 'artist' && initialStore.artist.length === 0) ||
    (currentPath === 'track' && initialStore.track.length === 0)

  if (isRecommendedTracksLoading || isUploadingTrackList) return <h1>로딩중</h1>

  return (
    <div className="desktop:px-60">
      {currentPath === 'genre' && <GenreSelector />}
      {currentPath === 'artist' && <ArtistSelector />}
      {currentPath === 'track' && <TrackSelector />}
      <div className="sticky bottom-0 mx-auto my-0 text-22 px-10 py-10 bg-black">
        <StandardButton
          height={70}
          text={renderButtonText()}
          onClick={() => handleNextButtonClick(currentPath)}
          propsClass="w-full"
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  )
}

export default Recommend
