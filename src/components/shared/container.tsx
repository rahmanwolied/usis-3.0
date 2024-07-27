import React from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps {
  className?: string
  children: React.ReactNode
  props?: React.HTMLAttributes<HTMLDivElement>
}

const Container = ({ className, children, props }: ContainerProps) => {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </div>
  )
}

Container.displayName = 'Container'

export default Container
