import { SignInForm } from '@/components'
import { getUserId } from '@/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const SigninWithEmail = () => {
  const navigate = useNavigate()
  const isLoggedInUser = !!getUserId()

  const moveToSignup = () => {
    navigate('/signupwithemail')
  }

  const moveToBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (isLoggedInUser) {
      navigate('/home')
    }
  }, [isLoggedInUser, navigate])

  return (
    <div>
      <div className="my-56 text-center text-24">로그인</div>
      <SignInForm />
      <section
        className="flex justify-center
                          desktop:text-18
                          text-14
                          py-10 
      ">
        <button
          onClick={moveToSignup}
          className="pr-12">
          회원가입
        </button>
        |
        <button
          onClick={moveToBack}
          className="pl-12">
          이전으로 돌아가기
        </button>
      </section>
    </div>
  )
}

export default SigninWithEmail
