import { NavigateAssistPopUp } from '@/components'
import { useModal } from '@/hooks'
import { getUserId } from '@/utils'
import Portal from '@/utils/portal'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupGreeting = () => {
  const isLoggedInUser = getUserId()
  const navigate = useNavigate()
  const { openModal, isVisible } = useModal()

  useEffect(() => {
    if (isLoggedInUser) {
      navigate('/home')
    }
    openModal()
  }, [isLoggedInUser])

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

export default SignupGreeting
