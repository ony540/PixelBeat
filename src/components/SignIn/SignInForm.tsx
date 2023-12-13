import { useState, useCallback } from 'react'
import { InputSection } from './InputSection'
import debounce from '@/utils/debounce'
import { useNavigate } from 'react-router-dom'
import { StandardButton } from '@/components'

export const SignInForm = () => {
  const handleSignIn = async e => {
    e.preventDefault()
  }

  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const [validationErrors, setValidationErrors] = useState({
    email: false,
    password: false,
    passwordConfirm: false
  })

  const handleInput = useCallback(
    debounce(e => {
      const { name, value } = e.target
      setFormState(prevFormState => ({
        ...prevFormState,
        [name]: value
      }))
    }, 400),
    []
  )
  const isSubmitDisabled = () => {
    return (
      formState.email === '' ||
      formState.password === '' ||
      validationErrors.email ||
      validationErrors.password
    )
  }
  const GoToMain = () => {
    navigate('/main')
  }

  return (
    <>
      <form onSubmit={handleSignIn}>
        <InputSection
          formState={formState}
          handleInput={handleInput}
        />
      </form>
      <button className="sticky bottom-0 mx-auto pl-30 my-10 text-30 left-100 standard-button-container">
        <StandardButton
          height={70}
          text={'다 음'}
          onClick={GoToMain}
          disabled={isSubmitDisabled()}
          fillColor={isSubmitDisabled() ? undefined : '#57FF57'}
        />
      </button>
    </>
  )
}
