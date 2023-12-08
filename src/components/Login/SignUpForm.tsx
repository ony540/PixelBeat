import React, { useState } from "react";
import InputField from "./InputField";
import debounce from "@/utils/debounce";
import { Next } from "@/assets";

export const SignUpForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~@$!%*?&])[A-Za-z\d~@$!%*?&]{6,16}$/;

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const toggleConfirmPasswordHidden = () => {
    setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    let isValid;

    switch (name) {
      case "email":
        isValid = emailRegex.test(value);
        break;
      case "password":
        isValid = passwordRegex.test(value);
        break;
      case "passwordConfirm":
        isValid = formState.password === value;
        break;
      default:
        return;
    }

    setValidationErrors({
      ...validationErrors,
      [name]: !isValid,
    });

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDebounceInput = debounce(handleInput, 500);
  const isSubmitDisabled = () => {
    return (
      formState.email === "" ||
      formState.password === "" ||
      formState.passwordConfirm === "" ||
      validationErrors.email ||
      validationErrors.password ||
      validationErrors.passwordConfirm
    );
  };

  return (
    <form
      className="flex flex-col gap-8 mt-8 justify-center items-center py-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <InputField
        name="email"
        label="이메일"
        defaultValue={formState.email}
        placeholder="예: petbridge@gmail.com"
        type="email"
        onChange={handleDebounceInput}
        isValid={!validationErrors.email && formState.email !== ""}
        passMessage=" 사용가능한 이메일입니다."
        failMessage="올바른 이메일 형식이 아닙니다."
        isPasswordHidden={false}
        togglePasswordHidden={() => {}}
      />
      <InputField
        name="password"
        label="비밀번호"
        defaultValue={formState.password}
        placeholder="비밀번호를 입력해 주세요"
        type={isPasswordHidden ? "password" : "text"}
        onChange={handleDebounceInput}
        isValid={!validationErrors.password && formState.password !== ""}
        passMessage="사용가능한 계정 비밀번호입니다."
        failMessage="영문, 숫자, 특수기호를 포함하여 6자~16자로 입력해주세요."
        isPasswordHidden={isPasswordHidden}
        togglePasswordHidden={togglePasswordHidden}
      />
      <InputField
        name="passwordConfirm"
        label="비밀번호 확인"
        defaultValue={formState.passwordConfirm}
        placeholder="비밀번호를 한번 더 입력해 주세요"
        type={isConfirmPasswordHidden ? "password" : "text"}
        onChange={handleDebounceInput}
        isValid={
          !validationErrors.passwordConfirm && formState.passwordConfirm !== ""
        }
        passMessage="비밀번호와 일치합니다."
        failMessage="비밀번호와 일치하지 않습니다. 다시 확인해주세요."
        isPasswordHidden={isConfirmPasswordHidden}
        togglePasswordHidden={toggleConfirmPasswordHidden}
      />
      <button
        type="submit"
        disabled={isSubmitDisabled()}
        className="flex justify-center pt-24"
      >
        <Next />
      </button>
    </form>
  );
};
