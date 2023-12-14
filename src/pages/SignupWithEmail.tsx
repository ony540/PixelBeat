import { SignUpForm } from '@/components/SignUp'
import { useNavigate } from 'react-router-dom'

export const SignupWithEmail = () => {
  const navigate = useNavigate()
  const Login = () => {
    navigate('/login/email')
  }
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className="mobile:px-20 desktop:px-60">
      <h1 className="my-56 text-center text-24">이메일로 회원가입</h1>
      <SignUpForm />
      <div
        className="flex justify-center
                          desktop:text-18
                          mobile:text-14
                          py-10 ">
        <button
          onClick={Login}
          className="pr-12">
          로그인
        </button>
        |
        <button
          onClick={goBack}
          className="pl-12">
          이전으로 돌아가기
        </button>
      </div>
    </div>
  )
}
