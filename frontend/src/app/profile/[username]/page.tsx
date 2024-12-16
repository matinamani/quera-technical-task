import { ProfileCard } from '@/components/profile'

type ProfilePageProps = {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params

  return (
    <div className='flex justify-center'>
      <ProfileCard username={username} />
    </div>
  )
}
