import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LinkVault - AI-Powered Smart Bio Link Generator',
  description: 'Turn your link-in-bio into a conversion machine with LinkVault. AI-powered suggestions, beautiful themes, and analytics.',
  keywords: 'bio link, link in bio, social media, creator tools, analytics, AI, linktree alternative',
  authors: [{ name: 'LinkVault Team' }],
  creator: 'LinkVault',
  publisher: 'LinkVault',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://linkvault.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LinkVault - AI-Powered Smart Bio Link Generator',
    description: 'Turn your link-in-bio into a conversion machine with AI-powered suggestions, beautiful themes, and analytics.',
    url: 'https://linkvault.com',
    siteName: 'LinkVault',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LinkVault - AI-Powered Bio Link Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkVault - AI-Powered Smart Bio Link Generator',
    description: 'Turn your link-in-bio into a conversion machine with AI-powered suggestions, beautiful themes, and analytics.',
    images: ['/og-image.png'],
    creator: '@linkvault',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}