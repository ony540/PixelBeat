import { signInWithSpotify } from '@/api'
import { SpotifyHover, VisitorIcon } from '@/assets'
import {
  PixelBeatLoginButton,
  SpotifyLoginButton,
  StandardButton
} from '@/components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/assets/imgs/Logo.png'

const Entry = () => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(!isHovered)
  }

  const moveToSignupWithPixelBeat = () => {
    navigate('/signupwithemail')
  }

  const moveToPixelBeatWithPixelBeat = () => {
    navigate('/signinwithemail')
  }

  const moveToHome = () => {
    navigate('/home')
  }

  const handlesSignInWithSpotify = async () => {
    await signInWithSpotify()
  }

  return (
    <div className="px-20 desktop:px-60">
      <img
        className="mx-auto 
        w-280 mt-[20vh]
        desktop:w-500 desktop:mt-[12vh]"
        src={Logo}
        alt="logo image"
      />

      <div className="desktop:h-[18vh] h-[20vh]" />
      <div className="relative flex flex-col gap-8 items-center">
        <SpotifyLoginButton
          onClick={handlesSignInWithSpotify}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          propsClass={'w-356 h-56 desktop:w-[500px] desktop:h-60'}
        />
        <div className="absolute top-[-50px]">
          {isHovered && <SpotifyHover />}
        </div>
        <PixelBeatLoginButton
          onClick={moveToPixelBeatWithPixelBeat}
          propsClass={'w-356 h-56 desktop:w-[500px] desktop:h-60'}
        />
        <div
          className="relative"
          onClick={moveToHome}>
          <VisitorIcon />
          <StandardButton
            propsClass={
              'w-356 h-56 desktop:w-[500px] desktop:h-60 text-mainBlack'
            }
            fillColor="white"
            text="비회원으로 구경하기"
          />
        </div>
      </div>

      <div className="flex justify-center pb-10 mt-16">
        <button
          onClick={moveToSignupWithPixelBeat}
          className="pr-12 text-16">
          이메일로 회원가입
        </button>
        |<button className="pl-12 text-16">문의하기</button>
      </div>
    </div>
  )
}

export default Entry
