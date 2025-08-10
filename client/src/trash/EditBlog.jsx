"use client"

import { useState } from "react"
import {Link} from "react-router-dom"
import { ArrowLeft, Upload, Eye, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"

// Mock data - in real app, fetch based on params.id
const existingPost = {
  id: 1,
  title: "Getting Started with Modern Web Development",
  content: `# Introduction

Modern web development has evolved significantly over the past few years. With the introduction of new frameworks, tools, and best practices, developers now have more powerful ways to build fast, scalable, and maintainable web applications.

## What You'll Learn

In this comprehensive guide, we'll cover:

- **React and Next.js fundamentals**
- **Tailwind CSS for styling**
- **TypeScript for type safety**
- **Best practices for performance**`,
  category: "development",
  tags: "react, nextjs, tailwind, typescript",
  excerpt: "Learn the fundamentals of modern web development with React, Next.js, and Tailwind CSS.",
  featured: false,
  allowComments: true,
}

export default function EditPostPage() {
  const [title, setTitle] = useState(existingPost.title)
  const [content, setContent] = useState(existingPost.content)
  const [category, setCategory] = useState(existingPost.category)
  const [tags, setTags] = useState(existingPost.tags)
  const [excerpt, setExcerpt] = useState(existingPost.excerpt)
  const [featured, setFeatured] = useState(existingPost.featured)
  const [allowComments, setAllowComments] = useState(existingPost.allowComments)
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isLoggedIn={true} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href={`/post/${existingPost.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Post
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setIsPreview(!isPreview)} className="hidden sm:flex">
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </Button>
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button className="bg-sky-600 hover:bg-sky-700">Update Post</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {!isPreview ? (
                  <div className="space-y-6">
                    {/* Title Input */}
                    <div>
                      <Label htmlFor="title" className="text-base font-medium">
                        Post Title
                      </Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter an engaging title for your post..."
                        className="mt-2 text-lg"
                      />
                    </div>

                    {/* Featured Image Upload */}
                    <div>
                      <Label className="text-base font-medium">Featured Image</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-sky-400 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 dark:text-gray-300">Click to upload new image or drag and drop</p>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>

                    {/* Content Editor */}
                    <div>
                      <Label htmlFor="content" className="text-base font-medium">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start writing your post content here..."
                        className="mt-2 min-h-[400px] resize-none"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Tip: Use Markdown for formatting (e.g., **bold**, *italic*, # heading)
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Preview Mode */
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <h1 className="text-3xl font-bold mb-6">{title || "Your Post Title"}</h1>
                    <div className="whitespace-pre-wrap">{content || "Your post content will appear here..."}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700"
                  >
                    <option value="">Select a category</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter tags separated by commas"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of your post..."
                    className="mt-1 h-20 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="comments"
                    checked={allowComments}
                    onChange={(e) => setAllowComments(e.target.checked)}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <Label htmlFor="comments">Allow Comments</Label>
                </div>

                <div>
                  <Label htmlFor="publish-date">Publish Date</Label>
                  <Input id="publish-date" type="datetime-local" className="mt-1" />
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input id="meta-title" placeholder="SEO title for search engines" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    placeholder="Brief description for search results"
                    className="mt-1 h-16 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Post History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Created</span>
                    <span>Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Last Modified</span>
                    <span>Jan 16, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Status</span>
                    <span className="text-green-600">Published</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Views</span>
                    <span>1,250</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
