import { Eye, CloseEye } from '@/assets'
import { useState } from 'react'

export const SigninInputField = ({
  type,
  name,
  id,
  placeholder,
  value,
  onChange
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden)
  }

  return (
    <div className="pt-32 flex flex-col gap-4 relative">
      <label
        htmlFor={id}
        className="text-16 text-mainWhite">
        {name === 'email' ? '이메일' : '비밀번호'}
      </label>

      <input
        autoComplete="off"
        type={type === 'password' && isPasswordHidden ? 'password' : 'text'}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className=" border-b-2 bg-mainBlack outline-none
                    w-[320px] p-4
                    desktop:w-[600px] desktop:p-6
                  focus:border-mainGreen"
      />
      {type === 'password' && (
        <button
          type="button"
          className=" absolute right-10 
                      desktop:top-75  
                      top-55"
          onClick={togglePasswordHidden}>
          {isPasswordHidden ? <CloseEye /> : <Eye />}
        </button>
      )}
    </div>
  )
}
