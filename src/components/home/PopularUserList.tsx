import { MenuIcon, Spinner } from '@/assets'
import { PopularUserBill } from '.'
import { useSwipe } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { getPopularBill } from '@/api'
import { TrackList } from '@/types'

export const PopularUserList = () => {
  const {
    isDrag,
    scrollRef,
    onDragStart: handleDragStart,
    onDragMove: handleDragMove,
    onDragEnd: handleDragEnd
  } = useSwipe()

  const { data, isLoading } = useQuery<TrackList[], Error>({
    queryKey: ['relatedBill'],
    queryFn: getPopularBill
  })

  if (isLoading) return <Spinner />

  return (
    <div className="px-20 desktop:px-60 mt-53 relative">
      <MenuIcon />
      <h1 className="absolute text-mainBlack top-4 left-70 desktop:top-5 desktop:left-130">
        인기 영수증
      </h1>
      <ul
        ref={scrollRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className="flex gap-x-4 overflow-x-auto mt-6 ml-1">
        {data!.map(item => (
          <PopularUserBill
            data={item}
            isDrag={isDrag}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  )
}
