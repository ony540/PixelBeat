import { EmailBtn, LoginBtn, SpotifyHover } from '@/assets'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Entry = () => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const signUp = () => {
    navigate('/signup/email')
  }
  const emaillogin = () => {
    navigate('/login/email')
  }

  return (
    <>
      <div className="text-center pt-100 pb-[320px] text-28">Pixel Beat</div>
      <div className="flex justify-center h-110 items-center py-10">
        <div
          className="relative items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {isHovered && <SpotifyHover />}
          <button className=" relative z-10">
            <LoginBtn />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center pb-10">
        <button onClick={emaillogin}>
          <EmailBtn />
        </button>
      </div>
      <div className="flex justify-center pb-10">
        <button
          onClick={signUp}
          className="pr-12 text-16">
          이메일로 회원가입
        </button>
        |<button className="pl-12 text-16">문의하기</button>
      </div>
    </>
  )
}
