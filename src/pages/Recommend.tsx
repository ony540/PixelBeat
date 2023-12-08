import {
  ArtistSelector,
  ErrorComponent,
  GenreSelector,
  StandardButton,
  TrackSelector
} from '@/components'
import { useRecommendStore } from '@/zustand'
import { useNavigate, useParams } from 'react-router-dom'

type ValidParams = 'genre' | 'artist' | 'track'
const isValidParamsId = (id: string): boolean =>
  ['genre', 'artist', 'track'].includes(id as ValidParams)

export const Recommend = () => {
  const navigate = useNavigate()
  const { id: currentPath = 'genre' } = useParams<string>()
  const { initialStore }: any = useRecommendStore()

  if (!isValidParamsId(currentPath)) {
    return <ErrorComponent />
  }

  const moveToNext = (path: string) => {
    navigate(path)
  }

  const handleNextButtonClick = (currentPath: string) => {
    const nextPage = {
      genre: '/recommend/artist',
      artist: '/recommend/track',
      track: '/bill'
    }[currentPath]

    if (!nextPage) return
    moveToNext(nextPage)
  }

  const renderButtonText = () =>
    currentPath === 'genre' || currentPath === 'artist' ? '다음' : '완료'

  const isButtonDisabled =
    (currentPath === 'genre' && initialStore.genre.length === 0) ||
    (currentPath === 'artist' && initialStore.artist.length === 0) ||
    (currentPath === 'track' && initialStore.track.length === 0)

  return (
    <div>
      {currentPath === 'genre' && <GenreSelector />}
      {currentPath === 'artist' && <ArtistSelector />}
      {currentPath === 'track' && <TrackSelector />}
      <div className="sticky bottom-0 mx-auto my-0 text-30 standard-button-container ">
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
