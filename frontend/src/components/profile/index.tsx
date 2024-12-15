'use client'

import { useQuery } from '@tanstack/react-query'
import { ProfileInfo } from './info'
import { Repositories } from './repos'
import { GithubUserType } from '@/types'
import { Axios } from '@/services'
import { Notfound } from './404'

export type ProfileProps = {
  username: string
}

export const ProfileCard = ({ username }: ProfileProps) => {
  const { data: user, isLoading } = useQuery<GithubUserType>({
    queryKey: ['user', 'info', username],
    queryFn: () => Axios.get(`/users/${username}`).then((res) => res.data),
  })

  return (
    <div className='p-4 flex flex-col items-center min-w-[450px] mx-4 w-[1000px] border rounded-lg'>
      {user ? (
        <>
          <ProfileInfo user={user} isLoading={isLoading} />
          <div className='w-full mt-4'>
            <Repositories username={username} />
          </div>
        </>
      ) : (
        <Notfound />
      )}
    </div>
  )
}
