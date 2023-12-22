import { SignUpForm } from '@/components/signUp'
import { getUserId } from '@/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupWithEmail = () => {
  const navigate = useNavigate()
  const isLoggedInUser = getUserId()
  const Login = () => {
    navigate('/signinwithemail')
  }
  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (isLoggedInUser) {
      navigate('/entry')
    }
  }, [isLoggedInUser, navigate])

  return (
    <div className="px-20 desktop:px-60">
      <h1 className="my-56 text-center text-24">이메일로 회원가입</h1>
      <SignUpForm />
      <div
        className="flex justify-center
                          desktop:text-18
                          text-14
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

export default SignupWithEmail
