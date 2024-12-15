import { env } from '@/config'
import axios from 'axios'

export const Axios = axios.create({
  baseURL: env.BASE_URL,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

export const getUser = (username: string) => () =>
  Axios.get(`/users/${username}`).then((res) => res.data)

export const searchUser = (username: string) =>
  Axios.get('/search/users', {
    params: {
      per_page: 12,
      page: 1,
      q: username,
    },
  })

export const getRepos = (username: string) => () =>
  Axios.get(`/users/${username}/repos`).then((res) => res.data)
