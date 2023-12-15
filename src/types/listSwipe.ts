import { RefObject } from 'react'

type MouseEventFunction<T = Element, E = MouseEvent> = (
  e: React.MouseEvent<T, E>
) => void

export interface ListSwipeProps {
  isDrag: boolean
  scrollRef: RefObject<HTMLUListElement>
  onDragStart: MouseEventFunction<HTMLUListElement>
  onDragMove: MouseEventFunction<HTMLUListElement>
  onDragEnd: MouseEventFunction<HTMLUListElement>
}
