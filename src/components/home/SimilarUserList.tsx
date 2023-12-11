import { MenuIcon } from '@/assets'
import { SimilarUser } from '.'

export const SimilarUserList = () => {
  return (
    <div className="px-20 mt-53 relative">
      <MenuIcon />
      <h1 className="absolute text-mainBlack top-3 left-70 desktop:top-15 desktop:left-100">
        나와 비슷한 모양의 친구
      </h1>
      <div className="flex gap-x-4 overflow-x-auto mt-6">
        <SimilarUser />
        <SimilarUser />
        <SimilarUser />
        <SimilarUser />
        <SimilarUser />
        <SimilarUser />
      </div>
    </div>
  )
}
