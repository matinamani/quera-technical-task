import { Axios } from '.'

export const getUser = (username: string) => Axios.get(`/users/${username}`)

export const getUserRepos = (username: string) =>
  Axios.get(`/users/${username}/repos`)
