import { useModalPlayStore } from '@/zustand'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'

export const useModal = () => {
  const { isShow, setIsShow, modalType, setModalType } = useModalPlayStore()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const openModal = useCallback(
    (modalType: string) => {
      setIsShow(true)
      setModalType(modalType)
    },
    [setModalType, setIsShow]
  )

  const closeModal = useCallback(() => setIsShow(false), [setIsShow])

  useEffect(() => {
    let modalTimer

    if (isShow) {
      setIsVisible(true)
    } else {
      modalTimer = setTimeout(() => setIsVisible(false), 250)
    } // 0.25초뒤에 없어짐

    return () => {
      if (modalTimer !== undefined) {
        clearTimeout(modalTimer)
      }
    }
  }, [isShow])

  return {
    modalType,
    isVisible,
    openModal,
    closeModal,
    isShow
  }
}
