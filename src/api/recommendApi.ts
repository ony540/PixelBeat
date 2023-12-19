import { baseInstance } from './axios'

export const getRecommendations = async (artists, genre, tracks) => {
  try {
    const response = await baseInstance(
      `/recommendations?limit=8&market=KR&seed_artists=${artists}&seed_genres=${genre}&seed_tracks=${tracks}`
    )
    const data = response.data
    const { tracks: responseTrack } = data
    return responseTrack
  } catch (error) {
    console.error(error)
  }
}
