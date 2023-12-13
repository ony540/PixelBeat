import { Eye, CloseEye } from '@/assets'
import { useState } from 'react'

export const InputField = ({ type, name, id, placeholder, value, onChange }) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden)
  }

  return (
    <div className="pt-32 flex flex-col gap-4 relative ">
      <label
        htmlFor={id}
        className=" text-mainWhite text-16">
        {name === 'email' ? '이메일' : name === 'password' ? '비밀번호' : ''}
      </label>
      <input
        type={type === 'password' && isPasswordHidden ? 'password' : 'text'}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        className="border-b-2 w-[520px] loginText bg-mainBlack p-4 focus:border-mainGreen text-16"
      />
      {type === 'password' && (
        <button
          type="button"
          className=" absolute right-10 top-66 text-gray-500"
          onClick={togglePasswordHidden}>
          {isPasswordHidden ? <Eye /> : <CloseEye />}
        </button>
      )}
    </div>
  )
}
