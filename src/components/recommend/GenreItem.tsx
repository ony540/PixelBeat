import { PixelBorder } from "@/assets";
import { FAVORITE_GENRE_ICON_MAPPING } from "@/constants/recommned";

interface GenreItemProps {
  item: string;
  onClick: (item: string) => void;
  isSelected: boolean;
}

export const GenreItem = ({ item, onClick, isSelected }: GenreItemProps) => (
  <div
    onClick={() => onClick(item)}
    className={`relative cursor-pointer ${isSelected ? "selected-genre" : ""}`}
  >
    <PixelBorder />
    <div className="absolute left-[50%] translate-x-[-50%] icon-absolute-top">
      {FAVORITE_GENRE_ICON_MAPPING[item]}
    </div>
    <div className="absolute left-[50%] translate-x-[-50%] text-absolute-bottom whitespace-nowrap">
      {item}
    </div>
  </div>
);
