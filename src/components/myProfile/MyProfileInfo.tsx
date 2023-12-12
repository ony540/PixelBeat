import React from 'react'

export const MyProfileInfo = () => {
  return (
    <>
      <div className='bg-mainGreen h-174 w-full flex'>
        <img className='w-90 h-90 mt-60 ml-42 bg-mainGray' src="" alt="" />
        <div className='mt-72 ml-16 text-mainBlack'>
          <div className='text-20'>닉네임</div> {/* :id  닉네임 들어가면 됩니다. */}
          <div className='text-16'>이메일</div> {/* :id  Email들어가면 됩니다. */}
          <div className='text-16'>자기소개</div> {/* :id  자기소개 들어가면 됩니다. */}
        </div>
      </div>
    </>
  )
}
