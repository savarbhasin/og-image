import type { Metadata, ResolvingMetadata } from 'next'
import OGImageForm from "@/components/form"
import Head from 'next/head';


// export async function getOgImage(context:any){
//   const data = context.query
  // const response = await fetch(`/api/og?title=${encodeURIComponent(data.title.slice(0,50))}&description=${encodeURIComponent(data.description.slice(0,200))}${data.image && `&image=${encodeURIComponent(data.image)}`}`, {
  //   method: 'GET',
  //   headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   });
  //   const blob = await response.blob();
  //   const url = URL.createObjectURL(blob);
//     const d = {url,title:data.title,description:data.description};
//     return {
//       props: {
//         d,
//       },
//     };
//   }

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
    const response = await fetch(`/api/og?title=${encodeURIComponent(title.slice(0,50))}&description=${encodeURIComponent(description.slice(0,200))}${image && `&image=${encodeURIComponent(image)}`}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
        },
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);


  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [url] : [],
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