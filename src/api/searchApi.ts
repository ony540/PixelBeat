import { baseInstance } from './axios'

export const searchItem = async (query: string | string[]) => {
  try {
    const response = await baseInstance(
      `search?q=${query}&type=artist,album,playlist,track`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
        }
      }
    )
    const data = response.data
    // 앨범: 앨범
    // track: 노래
    // 플리: 플리 (유저 선곡이듯)
    // 아티스트: ㅇㅇ
    const { artists, tracks } = data
    return {
      artists,
      tracks
    }
  } catch (error) {
    console.error(error)
  }
}
