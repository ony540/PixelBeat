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
