import { BillGraph, UserBillItem } from '.'
import { CircleAdd } from '@/assets'
import {
  formatDate,
  getAllTracksDuration,
  msToMinutesAndSeconds
} from '@/utils'
import barcodeImg from '@/assets/imgs/barcode.png'
import graphBgImg from '@/assets/imgs/graphBackground.png'
import { useNavigate } from 'react-router-dom'
import { ConfirmModal, HeartButton } from '..'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  LikeCountProps,
  LikeProps,
  SaveProps,
  addSavedTracklist,
  updateBillLikes,
  updateLikedTracklist
} from '@/api'
import { useUserStore } from '@/zustand'
import Portal from '@/utils/portal'
import { useConfirm } from '@/hooks'

export const BillBoxHasOwner = ({ data }) => {
  const navigate = useNavigate()
  const { name, owner, created_at, tracks, analysis, color, id, likes } = data
  const userInfo = useUserStore(state => state.userInfo)
  const [isHearted, setIsHearted] = useState(
    userInfo.liked_tracklist.includes(id)
  )
  const queryClient = useQueryClient()
  const { openConfirm, isShow, closeConfirm } = useConfirm()

  //좋아요
  const likeBillMutation = useMutation<any[], Error, LikeProps>({
    mutationFn: updateLikedTracklist,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  //좋아요 수 제어
  const likeCountBillMutation = useMutation<any[], Error, LikeCountProps>({
    mutationFn: updateBillLikes,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['bill', id, userInfo.id]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  //음악 서랍 저장
  const saveBillMutation = useMutation<any[], Error, SaveProps>({
    mutationFn: addSavedTracklist,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profiles from supabase', userInfo.id]
      })
      openConfirm('savePlayList')
    },
    onError(error) {
      console.log(error)
    }
  })

  //프로필안에 컴포넌트 확인 -> 로그인 유도 컴포넌트
  //좋아요 버튼 누르기
  const handleClickHeartButton = () => {
    if (!userInfo.id) {
      openConfirm('loginInduce')
      return
    }

    setIsHearted(prevIsHearted => !prevIsHearted)

    likeCountBillMutation.mutateAsync({
      prevLikes: likes,
      billId: id,
      isAdd: !isHearted
    })
    likeBillMutation.mutateAsync({
      prevLikedTracklist: userInfo.liked_tracklist,
      billId: id,
      userId: userInfo.id
    })
  }

  //음악서랍에 저장 버튼 누르기
  const handleClickAddtoMusicShelfButton = () => {
    if (!userInfo.id) {
      openConfirm('loginInduce')
      return
    }

    if (userInfo.saved_tracklist.includes(id)) {
      openConfirm('alreadyOwnPlaylist')
    } else {
      saveBillMutation.mutateAsync({
        prevSavedTracklist: userInfo.saved_tracklist,
        billId: id,
        userId: userInfo.id
      })
    }
  }

  const handleNavigateEntry = () => {
    closeConfirm()
    navigate('/entry')
  }

  const allTrackDuration = getAllTracksDuration({ tracks })
  const { minutes, seconds } = msToMinutesAndSeconds(allTrackDuration)

  return (
    <>
      <div className="bg-white w-354 text-mainBlack text-center mx-auto mt-[-24px] mb-50 bill-background-side">
        <h1 className="text-28 leading-[1.2] px-30 mb-16">{name}</h1>

        <div className="flex justify-between items-center mx-16 text-16 border-y-2 border-dashed border-mainBlack h-48 ">
          <div className="ml-12 text-14 text-left leading-[1.2]">
            <p className="truncate w-200 ">
              {tracks
                .slice(0, 2)
                .map(
                  (item, idx) => `${item.artists[0].name}${idx < 1 && ', '}`
                )}
              ...etc
            </p>
            <p>
              Made by{' '}
              <span
                className="hover:underline cursor-pointer"
                onClick={() => navigate(`/profile/${owner.userId}`)}>
                {owner.username}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <HeartButton
              onClick={handleClickHeartButton}
              isHearted={isHearted}
              propsClass="mr-12"
            />
            {!userInfo.own_tracklist.includes(id) && (
              <button
                type="button"
                className="mr-12"
                onClick={handleClickAddtoMusicShelfButton}>
                <CircleAdd />
              </button>
            )}
          </div>
        </div>

        {/*그래프  */}
        <div
          className="my-0 mx-auto w-270 mt-[-10px] mb-[-10px] bg-no-repeat bg-[55.6%_54%] bg-[length:136px]"
          style={{ backgroundImage: `url(${graphBgImg})` }}>
          <BillGraph
            analysisList={analysis}
            color={color}
          />
        </div>

        <div className="flex justify-between items-center mx-16 text-16 border-y-2 border-dashed border-mainBlack h-34 ">
          <span>
            <span className="ml-12 mr-26">#</span>
            Song
          </span>
          <span className="mr-12">
            {tracks.length}곡 •{` ${minutes}분 ${seconds}초`}
          </span>
        </div>

        <section className="data-section my-6">
          <ul>
            {tracks.map((track, idx) => (
              <UserBillItem
                key={track.id}
                trackNumber={idx}
                track={track}
              />
            ))}
          </ul>
        </section>

        <section className="bill-bottom-section">
          <div className=" mx-16 py-8 border-y-2 border-dashed border-mainBlack text-14">
            <time className="block w-full text-left">
              {formatDate(created_at)}
            </time>
            <div className="flex justify-between w-full">
              <p>www.pixelBeat.com</p>
              <p>provided by spotify</p>
            </div>
          </div>
        </section>
        <img
          src={barcodeImg}
          alt="바코드 이미지"
          className="mx-auto mt-24 mb-5"
        />
      </div>
      <Portal>
        {isShow && <ConfirmModal onConfirmClick={handleNavigateEntry} />}
      </Portal>
    </>
  )
}
