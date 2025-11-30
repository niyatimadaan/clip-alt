# Alt Text Generator

A Next.js application that generates alternative text descriptions for images using AI. Simply paste an image and get accessibility-friendly alt text instantly.

## Features

- **Image Paste Support** - Paste images directly from clipboard
- **AI-Powered Alt Text** - Automatically generates descriptive alt text
- **Image Preview** - View your pasted images before processing
- **Download Options** - Download both images and generated alt text
- **Dark Mode** - Built-in theme support with next-themes
- **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, pnpm, or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-v0-project
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Navigate to the application in your browser
2. Paste an image into the designated area (Ctrl+V / Cmd+V)
3. Wait for the AI to generate alt text
4. Copy or download the generated alt text
5. Use the clear button to start over with a new image

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── header.tsx
│   ├── paste-area.tsx
│   ├── image-preview.tsx
│   ├── alt-text-output.tsx
│   └── action-buttons.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── public/             # Static assets
```

## API Routes

The application expects an API endpoint at `/api/generate-alt-text` that accepts:

**Request:**
```json
{
  "image": "base64-encoded-image-data"
}
```

**Response:**
```json
{
  "altText": "Generated alternative text description"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not licensed for public use.
