import { Eye, CloseEye } from "@/assets";
import { useState } from "react";

function Message({ text, isValid }) {
  if (!text || text === "") {
    return null;
  }

  const messageText = isValid ? (
    <span className="text-mainGreen text-xs">{text}</span>
  ) : (
    <span className="text-mainRed text-xs">{text}</span>
  );

  return <div className="message">{messageText}</div>;
}

export default function InputField({
  name,
  label,
  defaultValue,
  placeholder,
  type,
  onChange,
  isValid,
  passMessage,
  failMessage,
  isPasswordHidden,
  togglePasswordHidden,
}) {

  const hasValue =
    defaultValue !== undefined && defaultValue !== null && defaultValue !== "";

  const [isIconHidden, setIsIconHidden] = useState(true);

  const toggleIconHidden = () => {
    setIsIconHidden(!isIconHidden);
  };

  return (
    <div className="pt-32 flex flex-col gap-4 relative">
      <label htmlFor={name} className=" text-mainWhite">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`border-b-2 w-[520px] bg-mainBlack p-4 focus:border-mainGreen`}
      />
      {type === "password" && (
        <div
          onClick={() => {
            toggleIconHidden();
            const inputElement = document.getElementById(name); //useref 참조하기
            if (type === "password") {
              const inputElement = document.getElementById(
                name
              ) as HTMLInputElement | null;
              if (inputElement) {
                inputElement.type = isIconHidden ? "text" : "password";
              }
            }
          }}
          className=" absolute right-10 top-76 text-gray-500"
        >
          {isIconHidden ? <CloseEye /> : <Eye />}
        </div>
      )}
      {hasValue && (
        <Message text={isValid ? passMessage : failMessage} isValid={isValid} />
      )}
    </div>
  );
}
