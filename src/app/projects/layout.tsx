// Projects section layout
export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Projects</h1>
        {children}
      </main>
    </div>
  )
} 