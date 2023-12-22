export const NavigateAssistPopUp = () => {
  return (
    <div
      className="fixed top-0 h-screen portal-background
                 w-[390px] 
                 desktop:w-[720px] 
                 left-1/2 -translate-x-1/2">
      <div className="relative flex justify-center items-center w-full h-screen">
        <div
          className="border-mainBlack border-2 flex justify-center items-center bg-mainWhite
                        desktop:w-450 desktop:h-230 
                        w-300 h-160 ">
          <div
            className="border-mainBlack border-4 flex justify-center items-center px-40
                          desktop:w-440 desktop:h-220 
                          w-290 h-150">
            <p
              className="text-mainBlack text-center
                          text-16 
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