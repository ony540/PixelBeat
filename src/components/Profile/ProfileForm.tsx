import { useState } from 'react'
import debounce from '@/utils/debounce'
import { useNavigate } from 'react-router-dom'
import { StandardButton } from '@/components'
import InputField from '../SignUp/InputField'

export const ProfileForm = () => {
  const nickNameRegex = /^[가-힣a-zA-Z0-9_-]{3,16}$/
  const introductionRegex = /^[가-힣a-zA-Z0-9\s\.\,\!\?\-]{1,30}$/
  const navigate = useNavigate()

  const [formState, setFormState] = useState({
    nickName: '',
    introduction: ''
  })

  const [validationErrors, setValidationErrors] = useState({
    nickName: '',
    introduction: ''
  })

  const handleInput = e => {
    const { name, value } = e.target

    let isValid

    switch (name) {
      case 'nickName':
        isValid = nickNameRegex.test(value)
        break
      case 'introduction':
        isValid = introductionRegex.test(value)
        break
      default:
        return
    }

    setValidationErrors({
      ...validationErrors,
      [name]: !isValid
    })

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleDebounceInput = debounce(handleInput, 300)
  const isSubmitDisabled = () => {
    return (
      formState.nickName === '' ||
      formState.introduction === '' ||
      validationErrors.nickName ||
      validationErrors.introduction
    )
  }

  const makeProfile = () => {
    navigate('/login/email')
  }

  return (
    <form
      className="flex flex-col gap-8 mt-8 justify-center items-center py-6"
      onSubmit={e => e.preventDefault()}>
      <InputField
        name="nickName"
        label="닉네임"
        defaultValue={formState.nickName}
        placeholder="픽셀비트"
        type="nickName"
        onChange={handleDebounceInput}
        isValid={!validationErrors.nickName && formState.nickName !== ''}
        passMessage=""
        failMessage="닉네임은 필수 값입니다."
        isPasswordHidden={undefined}
        togglePasswordHidden={undefined}
      />
      <InputField
        name="introduction"
        label="자기소개"
        defaultValue={formState.introduction}
        placeholder="자기소개를 적어주세요"
        type="introduction"
        onChange={handleDebounceInput}
        isValid={
          !validationErrors.introduction && formState.introduction !== ''
        }
        passMessage=""
        failMessage=""
        isPasswordHidden={undefined}
        togglePasswordHidden={undefined}
      />
      <button className="sticky bottom-0 mx-auto my-22 text-30 standard-button-container">
        <StandardButton
          height={70}
          text={'완 료'}
          onClick={makeProfile}
          disabled={isSubmitDisabled()}
          fillColor={isSubmitDisabled() ? undefined : '#57FF57'}
        />
      </button>
    </form>
  )
}
  