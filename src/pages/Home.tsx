import { getNonMemberToken } from '@/api'
import { Header, NavBar } from '@/components'
import { Banner, SimilarUserList, TopTrackList } from '@/components/home'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useEffect } from 'react'

export const Home = () => {
  const { isLoading } = useUserInfo()

  useEffect(() => {
    const nonMember = async () => {
      const res: string = await getNonMemberToken()
      localStorage.setItem('non-member-token', res)
    }
    nonMember()
  }, [])

  if (isLoading) return <>loading</>

  return (
    <div className="relative h-screen overflow-y-auto">
      <Header />
      <Banner />
      <SimilarUserList />
      <TopTrackList />
      <NavBar />
    </div>
  )
}
