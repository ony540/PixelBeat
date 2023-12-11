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
    const { artists, tracks } = data
    return {
      artists,
      tracks
    }
  } catch (error) {
    console.error(error)
  }
}
