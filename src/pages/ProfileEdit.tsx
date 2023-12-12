import { ProfileForm } from '@/components/Profile'
import React from 'react'

export const ProfileEdit = () => {
  return (
    <>
      <h1 className="text-center text-24 font-normal pt-52">프로필 설정</h1>
      <h2 className="text-center text-14 font-normal not-italic mt-14">
        나중에 언제든지 변경할 수 있습니다.
      </h2>
      <div className="profile">
        <button className="select"></button>
      </div>
      <ProfileForm />
    </>
  )
}
