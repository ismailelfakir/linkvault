import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  Users, 
  CreditCard, 
  Settings, 
  BarChart3,
  Palette,
  Crown,
  ExternalLink
} from 'lucide-react';

export default function HelpPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      questions: [
        {
          q: "How do I create my first bio link?",
          a: "After signing up, go to your Dashboard → Links tab and click 'Add New Link'. Fill in the title, URL, and description, then click 'Add Link'."
        },
        {
          q: "How do I customize my profile?",
          a: "Go to Dashboard → Profile tab to update your display name, username, bio, and profile settings."
        },
        {
          q: "How do I share my bio link page?",
          a: "Your bio link page is available at linkvault.com/yourusername. You can share this URL on all your social media profiles."
        }
      ]
    },
    {
      title: "Pro Features",
      icon: Crown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
      questions: [
        {
          q: "What's included in LinkVault Pro?",
          a: "Pro includes unlimited links, advanced analytics, premium themes, AI suggestions, custom branding removal, and priority support."
        },
        {
          q: "How much does Pro cost?",
          a: "LinkVault Pro is a one-time payment of $9.99 USD for lifetime access to all premium features."
        },
        {
          q: "How do I upgrade to Pro?",
          a: "Go to Dashboard → Settings and click 'Upgrade to LinkVault Pro'. You can pay securely via PayPal."
        }
      ]
    },
    {
      title: "Analytics & Tracking",
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      questions: [
        {
          q: "How do I view my link analytics?",
          a: "Go to Dashboard → Analytics to see detailed click statistics, including total clicks, daily/weekly performance, and link-specific data."
        },
        {
          q: "What analytics are available for free users?",
          a: "Free users can see basic click counts and link performance. Pro users get advanced analytics with detailed insights and trends."
        },
        {
          q: "How accurate is the click tracking?",
          a: "Our click tracking is highly accurate and records every genuine click with metadata like timestamp, user agent, and referrer."
        }
      ]
    },
    {
      title: "Themes & Customization",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      questions: [
        {
          q: "How do I change my theme?",
          a: "Go to Dashboard → Settings → Theme Selection to choose from available themes. Premium themes require a Pro subscription."
        },
        {
          q: "Can I customize colors and fonts?",
          a: "Pro users can access premium themes with different color schemes and layouts. More customization options are coming soon."
        },
        {
          q: "Will my theme affect loading speed?",
          a: "All our themes are optimized for fast loading and work perfectly on mobile and desktop devices."
        }
      ]
    },
    {
      title: "Billing & Payments",
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept payments via PayPal, which supports credit cards, debit cards, and PayPal balance worldwide."
        },
        {
          q: "Is there a refund policy?",
          a: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied, contact support for a full refund."
        },
        {
          q: "Do you offer discounts or promotions?",
          a: "We occasionally offer promotions. Follow us on social media or subscribe to our newsletter for updates."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-100 dark:bg-gray-900/20",
      questions: [
        {
          q: "My links aren't working properly",
          a: "Make sure your URLs include 'https://' or 'http://'. If issues persist, contact support with specific details."
        },
        {
          q: "I can't access my dashboard",
          a: "Try clearing your browser cache and cookies. If you're still having issues, reset your password or contact support."
        },
        {
          q: "How do I delete my account?",
          a: "Go to Dashboard → Settings and scroll down to find the account deletion option. This action is permanent and cannot be undone."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
                <p className="text-gray-600 dark:text-gray-400">Find answers to common questions</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LV</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search for help articles..." 
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Getting Started Guide</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  New to LinkVault? Learn the basics in 5 minutes.
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pro Features</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Learn about premium features and how to upgrade.
                </p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Can't find what you're looking for? We're here to help.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Get Help
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {faqCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className={`w-8 h-8 ${category.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                          <IconComponent className={`w-4 h-4 ${category.color}`} />
                        </div>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <div key={faqIndex} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            {faq.q}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Still Need Help */}
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-purple-100 mb-6">
                Our support team is here to help you succeed with LinkVault. 
                Get personalized assistance with your account and questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Email us directly
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}