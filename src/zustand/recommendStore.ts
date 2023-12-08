import { create, useStore } from 'zustand'

const MAX_LIMIT = 6

export interface RecommendStoreType {
  genre: string[]
  artist: string[]
  track: string[]
}

const initialStore: RecommendStoreType = {
  genre: [],
  artist: [],
  track: []
}

const updateSelection = (
  currentSelection: string[],
  selectedItem: string,
  limit: number
) => {
  const isSelected = currentSelection.includes(selectedItem)
  const updatedSelection = isSelected
    ? currentSelection.filter(item => item !== selectedItem)
    : [...currentSelection, selectedItem].slice(0, limit)
  return updatedSelection
}

export const recommendStore = create(set => ({
  initialStore,
  selectGenre: (selectedGenre: string) =>
    set(state => ({
      initialStore: {
        ...state.initialStore,
        genre: updateSelection(
          state.initialStore.genre,
          selectedGenre,
          MAX_LIMIT
        )
      }
    })),
  selectArtist: (selectedArtistId: string) =>
    set(state => ({
      initialStore: {
        ...state.initialStore,
        artist: updateSelection(
          state.initialStore.artist,
          selectedArtistId,
          MAX_LIMIT
        )
      }
    })),
  selectTrack: (selectedTrackId: string) =>
    set(state => ({
      initialStore: {
        ...state.initialStore,
        track: updateSelection(
          state.initialStore.track,
          selectedTrackId,
          MAX_LIMIT
        )
      }
    }))
}))

export const useRecommendStore = () => useStore(recommendStore)
