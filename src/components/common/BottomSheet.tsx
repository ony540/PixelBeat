import { BottomSheetTop } from '@/assets'
import { BOTTOMSHEET_TYPE } from '@/constants'
import { useModal } from '@/hooks'

export const BottomSheet = ({ onClick }) => {
  const { isVisible, closeModal, modalType, isShow } = useModal()

// modalType === 'myBillList'일 때 쥬스탠드에서 관리하고 있는  내 ownplaylist들고오기
//ownplaylist에 저장할때 id랑 이름 객체 배열로 저장하기
  if(modalType === 'myBillList'){
  }
  
  if (!isVisible) return null

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
        }  absolute bottom-0 bg-mainWhite desktop:rounded-t-[56px] rounded-t-[30px] `}>
        <BottomSheetTop onClick={closeModal} />
        <div
          className=" w-full 
                    ">
          <ul className="text-section mb-40 ">
            {BOTTOMSHEET_TYPE[modalType!] &&
              BOTTOMSHEET_TYPE[modalType!].map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className={` text-mainBlack hover:bg-mainBlack hover:text-mainWhite text-left w-full
                  mobile:px-20 
                  desktop:px-60 p-12 `}
                    onClick={onClick}>
                    {item}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
