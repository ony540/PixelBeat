import { signInWithSpotify } from '@/api'
import { SpotifyHover } from '@/assets'
import { PixelBeatLoginButton, SpotifyLoginButton } from '@/components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Entry = () => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(!isHovered)
  }

  const moveToSignupWithPixelBeat = () => {
    navigate('/signupwithemail')
  }

  const moveToPixelBeatWithPixelBeat = async () => {
    navigate('/signinwithemail')
  }

  const handlesSignInWithSpotify = async () => {
    await signInWithSpotify()
  }

  return (
    <div className="mobile:px-20 desktop:px-60">
      {/* <button onClick={getRefreshToken}>리프레시</button> */}
      <h1 className="text-center pt-100 text-28">Pixel Beat</h1>

      <div className="h-[40vh]"></div>
      <div className="relative flex flex-col gap-8 items-center">
        <SpotifyLoginButton
          onClick={handlesSignInWithSpotify}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          propsClass={'mobile:w-356 mobile:h-56 desktop:w-[500px] desktop:h-60'}
        />
        <div className="absolute top-[-50px]">
          {isHovered && <SpotifyHover />}
        </div>
        <PixelBeatLoginButton
          onClick={moveToPixelBeatWithPixelBeat}
          propsClass={'mobile:w-356 mobile:h-56 desktop:w-[500px] desktop:h-60'}
        />
      </div>

      <div className="flex justify-center pb-10">
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
