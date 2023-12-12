import { MoreCircle } from '@/assets'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const MusicBillId = () => {
  const navigate = useNavigate()

  const goToListMain = () => {
    navigate('/mymusic/main')
  }
  const goToListBill = () => {
    navigate('/mymusic/bill')
  }

  return (
    <div className="flex flex-col justify-center">
      <div className=" mt-30 text-20 flex flex-row">
        <button
          className="musicList w-113 z-[2]"
          onClick={goToListMain}>
          재생목록
        </button>
        <button
          className="musicListGreen text-mainBlack w-113 z-[2]"
          onClick={goToListBill}>
          음악서랍
        </button>
        <button className="listMenu w-24 h-24 top-2 left-260 z-[1] relative bg-no-repeat"></button>
      </div>
      <div
        className="container border w-[520px] h-62 cursor-pointer hover:bg-[#313131]">
        <div className="flex pl-10 mb-19">
          <div className="flex text-18 mt-15">
            <div className="musicTitle truncate w-250">
              이규정의 플리플리플리플리
            </div>{' '}
            {/* 플레이리스트 이름 */}
          </div>
          <div className="moreCircle z-[1] relative top-20 left-208">
            <MoreCircle />
          </div>
        </div>
          <div className="container flex border-b border-x w-[520px] h-62 hover:bg-[#313131]">
            <div className="flex">
              <div className="album w-44 h-44 ml-9 mr-12 mt-8 bg-no-repeat"></div>
              {/* 앨범 사진 */}
              <div className="flex flex-col text-18 leading-15 mt-18">
                <div className="musicTitle truncate w-150">
                  9와 4분의 3 사이에서 널 기다려
                </div>
                {/* 노래 제목 */}
                <div className="text-14 text-start">New Jeans</div>
                {/* 가수 이름 */}
              </div>
            </div>
            <button className="more mt-15 w-24 h-24 left-250 top-3 bg-no-repeat relative"></button>
          </div>
      </div>
    </div>
  )
}
