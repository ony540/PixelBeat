import { MenuIcon, Spinner } from '@/assets'
import { SimilarUserBill } from '.'
import { useSwipe } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { getRelatedBill } from '@/api'
import { TrackList } from '@/types'

export const SimilarUserList = () => {
  const {
    isDrag,
    scrollRef,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd
  } = useSwipe()

  const { data, isLoading } = useQuery<TrackList[], Error>({
    queryKey: ['relatedBill'],
    queryFn: getRelatedBill
  })

  if (isLoading) return <Spinner />

  return (
    <div className="mobile:px-20 desktop:px-60 mt-53 relative">
      <MenuIcon />
      <h1 className="absolute text-mainBlack mobile:top-4 left-70 desktop:top-5 desktop:left-130">
        나와 비슷한 모양의 친구
      </h1>
      <ul
        ref={scrollRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className="flex gap-x-4 overflow-x-auto mt-6">
        {data!.map(item => (
          <SimilarUserBill
            data={item}
            isDrag={isDrag}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  )
}
