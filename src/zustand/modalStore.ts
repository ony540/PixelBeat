import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Modal = {
  isShow: boolean
  modalType?: string
}

const initialStore: Modal = {
  modalType: '',
  isShow: false
}

type ModalStore = {
  isShow: boolean
  modalType: string
  setIsShow: (bool: boolean) => void
  setModalType: (modalType: string) => void
}

export const modalStore = set => ({
  ...initialStore,
  //show값 지정
  setIsShow: (bool: boolean) =>
    set(state => ({
      ...state,
      isShow: bool
    })),
  //modalType값 지정
  setModalType: (modalType: string) =>
    set(state => ({
      ...state,
      modalType: modalType
    }))
})

export const useModalStore = create(devtools(modalStore))
