import {
  PixelBeatLoginButton,
  SpotifyLoginButton,
  SpotifyHover
} from '@/assets'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Entry = () => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(!isHovered)
  }

  const moveToSignup = () => {
    navigate('/signup/email')
  }

  const moveToPixelBeat = () => {
    navigate('/login/email')
  }

  return (
    <div className="mobile:px-20 desktop:px-60">
      <h1 className="text-center pt-100 text-28">Pixel Beat</h1>

      <div className="h-[40vh]"></div>
      <div className="relative flex flex-col gap-8 items-center">
        <SpotifyLoginButton
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          propsClass={'mobile:w-356 mobile:h-56 desktop:w-[500px] desktop:h-60'}
        />
        <div className="absolute top-[-50px]">
          {isHovered && <SpotifyHover />}
        </div>
        <PixelBeatLoginButton
          onClick={moveToPixelBeat}
          propsClass={'mobile:w-356 mobile:h-56 desktop:w-[500px] desktop:h-60'}
        />
      </div>

      <div className="flex justify-center pb-10">
        <button
          onClick={moveToSignup}
          className="pr-12 text-16">
          이메일로 회원가입
        </button>
        |<button className="pl-12 text-16">문의하기</button>
      </div>
    </div>
  )
}
