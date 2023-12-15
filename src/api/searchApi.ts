import { SearchedData } from '@/components/search'
import { baseInstance } from './axios'

export const searchItem = async (
  query: string | string[]
): Promise<SearchedData | Error> => {
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
    const { artists, tracks, playlists, albums } = data
    return {
      artists,
      tracks,
      playlists,
      albums
    } as SearchedData
  } catch (error) {
    console.error(error)
    return error as Error
  }
}
