# OG Image Generator

A production-ready Next.js application for generating dynamic Open Graph (OG) images with custom branding support.

## Features

- 🎨 **Dynamic OG Image Generation** - Create beautiful social media preview images on-the-fly
- 🔧 **Customizable Branding** - Configure your own logo, colors, and brand name via environment variables
- ⚡ **Performance Optimized** - Built-in caching headers for fast image delivery
- 🗜️ **URL Compression** - Compressed URLs using zlib/deflate (50-70% shorter than base64)
- 🔒 **Validation & Security** - Input validation and error handling
- 📱 **Two Layout Modes** - Supports images with or without custom backgrounds
- 🌐 **Environment-Aware** - Automatically detects and uses correct base URL (localhost, Vercel, or custom)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:

```env
# Required: Your application URL (no trailing slash)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Branding customization
NEXT_PUBLIC_BRAND_NAME=Your Brand
NEXT_PUBLIC_BRAND_LOGO=https://your-domain.com/logo.png
NEXT_PUBLIC_BRAND_COLOR=#b19eff
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Yes* | Base URL of your application | Auto-detected from Vercel or localhost |
| `NEXT_PUBLIC_BRAND_NAME` | No | Your brand name to display on OG images | "Your Brand" |
| `NEXT_PUBLIC_BRAND_LOGO` | No | URL to your logo image | "" (no logo) |
| `NEXT_PUBLIC_BRAND_COLOR` | No | Hex color for branding elements | "#b19eff" |

\* Required for production deployments. Auto-detected on Vercel.

## Usage

### Via Web Interface

1. Navigate to your deployed site or `http://localhost:3000`
2. Fill in the form with:
   - **Title**: Main heading for your OG image
   - **Description**: Supporting text for your OG image
   - **Image URL** (optional): Custom background image
3. Click "Generate OG Image"
4. Copy the generated image URL or download the preview

### Via API

Generate OG images programmatically by calling the API endpoint:

```
GET /api/og?data={compressed_base64url_encoded_json}
```

**Example (Client-side):**

```javascript
import { compressDataClient } from '@/lib/og-utils-client';

const data = {
  title: "My Awesome Post",
  description: "This is an amazing article about...",
  image: "https://example.com/background.jpg" // optional
};

const encodedData = compressDataClient(data);
const ogImageUrl = `${YOUR_APP_URL}/api/og?data=${encodedData}`;
```

**Example (Server-side):**

```javascript
import { compressData } from '@/lib/og-utils';

const data = {
  title: "My Awesome Post",
  description: "This is an amazing article about...",
  image: "https://example.com/background.jpg" // optional
};

const encodedData = compressData(data);
const ogImageUrl = `${YOUR_APP_URL}/api/og?data=${encodedData}`;
```

**URL Compression Benefits:**
- Original base64 encoding: ~200-400 characters for typical content
- Compressed encoding: ~100-200 characters (50-70% reduction)
- URL-safe format (no special character encoding needed)
- **Browser URLs are also compressed!** Instead of `?title=...&description=...`, the app now uses `?d=compressed_data`

### In Next.js Metadata

```typescript
import { generateOGImageUrl } from '@/lib/og-utils';

export const metadata = {
  title: 'My Page',
  description: 'My page description',
  openGraph: {
    images: [
      generateOGImageUrl({
        title: 'My Page',
        description: 'My page description',
        image: 'https://example.com/bg.jpg'
      })
    ]
  }
};
```

## Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_APP_URL` (will be auto-detected if not set)
   - `NEXT_PUBLIC_BRAND_NAME`
   - `NEXT_PUBLIC_BRAND_LOGO`
   - `NEXT_PUBLIC_BRAND_COLOR`
4. Deploy

### Other Platforms

1. Set environment variables in your hosting platform
2. Build the project:
   ```bash
   npm run build
   ```
3. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
├── app/
│   ├── api/og/route.tsx    # OG image generation API
│   ├── page.tsx            # Main form page
│   └── layout.tsx          # Root layout
├── components/
│   ├── form.tsx            # OG image form component
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── og-utils.ts         # Server-side OG utilities & validation
│   ├── og-utils-client.ts  # Client-side OG utilities (compression)
│   └── utils.ts            # General utilities
├── assets/                 # Font files (TTF)
└── public/                 # Static assets
```

## API Response Format

The OG image API returns a PNG image with:
- **Dimensions**: 1200×630px (optimal for social media)
- **Format**: PNG
- **Cache-Control**: `public, max-age=31536000, immutable` (1 year)
- **Content-Type**: `image/png`

### Data Encoding

The API uses compressed, URL-safe base64 encoding:
1. **JSON stringify** the data object
2. **Deflate compression** (zlib) for size reduction
3. **Base64 encoding** for URL transmission
4. **URL-safe conversion** (replacing `+`, `/`, `=` characters)

## Customization

### Fonts

Custom fonts are loaded from the `/assets` directory. To change fonts:
1. Add your `.ttf` font file to `/assets`
2. Update the font loading in `/app/api/og/route.tsx`

### Layout Styles

The OG image has two layouts:
- **Without Image**: Centered content with gradient background
- **With Image**: Split layout with image on right side

Modify styles in `/app/api/og/route.tsx` to customize the appearance.

## Troubleshooting

### Images not loading in production

Ensure `NEXT_PUBLIC_APP_URL` is set correctly in your environment variables.

### Font rendering issues

Make sure font files are properly included in your deployment. Vercel automatically includes files in the `/assets` directory.

### Base URL detection

The app automatically detects the base URL in this order:
1. `window.location.origin` (client-side)
2. `NEXT_PUBLIC_APP_URL` environment variable
3. `VERCEL_URL` environment variable (on Vercel)
4. Falls back to `http://localhost:3000`

### URL Length Comparison

**Before compression (uncompressed query params):**
```
http://localhost:3000/?title=Example+OG+Image&description=Elevate+your+digital+presence+by+using+the+og+image+generation...
URL length: ~200+ characters in query string alone
```

**After compression (deflate + base64url):**
```
http://localhost:3000/?d=eJyrVkrOT0lVslJQKkktLlGyMjTQUUo...
URL length: ~80-120 characters total
Reduction: ~60-70% shorter
```

**Real Example:**
- **Old format:** `?title=Example+OG+Image&description=Elevate+your+digital+presence+by+using+the+og+image+generation+built+by+savar+bhasin.+Use+this+tool+to+generate+images+efficiently.`
  - Length: 172 characters
- **New format:** `?d=eJyrVipOTS4tSsxRslIqLU4tKkrMS1eyMtRRSs7P1VEqSU0sKVayUoBy8otSlKyUqjkBhXMUjw`
  - Length: 88 characters
  - **Reduction: 49% shorter!**

Benefits:
- Much shorter, more shareable links
- Better for Twitter/social media character limits
- Reduced URL encoding overhead
- Faster to process and transmit
- Cleaner looking URLs

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js OG Image Generation](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [Open Graph Protocol](https://ogp.me/)

## License

MIT
