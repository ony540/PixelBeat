import { ListSwipeProps } from '@/types'
import { useRef, useState } from 'react'

export const useSwipe = (): ListSwipeProps => {
  const scrollRef = useRef<HTMLUListElement>(null)
  const [isStart, setIsStart] = useState<boolean>(false)
  const [isDrag, setIsDrag] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)

  const onDragStart = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    e.preventDefault()
    setIsDrag(false)
    if (scrollRef.current) {
      setIsStart(true)
      setStartX(e.pageX + scrollRef.current.scrollLeft)
    }
  }

  const onDragMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (isStart && scrollRef.current) {
      setIsDrag(true)
      scrollRef.current.scrollLeft = startX - e.pageX
    }
  }

  const onDragEnd = () => {
    setIsStart(false)
  }

  return { isDrag, scrollRef, onDragStart, onDragMove, onDragEnd }
}
