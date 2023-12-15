import { supabase } from '.'
const scope =
  'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming'

export const signInWithSpotify = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: 'http://localhost:5173/greeting',
        scopes: scope
      }
    })

    if (error) {
      console.error('Spotify OAuth 로그인 중 에러:', error.message)
      return
    }

    console.log(data)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
