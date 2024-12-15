'use client'

import { GithubUserType } from '@/types'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Loader2, SquareArrowOutUpRightIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type ProfileInfoProps = {
  user: GithubUserType
  isLoading: boolean
}

export const ProfileInfo = ({ user, isLoading }: ProfileInfoProps) => {
  return isLoading ? (
    <Loader2 className='animate-spin' />
  ) : (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className='cursor-pointer w-[16rem] h-[16rem]'>
            <AvatarImage src={user.avatar_url} alt={user.login} />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className='bg-background text-foreground border'>
          {user.bio}
        </TooltipContent>
      </Tooltip>
      <div className='mt-2 w-full'>
        <h3 className='text-center text-4xl mb-2'>{user.name}</h3>
        <div className='flex space-x-2'>
          <h4>Followers: {user.followers}</h4>
          <h4>Following: {user.following}</h4>
        </div>
        <a className='hover:underline' href={user.html_url} target='_blank'>
          {user.login}
          <SquareArrowOutUpRightIcon className='inline w-4 align-middle ms-1' />
        </a>
        {user.location !== '' && <h4>Location: {user.location}</h4>}
        {user.blog !== '' && (
          <a className='hover:underline' href={user.blog} target='_blank'>
            {user.blog}
            <SquareArrowOutUpRightIcon className='inline w-4 align-middle ms-1' />
          </a>
        )}
      </div>
    </>
  )
}
