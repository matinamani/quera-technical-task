'use client'

import { TooltipProvider as ShadcnTooltipProvider } from '@/components/ui/tooltip'
import { ReactNode } from 'react'

export const TooltipProvider = ({ children }: { children: ReactNode }) => (
  <ShadcnTooltipProvider>{children}</ShadcnTooltipProvider>
)
