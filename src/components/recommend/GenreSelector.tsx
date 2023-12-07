import { FAVORITE_GENRE_TEXT } from "@/constants/recommned";
import { recommendStore } from "@/zustand";
import { GenreItem } from "@/components/recommend";

export const GenreSelector = () => {
  const genreSelect = recommendStore((state: any) => state.selectGenre);
  const genreStore: string[] = (recommendStore() as any).initailStore.genre;

  return (
    <>
      <h1 className="text-40 grid place-items-center">좋아하는 음악 장르</h1>
      <h2 className="text-20 grid place-items-center">(최대 5개)</h2>
      <div className="genre-selector-container text-xl ">
        {FAVORITE_GENRE_TEXT.map((item) => (
          <GenreItem
            key={item}
            item={item}
            onClick={genreSelect}
            isSelected={genreStore.includes(item)}
          />
        ))}
      </div>
    </>
  );
};