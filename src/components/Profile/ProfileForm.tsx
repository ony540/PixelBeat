import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StandardButton } from '@/components'
import defaultImage from '../../assets/imgs/Profile.png'
import { ImageUploadForm, ProfileInputField } from '.'

export const ProfileForm = () => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(defaultImage)
  const [formState, setFormState] = useState({
    userName: '',
    userIntroduction: ''
  })
  const [validationErrors, setValidationErrors] = useState({
    userName: ''
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    } else {
      setSelectedImage(defaultImage)
    }
  }

  const handleTextChange = e => {
    const { name, value } = e.target

    setFormState(prev => ({
      ...prev,
      [name]: value
    }))

    const isUserNameValid = value.trim() !== ''

    setValidationErrors(prev => ({
      ...prev,
      [name]: isUserNameValid
    }))
  }

  const isSubmitDisabled = () => {
    const isEmpty = Object.keys(formState).some(check => check === '')
    const isValidationError = validationErrors.userName === ''

    return isEmpty || isValidationError
  }

  const makeProfile = () => {
    navigate('/login/email')
  }

  return (
    <form
      className="flex flex-col mobile:gap-20 desktop:gap-30 mt-8 justify-center items-center"
      onSubmit={e => e.preventDefault()}>
      <ImageUploadForm
        onChange={handleImageChange}
        selectedImage={selectedImage}
      />
      <ProfileInputField
        name={'userName'}
        label="닉네임"
        value={formState.userName}
        placeholder="픽셀비트"
        onChange={handleTextChange}
        valiationCheck={validationErrors.userName}
      />
      <ProfileInputField
        name={'userIntroduction'}
        label="자기소개"
        value={formState.userIntroduction}
        placeholder="자기소개를 적어주세요"
        onChange={handleTextChange}
      />

      <StandardButton
        type="submit"
        propsClass="mx-auto mt-22 w-full
                    mobile:h-56 
                    desktop:h-60 "
        text={'완료'}
        disabled={isSubmitDisabled()}
        fillColor={isSubmitDisabled() ? '' : '#57FF57'}
      />
    </form>
  )
}
