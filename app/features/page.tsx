import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Brain, 
  Palette, 
  BarChart3, 
  Shield, 
  Zap, 
  Users,
  Crown,
  Globe,
  Smartphone,
  TrendingUp,
  Lock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      category: "AI-Powered Intelligence",
      icon: Brain,
      color: "from-purple-500 to-blue-500",
      features: [
        {
          name: "Smart Link Suggestions",
          description: "Get AI-powered recommendations for the most effective links based on your profile and industry.",
          isPro: false
        },
        {
          name: "Bio Writing Assistant",
          description: "Let AI craft compelling bio descriptions that convert visitors into followers and customers.",
          isPro: true
        },
        {
          name: "CTA Optimization",
          description: "Intelligent call-to-action button suggestions to maximize click-through rates.",
          isPro: true
        }
      ]
    },
    {
      category: "Beautiful Design",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      features: [
        {
          name: "Professional Themes",
          description: "Choose from 6 carefully crafted themes designed by professionals.",
          isPro: false
        },
        {
          name: "Premium Theme Collection",
          description: "Access 5 exclusive premium themes including Gradient, Neon, Ocean, and more.",
          isPro: true
        },
        {
          name: "Custom Branding",
          description: "Remove LinkVault branding and make your bio page truly yours.",
          isPro: true
        }
      ]
    },
    {
      category: "Advanced Analytics",
      icon: BarChart3,
      color: "from-green-500 to-teal-500",
      features: [
        {
          name: "Click Tracking",
          description: "Track every click with detailed timestamps and basic performance metrics.",
          isPro: false
        },
        {
          name: "Advanced Insights",
          description: "Get detailed analytics with CTR calculations, traffic sources, and performance trends.",
          isPro: true
        },
        {
          name: "Geographic Data",
          description: "See where your visitors are coming from with country and city-level data.",
          isPro: true
        }
      ]
    },
    {
      category: "Performance & Security",
      icon: Shield,
      color: "from-blue-500 to-indigo-500",
      features: [
        {
          name: "Lightning Fast",
          description: "Built with Next.js and optimized for speed. Your bio page loads in milliseconds.",
          isPro: false
        },
        {
          name: "Enterprise Security",
          description: "Firebase authentication and Firestore database with enterprise-grade security.",
          isPro: false
        },
        {
          name: "99.9% Uptime",
          description: "Hosted on Vercel with global CDN for maximum reliability and performance.",
          isPro: false
        }
      ]
    }
  ];

  const comparisonFeatures = [
    { feature: "Bio Links", free: "Up to 5", pro: "Unlimited" },
    { feature: "Themes", free: "1 Default", pro: "6 Premium Themes" },
    { feature: "Analytics", free: "Basic Clicks", pro: "Advanced Insights" },
    { feature: "AI Suggestions", free: "Limited", pro: "Unlimited" },
    { feature: "Custom Branding", free: "❌", pro: "✅" },
    { feature: "Priority Support", free: "❌", pro: "✅" },
    { feature: "Geographic Data", free: "❌", pro: "✅" },
    { feature: "CTR Analytics", free: "❌", pro: "✅" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Features</h1>
                <p className="text-gray-600 dark:text-gray-400">Everything you need to succeed</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LV</span>
              </div>
              <Button asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full px-4 py-2 mb-8">
            <Zap className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Powerful Features</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need to turn
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"> visitors into customers</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            LinkVault combines AI intelligence, beautiful design, and powerful analytics 
            to create the ultimate bio link experience for creators and businesses.
          </p>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {features.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div key={categoryIndex}>
                  <div className="text-center mb-12">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {category.category}
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {category.features.map((feature, featureIndex) => (
                      <Card key={featureIndex} className="relative overflow-hidden hover:shadow-lg transition-all duration-200">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{feature.name}</CardTitle>
                            {feature.isPro && (
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                <Crown className="w-3 h-3 mr-1" />
                                Pro
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </CardContent>
                        {feature.isPro && (
                          <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-yellow-400"></div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Free vs Pro Comparison
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what's included in each plan
            </p>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">Free</th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center justify-center">
                          <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                          Pro
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {comparisonFeatures.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {item.feature}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                          {item.free}
                        </td>
                        <td className="px-6 py-4 text-sm text-center">
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {item.pro}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to unlock all features?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start with our free plan and upgrade to Pro when you're ready for unlimited links, 
            premium themes, and advanced analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
              <Link href="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}