import { Eye, CloseEye } from '@/assets'
import { useRef, useState } from 'react'
import { ValidationErrorMessage } from '@/components'

interface SignupInputFieldProps {
  name?: string
  label?: string
  value?: string
  placeholder?: string
  type?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isValid?: boolean
  passMessage?: string
  failMessage?: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  isPasswordHidden?: boolean
  togglePasswordHidden?: () => void
}

export const SignupInputField: React.FC<SignupInputFieldProps> = ({
  name,
  label,
  value,
  placeholder,
  type,
  onChange,
  isValid,
  passMessage,
  failMessage,
  onBlur
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isIconHidden, setIsIconHidden] = useState(true)
  const [isBlurred, setIsBlurred] = useState(false)

  const toggleIconHidden = () => {
    setIsIconHidden(!isIconHidden)
  }

  const handleBlur = event => {
    setIsBlurred(true)
    onBlur && onBlur(event)
  }

  const borderColorClass = isBlurred
    ? isValid
      ? 'border-mainGreen'
      : 'border-mainRed'
    : ''

  return (
    <div className={`pt-32 flex flex-col gap-4 relative`}>
      <label
        htmlFor={name}
        className="text-16 text-mainWhite">
        {label}
      </label>
      <input
        ref={inputRef}
        onBlur={handleBlur}
        autoComplete="off"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border-b-2 bg-mainBlack outline-none
        mobile:w-[320px] mobile:p-4
        desktop:w-[600px] desktop:p-6
        ${isValid ? 'focus:border-mainGreen' : 'focus:border-mainRed'}
        
        ${borderColorClass}
      `}
      />
      {type === 'password' && (
        <div
          onClick={() => {
            toggleIconHidden()
            if (inputRef.current) {
              inputRef.current.type = isIconHidden ? 'text' : 'password'
            }
          }}
          className="absolute right-10  text-gray-500
          mobile:top-55
          desktop:top-63
          ">
          {isIconHidden ? <CloseEye /> : <Eye />}
        </div>
      )}
      {isBlurred && (
        <ValidationErrorMessage
          text={isValid ? passMessage : failMessage}
          isValid={isValid}
        />
      )}
    </div>
  )
}
