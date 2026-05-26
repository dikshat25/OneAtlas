export const dynamic = 'force-dynamic';
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import prisma from '@/lib/prisma'

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">OneAtlas Blog</h1>
      <p className="text-lg text-body max-w-2xl mb-12">Product updates, engineering deep dives, and stories about building the future of internal tools.</p>
      
      {posts.length > 0 ? (
        <div className="grid gap-8 w-full text-left">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group p-8 rounded-2xl border border-border hover:border-primary transition-colors bg-secondary">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted mb-4 font-medium">
                <span className="text-primary">{post.category}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <p className="text-body mb-4">{post.excerpt}</p>
              <div className="flex items-center text-primary font-medium">
                Read more <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full h-64 border-2 border-dashed border-border rounded-2xl flex items-center justify-center bg-secondary">
          <p className="text-muted font-medium">No posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
