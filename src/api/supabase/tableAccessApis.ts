// genre_artist_id_table 접근 관련 api
import { TrackList } from '@/types'
import { supabase } from '.'

export const getArtistId = async (genres: string[]) => {
  try {
    const { data } = await supabase
      .from('genre_artist_id_table')
      .select('*')
      .in('genre', genres)
    return data
  } catch (error) {
    console.error('Error in getArtistId:', error)
    return error
  }
}

export const uploadBill = async ({ tracklist, analysis }) => {
  try {
    const { data } = await supabase
      .from('tracks_table')
      .insert([
        {
          tracks: tracklist,
          analysis: analysis
        }
      ])
      .select()
    return data![0].id
  } catch (error) {
    console.error('Error in uploadBill:', error)
    return error
  }
}

export const getBill = async (billId: string): Promise<TrackList | Error> => {
  try {
    const { data } = await supabase
      .from('tracks_table')
      .select('*')
      .eq('id', billId)
    return data![0] as TrackList
  } catch (error) {
    console.error('Error in getBill:', error)
    return error as Error
  }
}

/** 이하 -- Storage/user_profile_img / profiles (table) 접근 API -- */

/** Supabase - Storage에 이미지 업로드하는 함수 */
export const uploadImageToStorage = async (imageFile: File, userId: string) => {
  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('user_profile_img')
      .upload(`${userId}`, imageFile, {
        cacheControl: '3600',
        contentType: 'image/*'
      })

    console.log(uploadError)

    // 409는 이미 존재할 경우
    if (uploadError?.statusCode === '409') {
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

    return uploadData?.path
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error)
    throw error
  }
}

/**
 * 위 로직 논의시에 아래꺼 설명드릴 필요 있음 getPublicUrl는 항상 유효값을 반환해서 판단이 불가함
 * */
// export const uploadImageToStorage = async (imageFile, userId) => {
//   try {
//     const { data: bucketData, error } = await supabase.storage
//       .from('user_profile_img')
//       .getPublicUrl(userId)

//     if (!bucketData) {
//       const { data, error } = await supabase.storage
//         .from('user_profile_img')
//         .upload(`${userId}`, imageFile, {
//           cacheControl: '3600',
//           contentType: 'image/*'
//         })

//       // if (error) {
//       //   console.error('이미지 업로드 중 오류 발생:', error)
//       // }

//       console.log('업로드', data)
//       return data?.path
//     }

//     if (bucketData) {
//       const { data, error } = await supabase.storage
//         .from('user_profile_img')
//         .update(`${userId}`, imageFile, {
//           cacheControl: '3600',
//           contentType: 'image/*'
//         })

//       console.log('업데이트', data)

//       // if (error) {
//       //   console.error('이미지 업데이트 중 오류 발생:', error)
//       // }

//       return data?.path
//     }
//   } catch (error) {
//     console.error('이미지 처리 중 오류 발생:', error)
//     throw error
//   }
// }

/** supabase - uploadImageToStorage로 반환된 버킷 주소를 가져와서
'환경변수(DB고유주소) + 버킷 주소'해서 profile정보에 스토리지 이미지 path 저장 로직 */
export const updateProfile = async (
  username: string,
  introduce: string,
  avatar_url: string,
  userId: string
) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        username,
        introduce,
        avatar_url
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

    console.log(data)
    return data
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error)
    throw error
  }
}
