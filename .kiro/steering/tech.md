# Tech Stack

## Framework & Core

- **Next.js 16** with App Router (React 19)
- **TypeScript 5** with strict mode enabled
- **React Server Components** (RSC enabled)

## Styling & UI

- **Tailwind CSS 4** with CSS variables and animations
- **Radix UI** primitives for accessible components
- **shadcn/ui** component library (New York style)
- **Lucide React** for icons
- **next-themes** for dark mode support
- **class-variance-authority** and **clsx** for conditional styling

## Forms & Validation

- **React Hook Form** for form management
- **Zod** for schema validation

## Build System

- **PostCSS** with Tailwind CSS plugin
- **Autoprefixer** for CSS compatibility
- TypeScript build errors ignored in production (`ignoreBuildErrors: true`)
- Image optimization disabled (`unoptimized: true`)

## Path Aliases

All imports use `@/` prefix:
- `@/components` → components directory
- `@/lib` → lib directory
- `@/hooks` → hooks directory
- `@/components/ui` → UI components

## Common Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000
pnpm install         # Install dependencies

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## API Integration

The app expects a POST endpoint at `/api/generate-alt-text`:
- Request: `{ "image": "base64-encoded-image-data" }`
- Response: `{ "altText": "Generated description" }`
