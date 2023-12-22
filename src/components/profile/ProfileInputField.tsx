import { useState } from 'react'

export const ProfileInputField = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  valiationCheck
}: {
  name: string
  label: string
  value: string
  placeholder: string
  onChange?: any
  valiationCheck?: any
}) => {
  const [isBlurd, setIsBlurd] = useState(false)

  const handleBlur = () => {
    setIsBlurd(!isBlurd)
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="text-16 desktop:text-20 text-mainWhite">
        {label}
      </label>
      <input
        onBlur={handleBlur}
        autoComplete="off"
        type="text"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border-b-2 bg-mainBlack outline-none
                    w-[350px] p-8
                    desktop:w-[600px] desktop:p-8
                  focus:border-mainGreen
                  ${
                    name === 'userName' &&
                    !valiationCheck &&
                    isBlurd &&
                    'focus:border-mainRed'
                  }
                  `}
      />
      {name === 'userName' && !valiationCheck && isBlurd && (
        <p className="text-mainRed mt-6">닉네임은 필수 값입니다.</p>
      )}
    </div>
  )
}
