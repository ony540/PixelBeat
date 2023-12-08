import { getArtistTracks } from "@/api/recommendApis";
import { recommendStore } from "@/zustand";
import { useEffect, useState } from "react";
import { StandardPixelBorder, StandardVertex } from "..";

export const TrackSelector = () => {
  const { initialStore }: any = recommendStore();
  const artistIdStore: string[] = initialStore.artist;
  const TrackIdStore: string[] = initialStore.track;
  const [songList, setSongList] = useState([]);
  const selectTrack = recommendStore((state: any) => state.selectTrack);
  const isSelectedTrack = (trackId: string) => TrackIdStore.includes(trackId);

  useEffect(() => {
    const fetchData = async () => {
      const promises = artistIdStore.map(async (item) => {
        return getArtistTracks(item);
      });
      const results = await Promise.all(promises);
      const combinedSongList = results.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      setSongList(combinedSongList);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-40 grid place-items-center">좋아하는 노래</h1>
      <h2 className="text-20 grid place-items-center mb-20">(최대 5개)</h2>
      {songList &&
        songList.map((items: any, idx) => (
          <div
            key={items.id + idx}
            className="mb-20 relative flex gap-20"
            onClick={() => selectTrack(items.id)}
          >
            <img
              loading="lazy"
              src={items.album.images[0].url}
              alt={`${items.name} 이미지`}
              className="w-48 h-48 absolute left-[12%] top-[20%]"
            />
            {/* SVG */}
            <StandardVertex propsClass={`h-48 absolute left-[12%] top-[20%]`} />
            <StandardPixelBorder
              propsClass={`w-[86%] mx-auto my-0 cursor-pointer ${
                isSelectedTrack(items.id) ? "selected-item" : ""
              }`}
            />

            {/* 노래 제목 */}
            <div
              className={`absolute left-[28%] top-[12%] overflow-hidden w-[60%] ${
                isSelectedTrack(items.id) ? "selected-item" : ""
              }`}
            >
              <div
                className={`${
                  items.name.length >= 40 ? "text-flow-on-hover" : ""
                }`}
              >
                <p>{items.name}</p>
              </div>
            </div>

            {/* 아티스트 이름 */}
            <div
              className={`absolute left-[28%] top-[50%] ${
                isSelectedTrack(items.id) ? "selected-item" : ""
              }`}
            >
              {items.artists[0].name}
            </div>
          </div>
        ))}
    </div>
  );
};
