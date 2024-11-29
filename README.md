# OctaSwap Launchpad

A modern, decentralized launchpad platform built with Next.js and Web3 technologies. This platform enables users to participate in token launches and manage their investments in a secure and user-friendly environment.

## 🚀 Features

- Web3 Integration with RainbowKit and Wagmi
- Modern UI with Tailwind CSS and Radix UI components
- Responsive and animated interface
- Dark/Light theme support
- Form handling with React Hook Form and Zod validation
- Supabase integration for data management
- TypeScript support for enhanced development experience

## 🛠️ Tech Stack

- **Framework:** Next.js 15.0.3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:**
  - Radix UI primitives
  - Custom components with class-variance-authority
- **Web3:**
  - RainbowKit
  - Wagmi
  - Viem
- **State Management:** TanStack Query (React Query)
- **Database:** Supabase
- **Form Handling:** React Hook Form with Zod validation
- **Date Handling:** date-fns, dayjs
- **Development Tools:**
  - ESLint
  - PostCSS
  - TurboRepo

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.development.local` file with the necessary environment variables.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## 📁 Project Structure

- `/app` - Next.js application routes and layouts
- `/components` - Reusable UI components
- `/constants` - Application constants and configurations
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared logic
- `/contracts` - Smart contract related files
- `/config` - Configuration files
- `/assets` - Static assets
- `/public` - Public assets

## 🛠️ Available Scripts

- `npm run dev` - Run development server with Turbopack
- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

The project includes several configuration files:

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is private and proprietary.
