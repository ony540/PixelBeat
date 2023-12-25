import { NowPlayList, Track } from '@/types'
import { supabase } from '.'

export const getProfile = async userId => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
    if (error) {
      throw new Error('프로필 정보를 가져오는 중 오류 발생: ' + error.message)
    }
    return data[0]
  } catch (error) {
    console.error('프로필 정보를 가져오는 중 오류 발생:', error)
    throw error
  }
}
export interface OwnTracklistProps {
  prevOwnTracklist: string[]
  billId: string | undefined
  userId: string | undefined
}
//내 빌지 업데이트
export const updateOwnTracklist = async ({
  prevOwnTracklist,
  billId,
  userId
}: OwnTracklistProps) => {
  const isAlreadyOwned = prevOwnTracklist.includes(billId!)
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        own_tracklist: isAlreadyOwned
          ? prevOwnTracklist.filter(tracklist => tracklist !== billId)
          : [...prevOwnTracklist, billId]
      })
      .eq('id', userId)
      .select()
    return data
  } catch (error) {
    console.error('updateOwnPlaylist 중 오류 발생:', error)
    throw error
  }
}

//좋아요 영수증
export interface LikeProps {
  prevLikedTracklist: string[]
  billId: string
  userId: string
}

export const updateLikedTracklist = async ({
  prevLikedTracklist,
  billId,
  userId
}: LikeProps) => {
  try {
    const isAlreadyLiked = prevLikedTracklist.includes(billId)
    const { data } = await supabase
      .from('profiles')
      .update({
        liked_tracklist: isAlreadyLiked
          ? prevLikedTracklist.filter(tracklist => tracklist !== billId)
          : [...prevLikedTracklist, billId]
      })
      .eq('id', userId)
      .select()

    return data![0]
  } catch (error) {
    console.error('updateLikedTracklist 중 오류 발생:', error)
    throw error
  }
}

//음악서랍 관련 저장
export interface SaveProps {
  prevSavedTracklist: string[]
  billId: string
  userId: string
}

export const addSavedTracklist = async ({
  prevSavedTracklist,
  billId,
  userId
}: SaveProps): Promise<any> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        saved_tracklist: [...prevSavedTracklist, billId]
      })
      .eq('id', userId)
      .select()

    return data![0]
  } catch (error) {
    console.error('addSavedTracklist 중 오류 발생:', error)
    throw error
  }
}

//----재생목록 관련-------

export interface NowPlayTracksProps {
  prevNowPlayTracklist: NowPlayList
  tracks: any[]
  userId: string
}

export interface NowPlayTrackProps {
  prevNowPlayTracklist: NowPlayList
  track: Track
  userId: string
}

//단순 재생목록에 음악 1개 추가
export const addNowPlayTracklistTable = async ({
  prevNowPlayTracklist,
  track,
  userId
}: NowPlayTrackProps): Promise<any> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        nowplay_tracklist: {
          ...prevNowPlayTracklist,
          tracks: [
            track,
            ...prevNowPlayTracklist.tracks.filter(item => track.id !== item.id)
          ]
        }
      })
      .eq('id', userId)
      .select()

    return data![0]
  } catch (error) {
    console.error('addNowPlayTracklist 중 오류 발생:', error)
    throw error
  }
}

//전체재생 (재생목록 추가 및 첫트랙 재생)
export const addNowPlayTracklistAndPlaySongTable = async ({
  prevNowPlayTracklist,
  tracks,
  userId
}: NowPlayTracksProps): Promise<any> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        nowplay_tracklist: {
          ...prevNowPlayTracklist,
          tracks: [
            ...tracks,
            ...prevNowPlayTracklist.tracks.filter(
              item => tracks.findIndex(t => t.id === item.id) === -1
            )
          ],
          currentTrack: tracks[0],
          playingPosition: 0
        }
      })
      .eq('id', userId)
      .select('*')

    console.log(data![0].nowplay_tracklist.tracks)

    return data![0]
  } catch (error) {
    console.error('addNowPlayTracklist 중 오류 발생:', error)
    throw error
  }
}

//재생목록에서 삭제
export const deleteTrackToNowPlayTable = async ({
  prevNowPlayTracklist,
  track,
  userId
}: NowPlayTrackProps): Promise<any> => {
  try {
    console.log(track)
    const { data } = await supabase
      .from('profiles')
      .update({
        nowplay_tracklist: {
          ...prevNowPlayTracklist,
          tracks: prevNowPlayTracklist.tracks.filter(
            item => item.id !== track!.id
          ),
          currentTrack:
            prevNowPlayTracklist.currentTrack &&
            prevNowPlayTracklist.currentTrack!.id === track.id
              ? null
              : prevNowPlayTracklist.currentTrack
        }
      })
      .eq('id', userId)
      .select()

    return data![0]
  } catch (error) {
    console.error('addNowPlayTracklist 중 오류 발생:', error)
    throw error
  }
}

//현재재생목록에 추가 및 지금 재생
export const addCurrentTrackTable = async ({
  prevNowPlayTracklist,
  track,
  userId
}: NowPlayTrackProps): Promise<any> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        nowplay_tracklist: {
          ...prevNowPlayTracklist,
          tracks: [
            track,
            ...prevNowPlayTracklist.tracks.filter(item => item.id !== track!.id)
          ],
          currentTrack: track,
          playingPosition: 0
        }
      })
      .eq('id', userId)
      .select()

    return data![0]
  } catch (error) {
    console.error('addCurrentTrackTable 중 오류 발생:', error)
    throw error
  }
}

//재생목록 변경 및 플레이포지션 변경
export const setCurrentTrackAndPositionTable = async ({
  prevNowPlayTracklist,
  track,
  playingPosition,
  userId
}): Promise<any> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        nowplay_tracklist: {
          ...prevNowPlayTracklist,
          currentTrack: track,
          playingPosition
        }
      })
      .eq('id', userId)
      .select()

    return data![0]
  } catch (error) {
    console.error('setCurrentTrackTable 중 오류 발생:', error)
    throw error
  }
}

//단순 현재재생목록 변경
export const setCurrentTrackTable = async ({
  prevNowPlayTracklist,
  track,
  userId
}: NowPlayTrackProps): Promise<any> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        nowplay_tracklist: {
          ...prevNowPlayTracklist,
          currentTrack: track
        }
      })
      .eq('id', userId)
      .select()

    return data![0]
  } catch (error) {
    console.error('setCurrentTrackTable 중 오류 발생:', error)
    throw error
  }
}

export interface PlayingPositionProps {
  prevNowPlayTracklist: NowPlayList

  playingPosition: number | string
  userId: string
}

//단순 재생 위치 지정
export const setPlayingPositionTable = async ({
  prevNowPlayTracklist,
  playingPosition,
  userId
}: PlayingPositionProps): Promise<any> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        nowplay_tracklist: {
          ...prevNowPlayTracklist,
          playingPosition
        }
      })
      .eq('id', userId)
      .select()

    return data![0] as any
  } catch (error) {
    console.error('setPlayingPositionTable 중 오류 발생:', error)
    throw error
  }
}
