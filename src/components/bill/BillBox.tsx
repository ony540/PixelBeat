import { UserBillItem } from '.'
import { CircleAdd, StandardVertex } from '@/assets'
import {
  formatDate,
  getAllTracksDuration,
  msToMinutesAndSeconds
} from '@/utils'
import defaultAlbumImg from '@/assets/imgs/default_album_artist.png'
import barcodeImg from '@/assets/imgs/barcode.png'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addSavedTracklist } from '@/api'
import { useUserStore } from '@/zustand'
import { useNavigate } from 'react-router-dom'
import Portal from '@/utils/portal'
import { ConfirmModal } from '..'
import { useConfirm } from '@/hooks'

export const BillBox = ({ data }) => {
  const navigate = useNavigate()
  const { name, owner, images, tracks, id } = data
  const userInfo = useUserStore(state => state.userInfo)
  const queryClient = useQueryClient()
  const { openConfirm, isShow, confirmType, closeConfirm } = useConfirm()

  //음악 서랍 저장
  const saveBillMutation = useMutation({
    mutationFn: addSavedTracklist,
    onSuccess() {
      closeConfirm()
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  //음악서랍에 저장
  const handleClickAddtoMusicShelfButton = () => {
    if (!userInfo.id) {
      openConfirm('loginInduce')
      return
    }
    openConfirm('addOwnPlaylist')
  }

  const handleSaveBill = () => {
    saveBillMutation.mutateAsync({
      prevSavedTracklist: userInfo.saved_tracklist,
      billId: id,
      userId: userInfo.id
    })
  }
  const handleNavigateEntry = () => {
    closeConfirm()
    navigate('/entry')
  }

  const allTrackDuration = getAllTracksDuration({
    tracks: tracks.items,
    isPlaylist: true
  })
  const { minutes, seconds } = msToMinutesAndSeconds(allTrackDuration)

  return (
    <div className="bg-white w-354 text-mainBlack text-center mx-auto mt-[-24px] mb-50 bill-background-side">
      <h1 className="text-28 leading-[1.2] px-30 mb-16">{name}</h1>

      <div className="flex justify-between items-center mx-16 text-16 border-y-2 border-dashed border-mainBlack h-48 ">
        <div className="ml-12 text-14 text-left leading-none">
          <p>
            {tracks.items
              .slice(0, 2)
              .map(
                (item, idx) => `${item.track.artists[0].name}${idx < 1 && ', '}`
              )}
            ...etc
          </p>
          <p>Made by {owner.display_name}</p>
        </div>
        <button
          type="button"
          className="mr-12"
          onClick={handleClickAddtoMusicShelfButton}>
          <CircleAdd />
        </button>
      </div>

      {/* 플리 이미지  */}
      <div className="my-20 mx-auto w-180 relative">
        <img
          loading="lazy"
          src={images[0] ? images[0].url : defaultAlbumImg}
          alt={`${name}.img`}
        />
        <StandardVertex
          fillColor="white"
          propsClass="absolute top-0"
        />
      </div>

      <div className="flex justify-between items-center mx-16 text-16 border-y-2 border-dashed border-mainBlack h-34 ">
        <span>
          <span className="ml-12 mr-26">#</span>
          Song
        </span>
        <span className="mr-12">
          {tracks.total}곡 •{` ${minutes}분 ${seconds}초`}
        </span>
      </div>

      <section className="data-section my-6">
        <ul>
          {tracks.items.map((item, idx) => (
            <UserBillItem
              key={item.track.id}
              trackNumber={idx}
              track={item.track}
            />
          ))}
        </ul>
      </section>

      <section className="bill-bottom-section">
        <div className=" mx-16 py-8 border-y-2 border-dashed border-mainBlack text-14">
          <time className="block w-full text-left">
            {formatDate(tracks.items[0].added_at)}
          </time>
          <div className="flex justify-between w-full">
            <p>www.pixelBeat.com</p>
            <p>provided by spotify</p>
          </div>
        </div>
      </section>
      <img
        loading="lazy"
        src={barcodeImg}
        alt="바코드 이미지"
        className="mx-auto mt-24 mb-5"
      />
      <Portal>
        {isShow && (
          <ConfirmModal
            onConfirmClick={
              confirmType === 'loginInduce'
                ? handleNavigateEntry
                : handleSaveBill
            }
          />
        )}
      </Portal>
    </div>
  )
}
