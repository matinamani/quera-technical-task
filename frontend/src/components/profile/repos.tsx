import { useQuery } from '@tanstack/react-query'
import { ProfileProps } from '.'
import { getRepos } from '@/services'
import { GithubRepoType } from '@/types'
import { ReposTable } from './repos-table'

export const Repositories = ({ username }: ProfileProps) => {
  const { data: repos } = useQuery<GithubRepoType[]>({
    queryKey: ['user', 'repos', username],
    queryFn: getRepos(username),
  })

  return (
    repos && (
      <>
        <h2 className='font-medium'>Repositories</h2>
        <ReposTable data={repos} />
      </>
    )
  )
}
