'use client'

import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { useDebounce } from '@uidotdev/usehooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { DefaultError, useMutation } from '@tanstack/react-query'
import { searchUser } from '@/services'
import { GithubUserType } from '@/types'
import { UserItem, UserItemSkeleton } from './user-item'
import { useEffect } from 'react'

const searchFormSchema = z.object({
  username: z.string().min(5),
})
type SearchFormDTO = z.infer<typeof searchFormSchema>
type SearchResultDTO = {
  data: {
    items: GithubUserType[]
    total_count: number
  }
}

export function ProfileSearch() {
  const router = useRouter()
  const form = useForm<SearchFormDTO>({
    resolver: zodResolver(searchFormSchema),
    values: {
      username: '',
    },
  })

  const { username: usernameValue } = useWatch({ control: form.control })
  const debouncedUsername = useDebounce(usernameValue, 1000)

  const {
    data: searchResults,
    isPending,
    mutate,
  } = useMutation<SearchResultDTO, DefaultError, SearchFormDTO>({
    mutationKey: ['search', 'username'],
    mutationFn: (values: SearchFormDTO) => searchUser(values.username),
  })

  const handleUserClick = (username: string) =>
    router.push(`/profile/${username}`)

  useEffect(() => {
    const values = form.getValues()
    mutate({ ...values })
  }, [debouncedUsername, form, mutate])

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className='flex space-x-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field, fieldState }) => (
              <FormItem className='mb-2 flex w-full flex-col items-center'>
                <FormLabel>Enter a username to search...</FormLabel>
                <div className='flex w-full justify-between space-x-2 items-center'>
                  <FormControl className='w-[350px]'>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                </div>
                {fieldState.isTouched && field.value === '' && (
                  <p className='text-red-500 text-sm'>
                    Please enter a username
                  </p>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>

      <ul className='space-y-1 max-w-[350px]'>
        {isPending && usernameValue
          ? Array(5)
              .fill(null)
              .map((_, index) => (
                <li key={index}>
                  <UserItemSkeleton />
                </li>
              ))
          : searchResults &&
            searchResults.data.items.map((user) => (
              <li key={user.id}>
                <UserItem
                  user={user}
                  onClick={() => handleUserClick(user.login)}
                />
              </li>
            ))}
      </ul>
    </div>
  )
}
