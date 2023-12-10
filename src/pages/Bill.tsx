import { useNavigate } from 'react-router-dom'
import { Clock } from '@/assets'
import { BillGraph, BillItem, StandardButton } from '@/components'
import barcodeImg from '@/assets/imgs/barcode.png'
import graphBgImg from '@/assets/imgs/graphBackground.png'
import { getRandomArray, shareData } from '@/utils'
import { useRecommendStore } from '@/zustand'
import { useEffect, useState } from 'react'
import { getRecommendations, getTracksAudioFeatures } from '@/api/recommendApis'

interface TrackAnalysis {
  acousticness: number
  energy: number
  valence: number
  danceability: number
  tempo: number
}

const initialAnalysisObject: TrackAnalysis = {
  acousticness: 0,
  energy: 0,
  valence: 0,
  danceability: 0,
  tempo: 0
}

export const Bill = () => {
  const navigate = useNavigate()
  const { initialStore }: any = useRecommendStore()
  const { artist, genre, track } = initialStore
  const [responseTracks, setResponseTracks] = useState<any>([])
  const [analysisList, setAnalysis] = useState<any>([])
  const numberOfObject = analysisList.length

  const reduceAnalysisList: TrackAnalysis = analysisList.reduce(
    (acc: TrackAnalysis, cur: TrackAnalysis) => {
      for (const key in acc) {
        acc[key] += cur[key]
      }
      return acc
    },
    {
      ...initialAnalysisObject
    }
  )

  const averageAnalysis = Object.fromEntries(
    Object.entries(reduceAnalysisList).map(([key, value]) => [
      key,
      value / numberOfObject
    ])
  )

  useEffect(() => {
    const fetchresponseTracks = async () => {
      const getTrackAnalysis = await getTracksAudioFeatures(track)

      const result = await getRecommendations(
        getRandomArray(artist),
        getRandomArray(genre),
        track[0]
      )

      setResponseTracks(result)
      setAnalysis(getTrackAnalysis)
    }

    fetchresponseTracks()
  }, [])

  const handleClickToLoginButton = () => {
    navigate('/login')
  }

  const handleClickShareButton = () => {
    // 배포 후 수정(data타입으로 수정)
    const shareLink = 'YOUR_SHARE_LINK'
    shareData({ url: shareLink })
  }

  const handleClickPreviewPlayButton = (data: any) => {
    //프리뷰 음악 재생하기
    console.log(data)
  }

  {
    return (
      <>
        <div className="bg-white w-354 text-mainBlack text-center mx-auto mt-42 mb-50 bill-background-side">
          <h1 className="text-52 leading-none">PIXEL BEAT</h1>
          <div
            className="my-0 ml-[14%] w-260 mt-[-20px] mb-[-18px] bg-no-repeat bg-[52.7%_54%] bg-[length:140px]"
            style={{ backgroundImage: `url(${graphBgImg})` }}>
            {/* 데이터 내려주기 */}
            <BillGraph averageAnalysis={averageAnalysis} />
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

          <section className="data-section">
            <div className="my-6">
              {responseTracks &&
                responseTracks.map((tracks, idx) => (
                  <BillItem
                    key={tracks.id}
                    id={tracks.id}
                    trackNumber={idx}
                    tracks={tracks}
                    onClick={handleClickPreviewPlayButton}
                  />
                ))}
            </div>
          </section>

          <section className="bill-bottom-section">
            <div className=" mx-16 py-8 border-y-2 border-dashed border-mainBlack text-14">
              <time className="block w-full text-left">
                생성날짜 및 시간(수정해야함)
              </time>
              <div className="flex justify-between w-full">
                <p>www.pixelBeat.com</p>
                <p>provided by spotify</p>
              </div>
            </div>
          </section>
          <img
            loading="lazy"
            src={barcodeImg}
            alt="바코드 이미지"
            className="mx-auto mt-24 mb-5"
          />
        </div>

        <section className="button-section">
          <div className="w-356 mx-auto  text-20">
            <StandardButton
              text={'다른 영수증 구경하기'}
              onClick={handleClickToLoginButton}
            />
            <StandardButton
              text={'공유하기'}
              onClick={handleClickShareButton}
              fillColor="#FFFF57"
              propsClass="mx-auto mt-12 mb-42"
            />
          </div>
        </section>
      </>
    )
  }
}
