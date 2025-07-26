import Link from 'next/link';
import { ArrowRight, Zap, Brain, BarChart3, Palette, Shield, Users } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LV</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">LinkVault</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-2 mb-8">
              <Zap className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-800">AI-Powered Bio Links</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn your{' '}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                link-in-bio
              </span>
              <br />
              into a conversion machine
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              LinkVault helps creators, freelancers, and solopreneurs create smart, branded landing pages 
              with AI-powered suggestions, beautiful themes, and click analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center">
                Start Building Your Link
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="#demo" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-8 py-4 text-lg font-medium flex items-center transition-colors">
                View Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              No credit card required • Get started in 2 minutes
            </p>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">@yourname</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">Content Creator & Coach</p>
                  <div className="space-y-3">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer text-gray-900 dark:text-white">
                      📺 My Latest YouTube Video
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer text-gray-900 dark:text-white">
                      📧 Join My Newsletter
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-3 hover:shadow-md transition-all cursor-pointer">
                      🚀 Book a 1:1 Call
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              LinkVault combines beautiful design with AI intelligence to help you create 
              the perfect bio link page that converts visitors into customers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">AI-Powered Suggestions</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Let ChatGPT recommend the best links, write catchy bios, and suggest high-converting call-to-action buttons.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Beautiful Themes</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Choose from multiple professionally designed themes or customize colors, fonts, and layouts to match your brand.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Click Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Track which links perform best with detailed analytics and insights to optimize your bio link strategy.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Secure & Fast</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Built with Firebase authentication and hosted on Vercel for lightning-fast loading and enterprise security.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Email Capture</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Collect visitor emails directly from your bio link page to grow your newsletter and customer list.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Easy Setup</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Get your professional bio link page live in minutes with our intuitive drag-and-drop builder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your bio link?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using LinkVault to turn their social media 
            traffic into real business results.
          </p>
          <Link href="/signup" className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="text-purple-100 text-sm mt-4">
            14-day free trial • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LV</span>
                </div>
                <span className="text-xl font-bold">LinkVault</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                AI-powered bio link generator for creators and entrepreneurs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="/help" className="hover:text-gray-900 dark:hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 LinkVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}