import { MenuIcon } from '@/assets'
import { useNavigate } from 'react-router-dom'

export const SearchResultTrackItem = ({ tracks }: { tracks?: any }) => {
  const navigate = useNavigate()

  const moveToTrackId = (trackId: string) => {
    navigate(`/artist/${trackId}`)
  }

  if (!tracks || tracks.items.length === 0) {
    return (
      <div className="relative mobile:mt-22 desktop:mt-50">
        <MenuIcon />
        <h1 className="absolute text-mainBlack top-3 mobile:left-50 desktop:top-15 desktop:left-100">
          음악
        </h1>
        <h1>No Item</h1>
      </div>
    )
  }
  return (
    <>
      <MenuIcon />
      <h1 className="absolute text-mainBlack mobile:top-4 left-40 desktop:top-5 desktop:left-80">
        음악
      </h1>
      <div className="relative desktop:px-3 mobile:px-1">
        {tracks &&
          tracks.items.slice(0, 4).map(item => (
            <div
              className="relative"
              key={item.id}>
              <div className="border-1 my-4 flex items-center gap-10 ">
                <img
                  onClick={() => navigate(`/album/${item.album.id}`)}
                  className="mobile:w-50 mobile:h-51 mr-4 desktop:w-65 desktop:h-66 cursor-pointer"
                  src={item.album.images[1].url}
                  alt={`${item.name}.img`}
                />
                <div className="flex flex-col">
                  {/* track, artist 순 */}
                  <span>{item.name}</span>
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => moveToTrackId(item.artists[0].id)}>
                    {item.artists[0].name}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
