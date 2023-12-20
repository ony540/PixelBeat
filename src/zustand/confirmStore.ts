import { create } from 'zustand'

type Confirm = {
  isShow: boolean
  confirmType?: string
}

const initialStore: Confirm = {
  confirmType: '',
  isShow: false
}

type ConfirmStore = Confirm & {
  setIsShow: (bool: boolean) => void
  setConfirmType: (confirmType: string) => void
}

export const confirmStore = set => ({
  ...initialStore,
  //show값 지정
  setIsShow: (bool: boolean) =>
    set(state => ({
      ...state,
      isShow: bool
    })),
  //confirmType값 지정
  setConfirmType: (confirmType: string) =>
    set(state => ({
      ...state,
      confirmType
    }))
})

export const useConfirmStore = create<ConfirmStore>(confirmStore)
