import { SignUpForm } from "@/components/SignUp";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const Login = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="my-56 text-center text-24">이메일로 회원가입</div>
      <SignUpForm/>
      <div className="flex justify-center py-10 text-14">
        <button className="pr-12">로그인</button>|
        <button onClick={Login} className="pl-12">이전으로 돌아가기</button>
      </div>
    </>
  );
};
