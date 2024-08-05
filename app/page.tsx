import type { Metadata } from 'next'
import OGImageForm from "@/components/form"

export const metadata: Metadata = {
  title: 'OG Image Generator',
  description: 'Generate Open Graph images for your web pages',
  openGraph: {
    title: 'OG Image Generator',
    description: 'Generate Open Graph images for your web pages',
    images: [
      {
        url: 'https://example.com/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'OG Image Generator',
      },
    ],
  },
}

export default function Home() {
  return (
    <main>
      <OGImageForm />
    </main>
  )
}