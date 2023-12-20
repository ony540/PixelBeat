import { useConfirmStore } from '@/zustand'
import { useCallback } from 'react'

export const useConfirm = () => {
  const { isShow, setIsShow, confirmType, setConfirmType } = useConfirmStore()

  const openConfirm = useCallback(
    (confirmType?: string) => {
      setIsShow(true)
      if (confirmType) setConfirmType(confirmType)
    },
    [setConfirmType, setIsShow]
  )

  const closeConfirm = useCallback(() => {
    setIsShow(false)
    setConfirmType('')
  }, [setIsShow])

  return {
    isShow,
    confirmType,
    openConfirm,
    closeConfirm
  }
}
