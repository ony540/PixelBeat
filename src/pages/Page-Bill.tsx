import { useParams } from 'react-router-dom'
import { Clock, Spinner } from '@/assets'
import {
  BillButtonListSection,
  BillGraph,
  BillItem,
  NavBar
} from '@/components'
import barcodeImg from '@/assets/imgs/barcode.png'
import graphBgImg from '@/assets/imgs/graphBackground.png'
import LogoBlack from '@/assets/imgs/LogoBlack.png'
import { formatDate } from '@/utils'
import { useNowPlayStore, useRecommendStore, useUserStore } from '@/zustand'
import { TrackList } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getBill } from '@/api'
import { useEffect } from 'react'

const Bill = () => {
  const { id: currentPath } = useParams<string>()
  const setNowPlayList = useNowPlayStore(state => state.setNowPlayList)
  const currentTrack = useNowPlayStore(state => state.currentTrack)
  const userInfo = useUserStore(state => state.userInfo)
  const resetRecommendStore = useRecommendStore(
    state => state.resetRecommendStore
  )

  const { data, isLoading } = useQuery<TrackList | Error, Error, TrackList>({
    queryKey: ['bill', currentPath],
    queryFn: () => getBill(currentPath!),
    enabled: !!currentPath
  })

  useEffect(() => {
    resetRecommendStore()
    if (data && !userInfo.id) {
      setNowPlayList(data.tracks.filter(track => track.preview_url))
    }
  }, [data])

  if (isLoading) return <Spinner />

  {
    return (
      <>
        <div className="bg-white w-354 text-mainBlack text-center mx-auto mt-42 mb-50 bill-background-side ">
          <h1 className="mx-auto my-20 w-200">
            <img
              src={LogoBlack}
              alt="logo image"
            />
          </h1>
          <div className="flex flex-col justify-center pl-14 mx-16 border-y-2 border-dashed border-mainBlack h-48  text-14 text-left leading-[1.2]">
            <p className="truncate w-200 ">
              {data!.tracks
                .slice(0, 2)
                .map(
                  (item, idx) => `${item.artists[0].name}${idx < 1 && ', '}`
                )}
              ...etc
            </p>
            <p>Made by Unknown User</p>
          </div>
          <div
            className="my-0 mx-auto w-270 mt-[-20px] mb-[-18px] bg-no-repeat bg-[55.6%_54%] bg-[length:136px]"
            style={{ backgroundImage: `url(${graphBgImg})` }}>
            <BillGraph
              analysisList={data?.analysis}
              color={data?.color}
            />
          </div>

          <div className="flex justify-between items-center mx-16 text-16 border-y-2 border-dashed border-mainBlack h-34 ">
            <span>
              <span className="ml-12 mr-26">#</span>
              Song
            </span>

            <i className="mr-12">
              <Clock />
            </i>
          </div>

          <section className="data-section my-6">
            <ul>
              {data!.tracks &&
                data!.tracks.map((track, idx) => (
                  <BillItem
                    key={track.id}
                    trackNumber={idx}
                    track={track}
                  />
                ))}
            </ul>
          </section>

          <section className="bill-bottom-section ">
            <div className=" mx-16 py-8 border-y-2 border-dashed border-mainBlack text-14">
              <time className="block w-full text-left">
                {formatDate(data?.created_at!)}
              </time>
              <div className="flex justify-between w-full">
                <p>www.pixelBeat.com</p>
                <p>provided by spotify</p>
              </div>
            </div>
          </section>
          <img
            src={barcodeImg}
            alt="바코드 이미지"
            className="mx-auto mt-24 mb-5"
          />
        </div>
        <BillButtonListSection propsClass={currentTrack ? 'mb-150' : ''} />
        {userInfo.id && <NavBar />}
      </>
    )
  }
}

export default Bill
