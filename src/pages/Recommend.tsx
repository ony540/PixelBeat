import {
  ArtistSelector,
  ErrorComponent,
  GenreSelector,
  StandardButton,
  TrackSelector,
  initialAnalysisObject
} from '@/components'
import { useRecommendStore } from '@/zustand'
import { useNavigate, useParams } from 'react-router-dom'
import { TrackAnalysis } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getRandomArray } from '@/utils'
import { getRecommendations, getTracksAudioFeatures } from '@/api/recommendApis'
import { uploadBill } from '@/api'

type ValidParams = 'genre' | 'artist' | 'track'
const isValidParamsId = (id: string): boolean =>
  ['genre', 'artist', 'track'].includes(id as ValidParams)

export const Recommend = () => {
  const navigate = useNavigate()
  const { id: currentPath = 'genre' } = useParams<string>()
  const initialStore = useRecommendStore(state => state.initialStore)
  const { artist, genre, track } = initialStore

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
        const uploadTrackListToSupabaseId = await uploadBill({
          tracklist: recommendedTracks,
          analysis: averageAnalysis
        })

        navigate(`/bill/${uploadTrackListToSupabaseId}`)
        return uploadTrackListToSupabaseId
      }
    },
    enabled: !!recommendedTracks
  })

  const renderButtonText = () =>
    currentPath === 'genre' || currentPath === 'artist' ? '다음' : '완료'

  const isButtonDisabled =
    (currentPath === 'genre' && initialStore.genre.length === 0) ||
    (currentPath === 'artist' && initialStore.artist.length === 0) ||
    (currentPath === 'track' && initialStore.track.length === 0)

  if (isRecommendedTracksLoading || isUploadingTrackList) return <h1>로딩중</h1>

  return (
    <div>
      {currentPath === 'genre' && <GenreSelector />}
      {currentPath === 'artist' && <ArtistSelector />}
      {currentPath === 'track' && <TrackSelector />}
      <div className="sticky bottom-0 mx-auto my-0 text-30 px-10 bg-black">
        <StandardButton
          height={70}
          text={renderButtonText()}
          onClick={() => handleNextButtonClick(currentPath)}
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  )
}
