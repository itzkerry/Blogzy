// import Image from "next/image"
import {Link} from "react-router-dom"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"

// Mock data - replace with actual data fetching
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development",
    excerpt:
      "Learn the fundamentals of modern web development with React, Next.js, and Tailwind CSS. This comprehensive guide will take you through everything you need to know.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "Development",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Art of Minimalist Design",
    excerpt:
      "Discover how minimalist design principles can improve user experience and create more impactful digital products.",
    author: "Mike Chen",
    date: "2024-01-12",
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Building Scalable Applications",
    excerpt:
      "Best practices for building applications that can grow with your business needs and handle increasing user loads.",
    author: "Emily Davis",
    date: "2024-01-10",
    image: "/placeholder.svg?height=200&width=400",
    category: "Architecture",
    readTime: "8 min read",
  },
  {
    id: 4,
    title: "The Future of AI in Web Development",
    excerpt:
      "Exploring how artificial intelligence is transforming the way we build and interact with web applications.",
    author: "David Wilson",
    date: "2024-01-08",
    image: "/placeholder.svg?height=200&width=400",
    category: "AI",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Responsive Design Best Practices",
    excerpt:
      "Master the art of creating websites that look great on all devices with these proven responsive design techniques.",
    author: "Lisa Anderson",
    date: "2024-01-05",
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Performance Optimization Strategies",
    excerpt:
      "Learn how to make your web applications lightning fast with these performance optimization techniques and tools.",
    author: "James Brown",
    date: "2024-01-03",
    image: "/placeholder.svg?height=200&width=400",
    category: "Performance",
    readTime: "7 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest Blog Posts</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community of writers
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                  <Link
                    href={`/post/${post.id}`}
                    className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium text-sm group-hover:translate-x-1 transition-transform"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  )
}
