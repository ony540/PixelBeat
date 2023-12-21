import { SigninInputField } from './SigninInputField'

export const InputSection = ({ formState, handleInput }) => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center py-6 ">
      <SigninInputField
        id="email"
        name="email"
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={formState.email}
        onChange={handleInput}
      />
      <SigninInputField
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={formState.password}
        onChange={handleInput}
      />
    </div>
  )
}
