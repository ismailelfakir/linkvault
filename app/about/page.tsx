import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Target, Zap, Heart, Globe, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">About LinkVault</h1>
                <p className="text-gray-600 dark:text-gray-400">Empowering creators with smart bio links</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LV</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Mission */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                LinkVault was created to help content creators, freelancers, and entrepreneurs 
                turn their social media traffic into real business results. We believe that 
                your link-in-bio should be more than just a list of links – it should be a 
                powerful conversion tool that grows with your brand.
              </p>
            </CardContent>
          </Card>

          {/* What Makes Us Different */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                What Makes Us Different
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">AI-Powered Intelligence</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get smart link suggestions powered by ChatGPT to optimize your bio for maximum conversions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Advanced Analytics</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track every click with detailed analytics to understand what content drives engagement.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Beautiful Design</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Choose from premium themes or customize your own to match your brand perfectly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Global Accessibility</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fast, secure, and accessible worldwide with support for multiple payment methods.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Story */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                LinkVault was born from the frustration of seeing talented creators struggle to 
                monetize their social media presence. Traditional bio link tools were either too 
                basic or too expensive, and none offered the intelligence needed to truly optimize 
                for conversions.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400">
                We set out to build something different – a platform that combines beautiful design 
                with AI-powered insights, making it easy for anyone to create a professional bio 
                link that actually converts visitors into customers.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400">
                Today, LinkVault serves thousands of creators worldwide, from Instagram influencers 
                to freelance photographers, helping them turn their social media traffic into 
                real business results.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card>
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Creator-First</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Every feature is designed with creators in mind, focusing on what actually drives results.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We leverage cutting-edge AI and technology to give you a competitive advantage.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Accessibility</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Professional tools shouldn't be expensive. We make powerful features affordable for everyone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Bio Link?</h2>
              <p className="text-purple-100 mb-6">
                Join thousands of creators who are already using LinkVault to turn their 
                social media traffic into real business results.
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}