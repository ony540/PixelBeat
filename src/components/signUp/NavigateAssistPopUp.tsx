export const NavigateAssistPopUp = () => {
  return (
    <div
      className="fixed top-0 h-screen portal-background
                 mobile:w-[390px] 
                 desktop:w-[720px] 
                 left-1/2 -translate-x-1/2">
      <div className="relative flex justify-center items-center w-full h-screen">
        <div
          className="border-mainBlack border-2 flex justify-center items-center bg-mainWhite
                        desktop:w-450 desktop:h-230 
                        mobile:w-300 mobile:h-160 ">
          <div
            className="border-mainBlack border-4 flex justify-center items-center px-40
                          desktop:w-440 desktop:h-220 
                          mobile:w-290 mobile:h-150">
            <p
              className="text-mainBlack text-center
                          mobile:text-16 
                          desktop:text-28">
              PIXELBEAT를 시작하기 전 <br />
              사용자 확인을 위해 <br />
              메일함을 확인해주세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}