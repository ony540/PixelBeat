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

export const updateOwnTracklist = async (
  prevOwnTracklist: string[],
  billId: string,
  userId: string
) => {
  const isAlreadyOwned = prevOwnTracklist.includes(billId)
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
  tracks: object[]
  userId: string
}

export interface NowPlayTrackProps {
  prevNowPlayTracklist: NowPlayList
  track: Track | null
  userId: string
}

export interface DeleteNowPlayTrackProps {
  prevNowPlayTracklist: NowPlayList
  track: Track
  trackIndex: number
  userId: string
}

//단순 재생목록에 추가
export const addNowPlayTracklistTable = async ({
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
          tracks: [...prevNowPlayTracklist.tracks, ...tracks]
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

//재생목록에서 삭제
export const deleteTrackToNowPlayTable = async ({
  prevNowPlayTracklist,
  track,
  trackIndex,
  userId
}: DeleteNowPlayTrackProps): Promise<any> => {
  try {
    const { data } = await supabase
      .from('profiles')
      .update({
        nowplay_tracklist: {
          ...prevNowPlayTracklist,
          tracks: prevNowPlayTracklist.tracks.filter(
            (_, idx) => idx !== trackIndex
          ),
          //이거 로직을 모르겠음... 물어봐야지
          /**
           * [1,3,4,2,3,5] 라는 배열에서 내가 첫번째 3을 currentTrack으로
           * 들고있다가 첫번째 3을 선택해서 하거나.. 아니면 걍 하나만 담을 수 있게 하기
           */
          currentTrack:
            prevNowPlayTracklist.currentTrack === track
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
          tracks: [...prevNowPlayTracklist.tracks, track],
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
