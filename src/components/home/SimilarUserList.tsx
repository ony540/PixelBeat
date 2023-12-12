import { MenuIcon } from '@/assets'
import { SimilarUser } from '.'

export const SimilarUserList = () => {
  return (
    <div className="mobile:px-20 desktop:px-60 mt-53 relative">
      <MenuIcon />
      <h1 className="absolute text-mainBlack mobile:top-4 left-70 desktop:top-5 desktop:left-130">
        나와 비슷한 모양의 친구
      </h1>
      <div className="flex gap-x-4 overflow-x-auto mt-6">
        <SimilarUser />
        <SimilarUser />
        <SimilarUser />
        <SimilarUser />
        <SimilarUser />
      </div>
    </div>
  )
}
