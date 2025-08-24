'use client'

import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'

import { AuthProvider } from '@/providers/auth-provider'
import { QueryProvider } from '@/providers/query-provider'

type IProvidersProps = Readonly<{
  children: React.ReactNode
}>

export default function Providers({ children }: IProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      disableTransitionOnChange
    >
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            classNames: {
              title: '!font-semibold',
            },
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  )
}
