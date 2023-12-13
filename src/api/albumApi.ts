import { baseInstance } from './axios'

export const getAlbum = async (album_id: string) => {
  try {
    const response = await baseInstance(`albums/${album_id}/?market=KR`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
      }
    })
    const data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}
