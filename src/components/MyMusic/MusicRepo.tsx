import { MoreCircle } from '@/assets';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MusicRepo = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(180); // 초기값 0으로 설정

  const rotateMoreCircle = () => {
    // 현재의 회전 각도에 180을 더하거나 빼서 토글합니다.
    setRotation(prevRotation => prevRotation + 180);
  };

  const goToPlaylist = () => {
    navigate('/mymusic');
  };

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleMoreButtonClick = (e) => {
    e.stopPropagation();
    setShowMoreInfo((prevShowMoreInfo) => !prevShowMoreInfo);
    rotateMoreCircle(); // 클릭할 때마다 회전 각도를 변경합니다.
  };

  return (
    <div className="flex flex-col">
      <div className="mx-20 mt-30 text-20 center flex flex-row">
        <button className="musicList w-113 z-[2]" onClick={goToPlaylist}>
          재생목록
        </button>
        <button className="musicListGreen text-mainBlack w-113 z-[2]">음악서랍</button>
        <button className="listMenu w-24 h-24 top-2 left-260 z-[1] relative bg-no-repeat"></button>
      </div>
      <div className="container border w-[520px] mx-20 h-62 hover:bg-[#313131]">
        <div className="flex">
          <div className="album w-44 h-44 ml-9 mr-12 mt-8 bg-no-repeat"></div> {/* 플리 사진 */}
          <div className="flex text-18 mt-15">
            <div className="truncate">이규정의 플리플리 (2)</div> {/* 플레이리스트 이름 */}
          </div>
          <button
            className="moreCircle h-44 z-[1] relative top-8 left-235"
            onClick={handleMoreButtonClick}
            style={{ transform: `rotate(${rotation}deg)` }}
          ><MoreCircle /></button> {/*  */}
        </div>
        {showMoreInfo && (
          <div className="container border w-[520px] mt-9 h-62 hover:bg-[#313131]">
            <div className="flex">
              <div className="album w-44 h-44 ml-9 mr-12 mt-8 bg-no-repeat"></div> {/* 앨범 사진 */}
              <div className="flex flex-col text-18 leading-15 mt-18">
                <div>Attention</div> {/* 노래 제목 */}
                <div className="text-14 text-end">New Jeans</div> {/* 가수 이름 */}
              </div>
              <button className="more mt-15 w-24 h-24 left-330 top-3 bg-no-repeat relative"></button> {/*  */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
