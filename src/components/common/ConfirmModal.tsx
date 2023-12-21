import { CONFIRM_TYPE } from '@/constants'
import { SmallButton } from '..'
import { useConfirm } from '@/hooks'

export const ConfirmModal = ({
  onConfirmClick,
  onCancelClick
}: {
  onConfirmClick?: () => void
  onCancelClick?: () => void
}) => {
  const { closeConfirm, confirmType } = useConfirm()

  const style = `relative 
    desktop:w-120 desktop:h-40 desktop:text-16 
    text-14 w-80 h-24 
  `

  return (
    <div
      className="portal-background w-full h-screen flex justify-center items-center fixed top-0 left-2/1 translate-x-2/1"
      onClick={closeConfirm}>
      <div className="border-mainBlack border-2 flex justify-center items-center bg-mainWhite p-4">
        <div className="relative border-mainBlack border-4 flex flex-col justify-center items-center desktop:w-440 desktop:h-220  px-48 py-32">
          <p
            className={`text-mainBlack text-center text-16 desktop:text-20 mb-16 desktop:mb-20 ${
              confirmType === 'loginFail'
                ? 'max-w-190 desktop:max-w-220'
                : 'max-w-230 desktop:max-w-300'
            } `}>
            {CONFIRM_TYPE[confirmType!][0]}
          </p>
          {CONFIRM_TYPE[confirmType!][1] ? (
            <div className="inline=block">
              <SmallButton
                onClick={onConfirmClick}
                propsClass={`${style} mr-10`}
                text={CONFIRM_TYPE[confirmType!][1]}
              />
              <SmallButton
                onClick={onCancelClick || closeConfirm}
                propsClass={`${style} `}
                fillColor="white"
                text={'취소'}
              />
            </div>
          ) : (
            <SmallButton
              onClick={closeConfirm}
              propsClass="relative w-80 text-14 desktop:w-120  desktop:text-18"
              text="확인"
            />
          )}
        </div>
      </div>
    </div>
  )
}
