import { useModalStore } from '@/zustand'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'

export const useModal = () => {
  const { isShow, setIsShow, modalType, setModalType } = useModalStore()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const openModal = useCallback(
    (modalType?: string) => {
      setIsShow(true)
      if (modalType) setModalType(modalType)
    },
    [setModalType, setIsShow]
  )

  const closeModal = useCallback(() => {
    setIsShow(false)
    setModalType('')
  }, [setIsShow])

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
    isShow,
    isVisible,
    modalType,
    setModalType,
    openModal,
    closeModal
  }
}
