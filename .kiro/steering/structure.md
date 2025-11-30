# Project Structure

## Directory Organization

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main page (client component)
│   └── globals.css        # Global styles and Tailwind directives
│
├── components/            # React components
│   ├── ui/               # Reusable UI primitives (shadcn/ui)
│   ├── header.tsx        # App header
│   ├── paste-area.tsx    # Image paste input area
│   ├── image-preview.tsx # Image display component
│   ├── alt-text-output.tsx # Alt text display
│   └── action-buttons.tsx # Clear/download actions
│
├── hooks/                # Custom React hooks
│   ├── use-mobile.ts     # Mobile detection hook
│   └── use-toast.ts      # Toast notification hook
│
├── lib/                  # Utility functions
│   └── utils.ts          # Helper utilities (cn, etc.)
│
├── public/               # Static assets
│   └── *.png, *.svg      # Icons and placeholder images
│
└── styles/               # Additional stylesheets
    └── globals.css       # Legacy global styles
```

## Component Architecture

- **Client Components**: Main page uses `"use client"` directive for interactivity
- **Server Components**: Default for layouts and static content
- **UI Components**: Located in `components/ui/`, built with Radix UI primitives
- **Feature Components**: Top-level components in `components/` directory

## File Naming Conventions

- Component files: `kebab-case.tsx` (e.g., `paste-area.tsx`)
- Hooks: `use-*.ts` prefix (e.g., `use-mobile.ts`)
- Utilities: `*.ts` in lib directory
- All React components use `.tsx` extension

## Import Patterns

Always use path aliases:
```typescript
import Component from "@/components/component-name"
import { utility } from "@/lib/utils"
import { useHook } from "@/hooks/use-hook"
```

## State Management

- Local component state with `useState`
- No global state management library
- Props drilling for component communication
