import { NowPlayList, tracklist_id } from "./tracklist"

export type user_id = string
export type user_name = string

export interface User {
  id: user_id
  name: user_name
  introduce: string
  nowplay_tracklist: NowPlayList
  own_tracklist: tracklist_id[]
  saved_tracklist: tracklist_id[]
  liked_tracklist: tracklist_id[]
}

export interface UserMin {
  id: user_id
  name: user_name
}