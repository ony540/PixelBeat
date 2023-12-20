import { supabase } from '.'

export const signUpSupabaseWithEmail: any = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // 이메일 확인시 이동될 경로 설정
        emailRedirectTo: 'http://localhost:5173/profile/edit'
      }
    })

    if (error) {
      console.error('Sign-up error:', error.message)

      return error
    }

    // 성공 시 사용자 정보(data)를 반환
    return data
  } catch (error: any) {
    console.error('Unexpected error during sign-up:', error.message)
    throw new error(error)
  }
}

export const signinUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Sign-up error:', error.message)
    }

    return data
  } catch (error: any) {
    console.error('Unexpected error during sign-up:', error.message)
    return error
  }
}

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Sign-up error:', error.message)
    }

    return error
  } catch (error: any) {
    console.error('Unexpected error during sign-up:', error.message)
    return error
  }
}