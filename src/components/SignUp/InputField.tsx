import { Eye, CloseEye } from "@/assets";
import { useState, useRef } from "react";

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

  const inputRef = useRef(null);

  const toggleIconHidden = () => {
    setIsIconHidden((prevIsIconHidden) => !prevIsIconHidden);
    const inputElement:any = inputRef.current;
    if (type === "password" && inputElement instanceof HTMLInputElement) {
      inputElement.type = isIconHidden ? "text" : "password";
    }
  };  

  return (
    <div className="pt-32 flex flex-col gap-4 relative">
      <label htmlFor={name} className="text-16 text-mainWhite">
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`border-b-2 w-[520px] bg-mainBlack p-4 focus:border-mainGreen text-16 inputText`}
      />
      {type === "password" && (
        <div
          onClick={toggleIconHidden}
          className="absolute right-10 top-66 text-gray-500"
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
