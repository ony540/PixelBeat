import { useNavigate } from 'react-router-dom'
import { CirclePlayButton, Clock } from '@/assets'
import { BillGraph, StandardButton } from '@/components'
import barcodeImg from '@/assets/imgs/barcode.png'
import graphBgImg from '@/assets/imgs/graphBackground.png'
import { msToMinutesAndSeconds, shareData } from '@/utils'

const data = {
  artists: [
    {
      name: '뉴진스',
      popularity: 0,
      type: 'artist',
      uri: 'string'
    }
  ],
  available_markets: ['string'],
  disc_number: 0,
  duration_ms: 0,
  explicit: false,
  external_ids: {
    isrc: 'string',
    ean: 'string',
    upc: 'string'
  },
  external_urls: {
    spotify: 'string'
  },
  href: 'string',
  id: 'string',
  is_playable: false,
  linked_from: {},
  restrictions: {
    reason: 'string'
  },
  name: '노래제목한글',
  popularity: 0,
  preview_url:
    'https://p.scdn.co/mp3-preview/dab062e2cc708a2680ce84953a3581c5a679a230?cid=dd3b7e313f5148db8e93b498352200a7',
  track_number: 0,
  type: 'track',
  uri: 'string',
  is_local: false
}

export const Bill = () => {
  const navigate = useNavigate()

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
            <BillGraph />
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
          <div className="my-6">
            {/* 데이터 맵돌릴 노래목록 */}
            <div className="group mx-16 h-48 text-left text-16 flex items-center justify-between hover:bg-bgGray hover:cursor-pointer">
              <div className="flex items-center">
                <span className="ml-8 mr-22">{String(1).padStart(2, '0')}</span>
                <div className="leading-[1.2] inline-block">
                  <h3>{data.name}</h3>
                  <p className="self-end text-14">{data.artists[0].name}</p>
                </div>
              </div>

              <div className="pr-3 flex">
                {data.preview_url && (
                  <button
                    className="hidden group-hover:block mr-18"
                    onClick={() => handleClickPreviewPlayButton(data)}>
                    <CirclePlayButton />
                  </button>
                )}

                <p className="mt-4">
                  {msToMinutesAndSeconds(data.duration_ms)}
                </p>
              </div>
            </div>
          </div>

          <div className=" mx-16 py-8 border-y-2 border-dashed border-mainBlack text-14">
            <time className="block w-full text-left">
              생성날짜 및 시간(수정해야함)
            </time>
            <div className="flex justify-between w-full">
              <p>www.pixelBeat.com</p>
              <p>provided by spotify</p>
            </div>
          </div>
          <img
            loading="lazy"
            src={barcodeImg}
            alt="바코드 이미지"
            className="mx-auto mt-24 mb-5"
          />
        </div>
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
      </>
    )
  }
}
