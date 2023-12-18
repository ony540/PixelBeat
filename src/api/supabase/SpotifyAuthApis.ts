import { getUserId } from '@/utils'
import { supabase } from '.'
const scope =
  'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming'

// import axios from 'axios'
// const CLITENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID

export const signInWithSpotify = async () => {
  try {
    const isLoggedInUser = getUserId()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: `${
          isLoggedInUser
            ? 'http://localhost:5173/home'
            : 'http://localhost:5173/signupgreeting'
        }`,
        scopes: scope
      }
    })

    if (error) {
      console.error('Spotify OAuth 로그인 중 에러:', error.message)
      return
    }

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// export const getRefreshToken = async () => {
//   const refreshToken = JSON.parse(
//     localStorage.getItem('sb-lcguqnvrxihpbvrcoouo-auth-token')
//   ).provider_refresh_token
//   const url = 'https://accounts.spotify.com/api/token'

//   try {
//     const response = await axios.post(
//       url,
//       new URLSearchParams({
//         grant_type: 'refresh_token',
//         refresh_token: refreshToken,
//         client_id: CLITENT_ID
//       }),
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }
//     )

//     console.log(response)
//     localStorage.setItem('access_token', response.data.access_token)
//     localStorage.setItem('refresh_token', response.data.refresh_token)
//   } catch (error) {
//     console.error('Error refreshing token:', error)
//   }
// }
