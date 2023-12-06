import { create } from "zustand";

interface RecommendStoreType {
  [key: string]: string[];
}

const initailStore: RecommendStoreType = {
  genre: [],
  artist: [],
  song: [],
};

export const recommendStore = create((set) => ({
  initailStore,
  selectGenre: (selectedGenre: any) =>
    set((state: any) => {
      const currentGenres = state.initailStore.genre;
      const isGenreSelected = currentGenres.includes(selectedGenre);
      const updatedGenres = isGenreSelected
        ? currentGenres.filter((prevItem) => prevItem !== selectedGenre)
        : [...currentGenres, selectedGenre].slice(0, 5);

      return {
        initailStore: {
          ...state.initailStore,
          genre: updatedGenres,
        },
      };
    }),
}));
