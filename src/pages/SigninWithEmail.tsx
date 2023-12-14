import { SignInForm } from '@/components'
import { useNavigate } from 'react-router'

export const SigninWithEmail = () => {
  const navigate = useNavigate()
  const moveToSignup = () => {
    navigate('/signup/email')
  }
  const moveToBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <div className="my-56 text-center text-24">로그인</div>
      <SignInForm />
      <section
        className="flex justify-center
                          desktop:text-18
                          mobile:text-14
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
