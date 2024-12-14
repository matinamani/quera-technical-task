import { env } from '@/config'
import axios from 'axios'

export const Axios = axios.create({
  baseURL: env.BASE_URL,
})
