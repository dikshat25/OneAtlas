import React from 'react'

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">OneAtlas Blog</h1>
      <p className="text-lg text-body max-w-2xl mb-12">Product updates, engineering deep dives, and stories about building the future of internal tools.</p>
      
      <div className="w-full h-64 border-2 border-dashed border-border rounded-2xl flex items-center justify-center bg-secondary">
        <p className="text-muted font-medium">No posts yet. Check back soon!</p>
      </div>
    </div>
  )
}
