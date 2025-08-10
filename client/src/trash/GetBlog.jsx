// import Image from "next/image"
import {Link} from "react-router-dom"
import { ArrowLeft, Calendar, User, Edit, Trash2, Share2, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"

// Mock data - in real app, fetch based on params.id
const post = {
  id: 1,
  title: "Getting Started with Modern Web Development",
  content: `
# Introduction

Modern web development has evolved significantly over the past few years. With the introduction of new frameworks, tools, and best practices, developers now have more powerful ways to build fast, scalable, and maintainable web applications.

## What You'll Learn

In this comprehensive guide, we'll cover:

- **React and Next.js fundamentals**
- **Tailwind CSS for styling**
- **TypeScript for type safety**
- **Best practices for performance**

## Getting Started

First, let's set up our development environment. You'll need Node.js installed on your machine. Once you have that, you can create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Building Your First Component

React components are the building blocks of your application. Here's a simple example:

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

## Styling with Tailwind CSS

Tailwind CSS provides utility-first CSS classes that make styling fast and consistent:

\`\`\`jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  <h2 className="text-xl font-bold">Beautiful Card</h2>
  <p className="mt-2">This is styled with Tailwind CSS</p>
</div>
\`\`\`

## Conclusion

Modern web development offers incredible opportunities to build amazing user experiences. By mastering these tools and techniques, you'll be well-equipped to tackle any web development project.

Happy coding! 🚀
  `,
  author: "Sarah Johnson",
  date: "2024-01-15",
  image: "/placeholder.svg?height=400&width=800",
  category: "Development",
  readTime: "5 min read",
  views: 1250,
  likes: 89,
  comments: 23,
  isAuthor: true, // This would be determined by comparing current user with post author
}

export default function SinglePostPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isLoggedIn={true} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="secondary" className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {post.isAuthor && (
                    <div className="flex space-x-2">
                      <Link href={`/edit/${post.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-8">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap">{post.content}</div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between py-8 border-t border-gray-200 dark:border-gray-700 mt-8">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-sky-500 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </button>
                </div>

                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-sky-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{post.author}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Full-stack developer passionate about modern web technologies and clean code.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Post Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Post Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Views</span>
                    <span className="font-medium">{post.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Likes</span>
                    <span className="font-medium">{post.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Comments</span>
                    <span className="font-medium">{post.comments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Reading Time</span>
                    <span className="font-medium">{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Link key={i} href={`/post/${i + 1}`} className="block group">
                      <div className="flex space-x-3">
                        <img
                          src="/placeholder.svg?height=60&width=80"
                          alt="Related post"
                          width={80}
                          height={60}
                          className="w-20 h-15 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-sky-600 transition-colors line-clamp-2">
                            Related Post Title {i}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">2 min read</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
