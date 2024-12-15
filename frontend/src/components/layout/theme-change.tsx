'use client'

import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'

export const ThemeChangeButton = () => {
  const { setTheme, theme } = useTheme()
  const handleThemeChange = () => setTheme(theme === 'light' ? 'dark' : 'light')
  return (
    <Button
      className='m-2'
      onClick={handleThemeChange}
      variant='outline'
      size='icon'
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </Button>
  )
}
