import { useNavigate } from 'react-router-dom'

export const MusicBill = () => {
  const navigate = useNavigate()
  const goToListMain = () => {
    navigate('/mymusic/playnow')
  }
  const goToListBillId = () => {
    navigate('/mymusic/bill/:billid')
  }

  return (
    <div className="flex flex-col">
      <div className="mx-20 mt-30 text-20 center flex flex-row">
        <button
          className="musicList w-113 z-[2]"
          onClick={goToListMain}>
          재생목록
        </button>
        <button className="musicListGreen text-mainBlack w-113 z-[2]">
          음악서랍
        </button>
        <button className="listMenu w-24 h-24 top-2 left-260 z-[1] relative bg-no-repeat"></button>
      </div>
      <div
        onClick={goToListBillId}
        className="cursor-pointer container border w-[520px] mx-20 h-62 hover:bg-[#313131]">
        <div className="flex">
          <div className="album w-44 h-44 ml-9 mr-15 mt-8 bg-no-repeat"></div>{' '}
          {/* 플리 사진 */}
          <div className="flex flex-row text-18 mt-15">
            <div className="musicTitle truncate w-300 mr-15">
              이규정의 플리플리플리플리플리플리플리 (2)
            </div>{' '}
            {/* 플레이리스트 이름 */}
            <div className="ml-15">(2)</div> {/* 음악 개수 표시 */}
          </div>
        </div>
      </div>
    </div>
  )
}
