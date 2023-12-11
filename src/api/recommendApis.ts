import { baseInstance } from './axios'

export const getArtistInfo = async (artist_id: any) => {
  try {
    const response = await baseInstance(`artists?ids=${artist_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
      }
    })
    const data = response.data
    const { artists } = data
    return artists
  } catch (error) {
    console.error(error)
  }
}

export const getArtistTracks = async (artist_id: any) => {
  try {
    const response = await baseInstance(
      `artists/${artist_id}/top-tracks?market=KR`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
        }
      }
    )
    const data = response.data
    const { tracks } = data
    return tracks
  } catch (error) {
    console.error(error)
  }
}

export const getRecommendations = async (artists, genre, tracks) => {
  try {
    const response = await baseInstance(
      `/recommendations?limit=8&market=KR&seed_artists=${artists}&seed_genres=${genre}&seed_tracks=${tracks}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
        }
      }
    )
    const data = response.data
    const { tracks: responseTrack } = data
    return responseTrack
  } catch (error) {
    console.error(error)
  }
}

export const getTracksAudioFeatures = async (tracksId: string) => {
  try {
    const response = await baseInstance(`audio-features?ids=${tracksId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
      }
    })
    const data = response.data
    const { audio_features } = data
    return audio_features
  } catch (error) {
    console.error(error)
  }
}

export const getPlaylistTop50 = async (playlist_id: string) => {
  try {
    const response = await baseInstance(`playlists/${playlist_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
      }
    })
    const data = response.data
    const trackList = data.tracks.items
    return { trackList }
  } catch (error) {
    console.error(error)
  }
}
