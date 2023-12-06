import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-w-[390px] max-w-[720px] m-0 mx-auto border-[5px] border-mainGreen">
      <Outlet />
    </div>
  );
};
