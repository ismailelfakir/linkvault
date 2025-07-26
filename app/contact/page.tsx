import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, MessageSquare, HelpCircle, Zap } from 'lucide-react';

export default function ContactPage() {
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
                <p className="text-gray-600 dark:text-gray-400">We'd love to hear from you</p>
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
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your question or feedback..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-green-600" />
                  Quick Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">General Support</h3>
                  <p className="text-gray-600 dark:text-gray-400">support@linkvault.com</p>
                  <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Business Inquiries</h3>
                  <p className="text-gray-600 dark:text-gray-400">business@linkvault.com</p>
                  <p className="text-sm text-gray-500">Partnerships and enterprise solutions</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Technical Issues</h3>
                  <p className="text-gray-600 dark:text-gray-400">tech@linkvault.com</p>
                  <p className="text-sm text-gray-500">Bug reports and technical support</p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-purple-600" />
                  Common Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">How do I upgrade to Pro?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Go to your Dashboard → Settings and click "Upgrade to Pro" to pay via PayPal.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Can I change my username?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Yes! Update your username anytime in Dashboard → Profile settings.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Is there a refund policy?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We offer a 30-day money-back guarantee for Pro subscriptions.
                  </p>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/help">
                    View Full FAQ
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Feature Request */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                  Feature Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Have an idea for a new feature? We'd love to hear it! Send us your suggestions 
                  and help shape the future of LinkVault.
                </p>
                <Button variant="outline" className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Submit Feature Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}