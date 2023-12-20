import { supabase } from '.'

/** Storage/user_profile_img / profiles (table) 접근 API -- */

/** Supabase - Storage에 이미지 업로드하는 함수 */
export const uploadImageToStorage = async (imageFile: File, userId: string) => {
  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('user_profile_img')
      .upload(`${userId}`, imageFile, {
        cacheControl: '3600',
        contentType: 'image/*'
      })

    // 409는 이미 존재할 경우
    if (uploadError && 'statusCode' in uploadError) {
      if (uploadError?.statusCode === ('409' as any)) {
        const { data: updateData, error: updateError } = await supabase.storage
          .from('user_profile_img')
          .update(`${userId}`, imageFile, {
            cacheControl: '3600',
            contentType: 'image/*'
          })

        if (updateError) {
          console.error(updateError)
        }

        return updateData?.path
      }
    }
    return uploadData?.path
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error)
    throw error
  }
}

/**  위에서 data.path받은 다음에 환경변수(버킷 주소) 가져와서 
'환경변수 + data.path'해서 profile정보에 스토리지 이미지 주소 저장하고 */

export const updateProfile = async (
  username: string,
  introduce: string,
  imageUrl: string,
  userId: string
) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        username,
        introduce,
        avatar_url: imageUrl
      })
      .eq('id', userId)
      .select()

    if (error) {
      throw new Error('프로필을 업데이트하는 중 오류 발생: ' + error.message)
    }

    return data
  } catch (error) {
    console.error('프로필 업데이트 중 오류 발생:', error)
    throw error
  }
}

// 프로필에 저장된 유저 이미지를 가져오는 API를 사용하거나 혹은 아래의 API를 사용해서 직접 스토리지에 접근해서 뿌려주면 될듯
export const fetchImageDirectFromStorage = async userId => {
  try {
    const { data } = supabase.storage
      .from('user_profile_img')
      .getPublicUrl(`${userId}`)

    return data
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error)
    throw error
  }
}
