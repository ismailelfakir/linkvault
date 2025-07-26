import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Scale, AlertTriangle, Crown } from 'lucide-react';

export default function TermsPage() {
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
                <p className="text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
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
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                By accessing and using LinkVault, you accept and agree to be bound by the terms 
                and provision of this agreement. Please read these Terms of Service carefully 
                before using our service.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                LinkVault is a bio link service that allows users to create customizable landing pages 
                with multiple links. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Free accounts with up to 5 links</li>
                <li>Pro accounts with unlimited links and premium features</li>
                <li>Analytics and click tracking</li>
                <li>Custom themes and branding options</li>
                <li>AI-powered link suggestions</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>User Accounts and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Creation</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per person or entity</li>
                  <li>You must be at least 13 years old to use our service</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Acceptable Use</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Use the service only for lawful purposes</li>
                  <li>Do not share harmful, offensive, or illegal content</li>
                  <li>Respect intellectual property rights</li>
                  <li>Do not attempt to circumvent service limitations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pro Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-600" />
                Pro Subscription Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Payment and Billing</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Pro subscription is a one-time payment of $9.99 USD</li>
                  <li>Payment processed securely through PayPal</li>
                  <li>Lifetime access to Pro features</li>
                  <li>No recurring charges or hidden fees</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Pro Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Unlimited links</li>
                  <li>Advanced analytics and insights</li>
                  <li>Premium themes and customization</li>
                  <li>Priority AI suggestions</li>
                  <li>Remove LinkVault branding</li>
                  <li>Priority customer support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Prohibited Content and Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The following content and activities are strictly prohibited:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Illegal activities or content</li>
                <li>Harassment, hate speech, or discrimination</li>
                <li>Spam, phishing, or malicious links</li>
                <li>Adult content or explicit material</li>
                <li>Copyright or trademark infringement</li>
                <li>Impersonation of others</li>
                <li>Malware, viruses, or harmful code</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="w-5 h-5 mr-2 text-purple-600" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                LinkVault provides the service "as is" without warranties of any kind. We are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Service interruptions or downtime</li>
                <li>Data loss or corruption</li>
                <li>Third-party content or links</li>
                <li>Indirect or consequential damages</li>
                <li>Loss of profits or business opportunities</li>
              </ul>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">By You</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You may delete your account at any time through your dashboard settings.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">By Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We may suspend or terminate accounts that violate these terms or engage in prohibited activities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Questions about these Terms of Service? Contact us:
              </p>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p>Email: legal@linkvault.com</p>
                <p>Support: support@linkvault.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}