import { baseInstance } from './axios'

export const getTracksAudioFeatures = async (tracksId: string) => {
  try {
    const response = await baseInstance(`audio-features?ids=${tracksId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('none-member-token')}`
      }
    })
    const { audio_features } = response.data
    return audio_features
  } catch (error) {
    console.error(error)
  }
}
