import { GithubUserType } from '@/types'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'

export const UserItemSkeleton = () => (
  <div className='border rounded-lg px-4 p-2 flex items-center space-x-4'>
    <Skeleton className='h-10 w-10 rounded-full' />
    <Skeleton className='h-4 w-[150px]' />
  </div>
)

export const UserItem = ({
  user,
  onClick,
}: {
  user: GithubUserType
  onClick: () => void
}) => (
  <div
    onClick={onClick}
    className='border rounded-lg cursor-pointer dark:hover:bg-slate-900 hover:bg-slate-100 px-4 p-2 flex items-center space-x-4'
  >
    <Avatar>
      <AvatarImage src={user.avatar_url} />
    </Avatar>
    <h3 className='text-3xl font-light'>{user.login}</h3>
  </div>
)
