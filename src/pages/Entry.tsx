import { BUTTON_TEXT, RECEIPT_TEXT } from "@/constants";

export const Entry = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-6xl mt-24">{RECEIPT_TEXT.TITLE}</h1>
      <div className=" w-80 h-96 bg-mainYellow text-black"> setting</div>
      <button className=" bg-mainGreen w-80 h-14 rounded-lg text-black">
        {BUTTON_TEXT.ENTRY}
      </button>
    </div>
  );
};