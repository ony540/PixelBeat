import { getBill, getPlaylistFromSpotify } from '@/api'
import { ArrowDown, Spinner } from '@/assets'
import { useUserStore } from '@/zustand'
import { useQueries } from '@tanstack/react-query'
import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorComponent, MusicShelfItem } from '..'

export const MusicShelf = () => {
  const navigate = useNavigate()
  const userInfo = useUserStore(state => state.userInfo)
  const [tracklistIdInShelf] = useState([
    ...userInfo.saved_tracklist,
    ...userInfo.own_tracklist
  ])

  const results = useQueries({
    queries: tracklistIdInShelf.map(tracklistId => {
      //픽셀비트 내 영수증
      if (tracklistId.length === 36) {
        return {
          queryKey: ['bill from PixelBeat', tracklistId],
          queryFn: () => getBill(tracklistId)
        }
        //스포티파이 내 영수증
      } else {
        return {
          queryKey: ['bill from spotify', tracklistId],
          queryFn: () => getPlaylistFromSpotify(tracklistId)
        }
      }
    })
  })

  const goToListMain = () => {
    navigate('/mymusic/playnow')
  }

  const isLoading = results.some(result => result.isLoading)
  const isError = results.some(result => result.isError)

  if (isLoading) return <Spinner />
  if (isError) return <ErrorComponent />

  return (
    <div className="flex flex-col">
      <section className="mt-30 text-20 flex justify-between">
        <div>
          <button
            className="musicList w-113"
            onClick={goToListMain}>
            재생목록
          </button>
          <button className="musicListGreen text-mainBlack w-113">
            음악서랍
          </button>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-24 h-24">
          <ArrowDown />
        </button>
      </section>
      <ul className="mx-auto w-full border min-h-[80vh] mb-80">
        {results.map(traklist => (
          <MusicShelfItem
            data={traklist.data}
            key={traklist.data.id}
          />
        ))}
      </ul>
    </div>
  )
}
