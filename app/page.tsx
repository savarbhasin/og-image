import type { Metadata, ResolvingMetadata } from 'next'
import OGImageForm from "@/components/form"


type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = searchParams.title as string
  const description = searchParams.description as string 
  const image = searchParams.image as string || null

  if(!title || !description) {
    return {
      title: 'OG Image Generator',
      description: 'Generate Open Graph images for your website'
    }
  } 


    const data = { title, description, image };
    const encodedData = Buffer.from(JSON.stringify(data)).toString('base64');
    
    const imageUrl = `https://og-image-snowy-nu.vercel.app/api/og?data=${encodedData}`;
    // const imageUrl = `http://localhost:3000/api/og?data=${encodedData}`;
      // 
      

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl]
    },
  }
}

export default function Home({searchParams}:Props) {
  return (
    <main>
      <OGImageForm initialData={searchParams}/>
      
    </main>
  )
}