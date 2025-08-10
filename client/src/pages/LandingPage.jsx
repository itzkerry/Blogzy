import {Link} from "react-router-dom"
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const isLoggedIn = false // This would come from your auth state

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* <Navbar isLoggedIn={isLoggedIn} /> */}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Share Your Stories with <span className="text-sky-600">BlogZy</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A beautiful, modern blogging platform designed for writers who want to focus on what matters most -
                their content.
              </p>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up">
              <Link to="/auth/signup">
                  <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                    Start Writing Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
              </Link>
              <Link to="/blogs">
                <Button variant="outline" size="lg">
                  Explore Blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to blog
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Powerful features designed to help you create, share, and grow your audience.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900">
                    <BookOpen className="h-6 w-6 text-sky-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Rich Text Editor</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Write with a beautiful, intuitive editor that supports all the formatting you need.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900">
                    <Users className="h-6 w-6 text-sky-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Community Focused</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Connect with other writers and build your audience in our supportive community.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-900">
                    <Zap className="h-6 w-6 text-sky-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Built for speed with modern technology to ensure your readers never wait.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sky-600 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start your blogging journey?
            </h2>
            <p className="mt-4 text-lg text-sky-100">
              Join thousands of writers who trust SkyBlog to share their stories.
            </p>
            <div className="mt-8">
              <Link to='/auth/signup'>
                <Button size="lg" variant="secondary" className="bg-white text-sky-600 hover:bg-gray-100">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
