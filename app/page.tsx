import type { Metadata } from 'next'
import OGImageForm from "@/components/form"
import Head from 'next/head';


export async function getOgImage(context:any){
  const data = context.query
  const response = await fetch(`/api/og?title=${encodeURIComponent(data.title.slice(0,50))}&description=${encodeURIComponent(data.description.slice(0,200))}${data.image && `&image=${encodeURIComponent(data.image)}`}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const d = {url,title:data.title,description:data.description};
    return {
      props: {
        d,
      },
    };
  }

export default function Home({d}:{d:{url:string,title:string,description:string}}) {
  return (
    <main>
      <Head>
        <meta property="og:title" content={d?.title} />
        <meta property="og:image" content={d?.url} />
        <meta property="og:description" content={d?.description} />
      </Head>
      <OGImageForm />
    </main>
  )
}