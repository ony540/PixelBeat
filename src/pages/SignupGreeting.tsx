import { NavigateAssistPopUp } from '@/components'
import { useModal } from '@/hooks'
import Portal from '@/utils/portal'
import { useEffect } from 'react'

export const SignupGreeting = () => {
  const { openModal, isVisible } = useModal()

  useEffect(() => {
    openModal()
  }, [])
  return (
    <div>
      {isVisible && (
        <Portal>
          <NavigateAssistPopUp />
        </Portal>
      )}
    </div>
  )
}
