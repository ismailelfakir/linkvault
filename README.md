# LinkVault - AI-Powered Smart Bio Link Generator

![LinkVault Logo](https://via.placeholder.com/800x200/6366f1/ffffff?text=LinkVault+-+AI-Powered+Bio+Links)

## 🚀 Overview

LinkVault is a modern, AI-powered bio link generator designed for creators, freelancers, and solopreneurs. Transform your social media traffic into real business results with intelligent link management, beautiful themes, and comprehensive analytics.

## ✨ Features

### 🧠 AI-Powered Intelligence
- **Smart Suggestions**: ChatGPT-powered recommendations for optimal link placement
- **Bio Writing**: AI-generated compelling bio descriptions
- **CTA Optimization**: Intelligent call-to-action button suggestions

### 🎨 Beautiful Design
- **Professional Themes**: Multiple carefully crafted design templates
- **Custom Branding**: Full color, font, and layout customization
- **Dark/Light Mode**: Seamless theme switching with user preference persistence
- **Responsive Design**: Perfect on all devices from mobile to desktop

### 📊 Analytics & Insights
- **Click Tracking**: Detailed analytics for each link
- **Performance Metrics**: Understand which content drives engagement
- **Visitor Insights**: Track traffic sources and user behavior

### 🔒 Enterprise Features
- **Firebase Authentication**: Secure user management
- **Email Capture**: Built-in newsletter signup functionality
- **Fast Loading**: Optimized for speed with Vercel hosting
- **SEO Optimized**: Built-in meta tags and social sharing

## 🛠 Tech Stack

### Frontend
- **Next.js 13.5.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management system
- **Framer Motion** - Smooth animations (planned)

### Backend (Planned)
- **Firebase** - Authentication and database
- **Vercel** - Hosting and serverless functions
- **OpenAI API** - AI-powered features

## 📁 Project Structure

```
linkvault/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx   # Dark/light mode toggle
├── lib/                   # Utility functions
│   └── utils.ts          # Common utilities (cn function)
├── public/               # Static assets
├── .bolt/               # Bolt.new configuration
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/linkvault.git
   cd linkvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration (when implemented)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# OpenAI API (for AI features)
OPENAI_API_KEY=your_openai_api_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🎨 Theme System

LinkVault features a sophisticated theme system with:

- **CSS Variables**: Dynamic color switching
- **System Detection**: Respects user's OS preference
- **Persistence**: Remembers theme choice across sessions
- **Smooth Transitions**: Animated theme switching

### Theme Toggle Usage
```tsx
import { ThemeToggle } from '@/components/theme-toggle'

// Use anywhere in your components
<ThemeToggle />
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Run TypeScript compiler
```

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom color palette with CSS variables
- Dark mode support
- Extended animations
- shadcn/ui integration

### Next.js
Configured for:
- Static export capability
- Image optimization
- TypeScript support
- ESLint integration

## 🚧 Development Roadmap

### Phase 1: Foundation ✅
- [x] Landing page design
- [x] Theme system implementation
- [x] Component library setup
- [x] Responsive design

### Phase 2: Authentication (In Progress)
- [ ] Firebase setup
- [ ] Sign up/Login pages
- [ ] User dashboard
- [ ] Profile management

### Phase 3: Core Features
- [ ] Bio link builder
- [ ] Theme customization
- [ ] Link management
- [ ] Analytics dashboard

### Phase 4: AI Integration
- [ ] OpenAI API integration
- [ ] Smart suggestions
- [ ] Content optimization
- [ ] Performance insights

### Phase 5: Advanced Features
- [ ] Email capture
- [ ] Custom domains
- [ ] Team collaboration
- [ ] API access

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component modularity
- Write descriptive commit messages
- Test on multiple devices/browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

- 📧 Email: support@linkvault.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/linkvault/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/linkvault/discussions)

## 🌟 Show Your Support

If you find LinkVault helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

**Built with ❤️ by the LinkVault Team**