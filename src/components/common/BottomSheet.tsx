import { BottomSheetTop } from '@/assets'
import { useModal } from '@/hooks'

export const BottomSheet = () => {
  const { isVisible, closeModal, isShow } = useModal()

  if (!isVisible) {
    return null
  }

  return (
    <div
      onClick={closeModal}
      className={`fixed top-0 h-screen
                  flex items-center justify-center portal-background
                  mobile:w-[390px] 
                  desktop:w-[720px] 
                  left-1/2 -translate-x-1/2
                  ${
                    isShow
                      ? 'portal-background-open'
                      : 'portal-background-close'
                  }
                  `}>
      <div
        className={`${
          isShow ? 'open' : 'closing'
        } relative desktop:mt-[40vh] mobile:mt-[55vh]`}>
        <BottomSheetTop onClick={closeModal} />
        <div
          className="fixed h-screen w-full bg-mainWhite 
                     ">
          <section className="text-section ">
            <div className="flex flex-col justify-start">
              <p
                className={` text-mainBlack hover:bg-mainBlack hover:text-mainWhite w-full
                              mobile:px-20 
                              desktop:px-60 py-8 `}
                onClick={e => e.stopPropagation()}>
                음악 영수증에 추가하기
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
