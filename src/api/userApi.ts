import { baseInstance } from './axios'

//프리미엄인지 아닌지 확인
export const getSpotifyUserInfo = async () => {
  try {
    const response = await baseInstance.get('me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
      }
    })
    const data = await response.data
    console.log(data)
    return data
  } catch (error: any) {
    console.error(error)
  }
}
