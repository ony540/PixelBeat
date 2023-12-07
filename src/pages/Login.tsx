import { EmailBtn, LoginBtn, SpotifyHover } from "@/assets";
import React, { useState } from "react";

export const Login = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="text-center pt-100 pb-[320px] text-56">Pixel Beat</div>
      <div className="flex justify-center h-110 items-center py-10">
        <div
          className="relative items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && <SpotifyHover />}
          <button className=" relative z-10">
            <LoginBtn />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center pb-10">
        <button>
          <EmailBtn />
        </button>
      </div>
      <div className="flex justify-center pb-10">
        <button className="pr-12">이메일로 회원가입</button>|
        <button className="pl-12">문의하기</button>
      </div>
    </>
  );
};
