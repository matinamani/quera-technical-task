import { ProfileCard } from '@/components/profile'

type ProfilePageParams = {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageParams) {
  const { username } = await params

  return (
    <div className='flex justify-center'>
      <ProfileCard username={username} />
    </div>
  )
}
