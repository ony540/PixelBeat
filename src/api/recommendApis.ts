import { baseInstance } from "./axios";

// export const getArtistList = async (genreList: any) => {
//   try {
//     const response = await baseInstance(
//       `search?q=${genreList}&type=artist&limit=50&offset=${Math.floor(
//         Math.random() * 10
//       )}&market=KR`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("non-member-token")}`,
//         },
//       }
//     );
//     const data = response.data;
//     const artistList = data.artists;
//     artistList.items.map((item) => {
//       item.popularity >= 30 ? console.log("유명:", item) : null;
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getArtistInfo = async (artist_id: any) => {
  try {
    const response = await baseInstance(`artists?ids=${artist_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("non-member-token")}`,
      },
    });
    const data = response.data;
    const { artists } = data;
    return artists;
  } catch (error) {
    console.error(error);
  }
};

export const getArtistTracks = async (artist_id: any) => {
  try {
    const response = await baseInstance(
      `artists/${artist_id}/top-tracks?market=KR`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("non-member-token")}`,
        },
      }
    );
    const data = response.data;
    const { tracks } = data;
    return tracks;
    
  } catch (error) {
    console.error(error);
  }
};
