import { SmallButton } from '@/assets'

export const ConfirmModal = ({
  onConfirmClick,
  onCancelClick,
  isLoginPage
}: {
  isLoginPage?: boolean
  onConfirmClick?: () => void
  onCancelClick?: () => void
}) => {
  const style = `
    absolute bottom-10
    desktop:w-120 desktop:h-40 desktop:text-16 desktop:top-130
    mobile:text-14 mobile:w-80 mobile:h-24 mobile:top-90
  `

  return (
    <div className="portal-background w-full h-screen flex justify-center items-center fixed top-0 left-2/1 translate-x-2/1">
      <div className="border-mainBlack border-2 flex justify-center items-center bg-mainWhite desktop:w-450 desktop:h-230 mobile:w-300 mobile:h-160">
        <div className="relative border-mainBlack border-4 flex justify-center items-center px-40 desktop:w-440 desktop:h-220 mobile:w-290 mobile:h-150">
          {isLoginPage ? (
            <h1 className="absolute mobile:top-35 desktop:top-50 text-mainBlack text-center mobile:text-14 desktop:text-20">
              로그인에 실패했습니다.
              <br />
              다시 한번 확인해주세요.
            </h1>
          ) : (
            <h1 className="absolute mobile:top-35 desktop:top-50 text-mainBlack text-center mobile:text-14 desktop:text-20">
              로그인이 필요한 서비스입니다.
              <br />
              로그인 하시겠습니까?{' '}
            </h1>
          )}

          {isLoginPage ? (
            <SmallButton
              onClick={onConfirmClick}
              propsClass="absolute mobile:w-80 mobile:text-14 mobile:bottom-30 desktop:w-120 desktop:bottom-50 desktop:text-18"
              text="확 인"
            />
          ) : (
            <>
              <SmallButton
                onClick={onConfirmClick}
                propsClass={`${style} left-[20%]`}
                text="확 인"
              />
              <SmallButton
                onClick={onCancelClick}
                propsClass={`${style} right-[20%]`}
                fillColor="white"
                text="취 소"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
