# Product Overview

Alt Text Generator is a Next.js web application that generates accessibility-friendly alternative text descriptions for images using AI. Users paste images directly from their clipboard, and the application automatically generates descriptive alt text that can be copied or downloaded.

## Core Features

- Direct image paste from clipboard (Ctrl+V / Cmd+V)
- AI-powered alt text generation via API endpoint
- Image preview and download capabilities
- Alt text copy and download functionality
- Dark mode theme support
- Responsive design for desktop and mobile

## User Flow

1. User pastes an image into the paste area
2. Image is sent to `/api/generate-alt-text` endpoint
3. Generated alt text is displayed
4. User can download image, copy/download alt text, or clear to start over
