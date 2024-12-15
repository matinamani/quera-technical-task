'use client'

import { ProfileInfo } from './info'
import { Repositories } from './repos'

export type ProfileProps = {
  username: string
}

export const ProfileCard = ({ username }: ProfileProps) => {
  return (
    <div className='p-4 flex flex-col items-center min-w-[450px] mx-4 w-[1000px] border rounded-lg'>
      <ProfileInfo username={username} />
      <div className='w-full mt-4'>
        <Repositories username={username} />
      </div>
    </div>
  )
}
