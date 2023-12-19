import { getPlaylistFromSpotify } from '@/api'
import { useQueries } from '@tanstack/react-query'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { BANNER_DATA } from '@/constants'
import { BannerItem } from '.'
import { ErrorComponent } from '..'
import { Spinner } from '@/assets'

export const Banner = () => {
  const queryResults = useQueries({
    queries: BANNER_DATA.map(query => {
      const [key, value] = Object.entries(query)[0]
      return {
        queryKey: [`${key}`, value],
        queryFn: () => getPlaylistFromSpotify(value),
        staleTime: 1000 * 60 * 60 * 24
      }
    })
  })

  const isLoading = queryResults.some(result => result.isLoading)
  const isError = queryResults.some(result => result.isError)

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <ErrorComponent />
  }

  return (
    <div className="mobile:px-23 desktop:px-60 relative">
      <Slider {...settings}>
        {queryResults.map((result, idx) => (
          <BannerItem
            key={idx}
            result={result}
          />
        ))}
      </Slider>
    </div>
  )
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true
}
