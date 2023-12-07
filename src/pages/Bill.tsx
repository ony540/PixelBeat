import React, { useState, useEffect } from "react";
import {
  BillFoot,
  BillHead,
  Graph,
  DotLine,
  Clock,
  Barcord,
  PlayButton,
} from "@/img/index";
import { useNavigate } from "react-router-dom";

interface BillProps {}

export const Bill: React.FC<BillProps> = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("kr-ko", options).format(date);
  };

  const handleClick = () => {
    navigate("/");
  };

  const handleShareClick = () => {
    // Replace 'YOUR_SHARE_LINK' with the actual link you want to share
    const shareLink = 'YOUR_SHARE_LINK';

    navigator.clipboard.writeText(shareLink)
      .then(() => {
        alert("링크가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error('복사에 실패하였습니다.', err);
      });
  };
  {
    return (
      <div className=" fixed left-1/2 top-8 h-screen transform -translate-x-1/2 px-5">
        <BillHead />
        <div className="bg-white w-[354px] text-mainBlack text-center text-5xl flex flex-col justify-between">
          <div>
            PIXEL BEAT
          <div
            className="my-0 ml-[14%] w-260 mt-[-20px] mb-[-18px] bg-no-repeat bg-[51.5%_54%] bg-[length:156px]"
            style={{ backgroundImage: `url(${graphBgImg})` }}>
            {/* 데이터 내려주기 */}
            <BillGraph />
          </div>
          <div className="flex justify-between text-base mx-5">
            <div className="content-between flex items-center">
              #&nbsp;&nbsp;Song
            </div>
            <div className="mt-1">
              <Clock />
            </div>
          </div>
          <DotLine />
          <div className=" flex mx-5 text-sm justify-between my-3 hover:z-0">
            01 {/* 추천 순서 */}
            <div className="text-start text-[18px] h-7 w-[180px] leading-2 truncate">
                9와 4분의3 승강장에서 {/* 노래? 앨범? 제목 */}
              <div className="text-[12px] leading-3 text-start">
                NewJeans {/* 가수 이름 */}
              </div>
            </div>
            <button className="-z-50">
              <PlayButton />
            </button>
            3:00 {/* 노래 시간 */}
          </div>
          <div className=" flex mx-5 text-sm justify-between my-3 hover:z-0">
            01 {/* 추천 순서 */}
            <div className="text-start text-[18px] h-7 w-[180px] leading-2 truncate">
                9와 4분의3 승강장에서 {/* 노래? 앨범? 제목 */}
              <div className="text-[12px] leading-3 text-start">
                NewJeans {/* 가수 이름 */}
              </div>
            </div>
            <button className="-z-50">
              <PlayButton />
            </button>
            3:00 {/* 노래 시간 */}
          </div>
          <div className=" flex mx-5 text-sm justify-between my-3 hover:z-0">
            01 {/* 추천 순서 */}
            <div className="text-start text-[18px] h-7 w-[180px] leading-2 truncate">
                9와 4분의3 승강장에서 {/* 노래? 앨범? 제목 */}
              <div className="text-[12px] leading-3 text-start">
                NewJeans {/* 가수 이름 */}
              </div>
            </div>
            <button className="-z-50">
              <PlayButton />
            </button>
            3:00 {/* 노래 시간 */}
          </div>
          <div className=" flex mx-5 text-sm justify-between my-3 hover:z-0">
            01 {/* 추천 순서 */}
            <div className="text-start text-[18px] h-7 w-[180px] leading-2 truncate">
                Attention {/* 노래? 앨범? 제목 */}
              <div className="text-[12px] leading-3 text-start">
                NewJeans {/* 가수 이름 */}
              </div>
            </div>
            <button className="-z-50">
              <PlayButton />
            </button>
            3:00 {/* 노래 시간 */}
          </div>
          <DotLine />
          <div className="mx-5 my-3 text-sm flex justify-start">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm mx-5 flex justify-between">
            www.pixelBeat.com
            <div className="justify-end mb-3">provided by spotify</div>
          </div>
          <DotLine />
          <div className="my-5 mx-11">
            <Barcord />
          </div>
        </div>
        <BillFoot />
        <div className="flex flex-col items-center">
          <button
            onClick={handleClick}
            className="bg-mainGreen w-[356px] h-14 rounded-lg text-black mt-2"
          >
            다른 영수증 구경하기
          </button>
          <button onClick={handleShareClick} className="flex-none bg-mainYellow w-[356px] h-14 rounded-lg text-black mt-2">
            공유하기
          </button>
        </div>
      </div>
    );
  }
};
