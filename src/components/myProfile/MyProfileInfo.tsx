export const MyProfileInfo = () => {
  return (
    <>
      <div className="bg-mainGreen h-119 w-full flex desktop:px-60">
        <img
          className="w-90 h-90 mt-5 ml-40 bg-mainGray"
          src=""
          alt=":id의 프로필사진"
        />
        <div className="mt-17 ml-16 text-mainBlack">
          <div className="text-20">닉네임</div>{' '}
          {/* :id  닉네임 들어가면 됩니다. */}
          <div className="text-16">이메일</div>{' '}
          {/* :id  Email들어가면 됩니다. */}
          <div className="text-16">자기소개</div>{' '}
          {/* :id  자기소개 들어가면 됩니다. */}
        </div>
      </div>
    </>
  )
}
