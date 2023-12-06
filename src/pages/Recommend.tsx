import {
  ArtistSelector,
  ErrorComponent,
  GenreSelector,
  SongSelector,
  StandardButton,
} from "@/components";
import { useNavigate, useParams } from "react-router-dom";

const isValidParamsId = (id: string) => {
  return {
    genre: true,
    artist: true,
    song: true,
  }[id];
};

export const Recommend = () => {
  const navigate = useNavigate();
  const { id: currentPath = "genre" } = useParams<string>();

  if (!isValidParamsId(currentPath)) {
    return <ErrorComponent />;
  }

  const moveToNext = (path: string) => {
    navigate(path);
  };

  const handleNextButtonClick = (currentPath: string) => {
    const nextPage = {
      genre: "/recommend/artist",
      artist: "/recommend/song",
      song: "/bill",
    }[currentPath];

    if (!nextPage) return;
    moveToNext(nextPage);
  };

  const buttonText = () => {
    return currentPath === "genre" || currentPath === "artist"
      ? "다음"
      : "완료";
  };

  return (
    <div>
      {currentPath === "genre" && <GenreSelector />}
      {currentPath === "artist" && <ArtistSelector />}
      {currentPath === "song" && <SongSelector />}

      <StandardButton
        text={buttonText()}
        onClick={() => handleNextButtonClick(currentPath)}
      />
    </div>
  );
};
