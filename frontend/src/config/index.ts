import 'dotenv/config'

export const env = Object.freeze({
  BASE_URL: process.env.BASE_URL || 'https://api.github.com/',
})
