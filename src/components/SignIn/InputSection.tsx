import  {InputField}  from './InputField';

export const InputSection = ({ formState, handleInput }) => {
  return (
    <div className='flex flex-col gap-8 mt-8 justify-center items-center py-6'>
    <InputField
      type="email"
      name="email"
      id="email"
      placeholder="이메일을 입력해 주세요"
      value={formState.email}
      onChange={handleInput}
    />
    <InputField
      type="password"
      name="password"
      id="password"
      placeholder="비밀번호를 입력해 주세요"
      value={formState.password}
      onChange={handleInput}
    />
  </div>
  )
}
