import type { Metadata, ResolvingMetadata } from 'next'
import OGImageForm from "@/components/form"
import { generateOGImageUrl, decompressData } from '@/lib/og-utils'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Try to get compressed data first (new format)
  const compressedData = searchParams.d as string;
  
  let title: string | undefined;
  let description: string | undefined;
  let image: string | undefined;

  if (compressedData) {
    try {
      const decodedData = decompressData(compressedData);
      title = decodedData.title;
      description = decodedData.description;
      image = decodedData.image;
    } catch (error) {
      // If decompression fails, fall back to default
      console.error('Failed to decompress data:', error);
    }
  } else {
    // Fallback to old uncompressed format for backwards compatibility
    title = searchParams.title as string;
    description = searchParams.description as string;
    image = searchParams.image as string || undefined;
  }

  if(!title || !description) {
    return {
      title: 'OG Image Generator',
      description: 'Generate Open Graph images for your website'
    }
  } 

  // Generate OG image URL dynamically using the utility function
  const imageUrl = generateOGImageUrl({ title, description, image });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  }
}

export default function Home({searchParams}:Props) {
  // Parse initial data from either compressed or uncompressed format
  let initialData: any = {};
  
  const compressedData = searchParams.d as string;
  if (compressedData) {
    try {
      const decodedData = decompressData(compressedData);
      initialData = {
        title: decodedData.title,
        description: decodedData.description,
        image: decodedData.image,
      };
    } catch (error) {
      console.error('Failed to decompress data for form:', error);
    }
  } else {
    // Fallback to uncompressed format
    initialData = searchParams;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <OGImageForm initialData={initialData}/>
    </main>
  )
}