import { SignInForm } from '@/components'
import React from 'react'

export const LoginEmail = () => {
  return (
    <>
    <div className="my-56 text-center text-24">로그인</div>
    <SignInForm />
    <div className="flex justify-center py-10 text-14">
        <button className="pr-12">회원가입</button>|
        <button className="pl-12">이전으로 돌아가기</button>
      </div>
    </>
  )
}
