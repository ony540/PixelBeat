import { getUserId } from '@/utils'
import { supabase } from '.'
const scope =
  'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming'

export const signInWithSpotify = async () => {
  try {
    const isLoggedInUser = getUserId()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: `${
          isLoggedInUser
            ? 'https://pixel-beat-alpha.vercel.app/home'
            : 'https://pixel-beat-alpha.vercel.app/signupgreeting'
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
