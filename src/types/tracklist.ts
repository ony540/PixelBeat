import { UserMin, user_id } from './user'

export type tracklist_id = string

//추천영수증
export interface TrackList {
  id: tracklist_id
  tracks: Track[]
  created_at: Date
  owner?: UserMin
  likes?: number
  analysis?: TrackAnalysis
}

//현재재생목록
export interface NowPlayList {
  owner?: user_id | undefined
  tracks: Track[]
  currentTrack: Track | null
  isPlaying: boolean
  playingPosition: number
}

export interface Track {
  album: Album
  artists: Artist[]
  duration_ms: number
  id: string
  is_playable: boolean
  name: string
  preview_url: string
}

export interface Album {
  id: string
  images: Image[]
  is_playable: boolean
  name: string
  release_date: string
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface Artist {
  id: string
  name: string
}

export interface TrackAnalysis {
  acousticness: number
  energy: number
  valence: number
  danceability: number
  tempo: number
}