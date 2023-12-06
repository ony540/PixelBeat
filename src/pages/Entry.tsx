import { BUTTON_TEXT, RECEIPT_TEXT } from "@/constants";
import { useNavigate } from "react-router-dom";

export const Entry = () => {
  const navigate = useNavigate();
  const moveToRecomend = () => {
    navigate("/recommend/genre");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-6xl mt-24">{RECEIPT_TEXT.TITLE}</h1>
      <div className="h-80" />
      <button
        className=" bg-mainGreen w-80 h-14 rounded-lg text-black"
        onClick={moveToRecomend}
      >
        {BUTTON_TEXT.ENTRY}
      </button>
    </div>
  );
};
