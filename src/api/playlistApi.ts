import { baseInstance } from './axios'

export const getPlaylistFromSpotify = async (playlist_id: string) => {
  try {
    const response = await baseInstance(`playlists/${playlist_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
      }
    })
    const data = response.data
    // const trackList = data.tracks.items
    return data
  } catch (error) {
    console.error(error)
    return error
  }
}
