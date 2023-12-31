import { useState } from 'react'
import { InputSection } from '@/components'
import { useNavigate } from 'react-router-dom'
import { ConfirmModal, StandardButton } from '@/components'
import { signinUser } from '@/api/supabase/pixelbeatAuthApis'
import Portal from '@/utils/portal'
import { useConfirm } from '@/hooks'

export const SignInForm = () => {
  const navigate = useNavigate()
  const { openConfirm, isShow } = useConfirm()
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formState

  const handleSignIn = async e => {
    e.preventDefault()
    const res = await signinUser(email, password)
    if (!res.user) {
      openConfirm('loginFail')
      return
    }

    if (res.user) {
      navigate('/home')
    }
  }

  const handleInput = e => {
    const { name, value } = e.target
    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isSubmitDisabled = () => !formState.email || !formState.password

  return (
    <div className="px-20 desktop:px-60">
      <form onSubmit={handleSignIn}>
        <InputSection
          formState={formState}
          handleInput={handleInput}
        />
        <StandardButton
          type="submit"
          propsClass="mx-auto mt-22 w-full
                    h-56 
                    desktop:h-60 "
          text={'다음'}
          disabled={isSubmitDisabled()}
          fillColor={isSubmitDisabled() ? '' : '#57FF57'}
        />
      </form>

      <Portal>{isShow && <ConfirmModal />}</Portal>
    </div>
  )
}
