import { CirclePlay, RectangleVertax } from '@/assets'
import { useNavigate } from 'react-router-dom'
import bannerImg from '@/assets/imgs/bannerBg_mobile.png'
import bannerDesktopImg from '@/assets/imgs/bannerBg_desktop.png'

export const ToRecommendBannerItem = () => {
  const navigate = useNavigate()

  const handleClickBanner = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigate(`/recommend/genre`)
  }

  return (
    <div className="relative w-full h-383 bg-mainGreen ">
      <div
        className="w-inherit absolute h-385 top-[-1px] 
">
        <RectangleVertax height="385" />
      </div>
      <picture
        className={`block object-fit w-full desktop:w-[382.5px] absolute desktop:right-30 desktop:top-40`}>
        <source
          srcSet={bannerDesktopImg}
          media="(min-width:720px)"
        />
        <img
          src={bannerImg}
          alt="추천 유도 배너 이미지"
        />
      </picture>
      <h2 className="absolute left-40 bottom-32 w-270 leading-[1.2] text-black text-26">
        취향에 딱 맞는 <br />
        음악 영수증
      </h2>
      <button
        type="button"
        className="absolute right-40 desktop:right-50 bottom-35 transition-all"
        onClick={e => handleClickBanner(e)}>
        <CirclePlay />
      </button>
    </div>
  )
}
