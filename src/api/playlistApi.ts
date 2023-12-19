import { baseInstance } from './axios'

export const getPlaylistFromSpotify = async (playlist_id: string) => {
  try {
    const response = await baseInstance(`playlists/${playlist_id}`)
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
    return error
  }
}
