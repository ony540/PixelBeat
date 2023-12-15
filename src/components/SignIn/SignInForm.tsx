import { useState } from 'react'
import { InputSection } from './InputSection'
import { useNavigate } from 'react-router-dom'
import { StandardButton } from '@/components'
import { signinUser } from '@/api/supabase/pixelbeatAuthApis'

export const SignInForm = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formState

  const handleSignIn = async e => {
    e.preventDefault()
    const res = await signinUser(email, password)
    if (res) {
      navigate('/home') // 추후 수정 필요
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
    <div className="mobile:px-20 desktop:px-60">
      <form onSubmit={handleSignIn}>
        <InputSection
          formState={formState}
          handleInput={handleInput}
        />
        <StandardButton
          type="submit"
          propsClass="mx-auto mt-22 w-full
                    mobile:h-56 
                    desktop:h-60 "
          text={'다음'}
          disabled={isSubmitDisabled()}
          fillColor={isSubmitDisabled() ? '' : '#57FF57'}
        />
      </form>
    </div>
  )
}
