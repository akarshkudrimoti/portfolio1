import React from 'react'

export function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  )
} 