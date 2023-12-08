import { getNonMemberToken } from "@/api";
import { StandardButton } from "@/components";
import { BUTTON_TEXT, RECEIPT_TEXT } from "@/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Entry = () => {
  const navigate = useNavigate();
  const moveToRecomend = () => {
    navigate("/recommend/genre");
  };

  useEffect(() => {
    const nonMember = async () => {
      const res: string = await getNonMemberToken();
      localStorage.setItem("non-member-token", res);
    };
    nonMember();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-6xl mt-24">{RECEIPT_TEXT.TITLE}</h1>
      <div className="fixed top-[55%] text-20">
        <StandardButton text={BUTTON_TEXT.ENTRY} onClick={moveToRecomend} />
      </div>
    </div>
  );
};
