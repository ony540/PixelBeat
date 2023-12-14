import { baseInstance } from './axios'

export const getArtistInfo = async (artist_id: any) => {
  try {
    const response = await baseInstance(`artists?ids=${artist_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
      }
    })
    const data = response.data
    const { artists } = data
    return artists
  } catch (error) {
    console.error(error)
  }
}

export const getArtistTopTracks = async (artist_id: any) => {
  try {
    const response = await baseInstance(
      `artists/${artist_id}/top-tracks?market=KR`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
        }
      }
    )
    const data = response.data
    const { tracks } = data
    return tracks
  } catch (error) {
    console.error(error)
  }
}

export const getArtistAlbums = async (artist_id: string) => {
  try {
    const response = await baseInstance(
      `artists/${artist_id}/albums?market=KR`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
        }
      }
    )
    const data = response.data
    const albumList = data.items
    return { albumList }
  } catch (error) {
    console.error(error)
    return error
  }
}

export const getRelatedArtists = async (artist_id: string) => {
  try {
    const response = await baseInstance(
      `artists/${artist_id}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('non-member-token')}`
        }
      }
    )
    const data = response.data
    const artists = data.artists
    return { artists }
  } catch (error) {
    console.error(error)
    return error
  }
}
