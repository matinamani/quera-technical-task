'use client'

import { getUserRepos } from '@/services/users'
import { useQuery } from '@tanstack/react-query'

type ReposListType = {
  data: { id: number; name: string }[]
}

export default function Home() {
  const { data: repos } = useQuery<ReposListType>({
    queryKey: ['get', 'user', 'repos'],
    queryFn: () => getUserRepos('matinamani'),
  })

  console.log('====================================')
  console.log(repos)
  console.log('====================================')

  return (
    <h1 className='text-4xl'>
      Hello World
      {repos && (
        <ul>
          {repos.data.map((repo) => (
            <li className='text-sm ms-5' key={repo.id}>
              {repo.name}
            </li>
          ))}
        </ul>
      )}
    </h1>
  )
}
