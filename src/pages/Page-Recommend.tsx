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

const Recommend = () => {
  const navigate = useNavigate()
  const { id: currentPath = 'genre' } = useParams<string>()
  const initialStore = useRecommendStore(state => state.initialStore)

  if (!isValidParamsId(currentPath)) {
    return <ErrorComponent />
  }

  const handleNextButtonClick = async (currentPath: string) => {
    const nextPage = {
      genre: '/recommend/artist',
      artist: '/recommend/track'
    }[currentPath]

    if (!nextPage) return
    navigate(nextPage)
  }

  const renderButtonText = () => '다 음'

  const isButtonDisabled =
    (currentPath === 'genre' && initialStore.genre.length === 0) ||
    (currentPath === 'artist' && initialStore.artist.length === 0)

  return (
    <div className="desktop:px-60">
      {currentPath === 'genre' && <GenreSelector />}
      {currentPath === 'artist' && <ArtistSelector />}
      {currentPath === 'track' && <TrackSelector />}
      {currentPath === 'genre' || currentPath === 'artist' ? (
        <div
          className={`sticky bottom-0 mx-auto my-0 text-22 px-10 py-10 bg-black`}>
          <StandardButton
            height={70}
            text={renderButtonText()}
            onClick={() => handleNextButtonClick(currentPath)}
            propsClass="w-full"
            disabled={isButtonDisabled}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Recommend
