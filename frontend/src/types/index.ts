export type GithubUserType = {
  id: number
  login: string
  avatar_url: string
  name: string
  email: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  html_url: string
  location: string
  blog: string
}

export type GithubRepoType = {
  id: number
  name: string
  description: string
  html_url: string
  created_at: string
  updated_at: string
}
