// 'use client'
// import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
// import { SubmitHandler, useForm, Controller } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
// import Head from 'next/head';
// import { useRouter } from 'next/navigation';

// interface FormData {
//     title: string;
//     description: string;
//     image?: string;
// }

// const OGImageForm = ({initialData}) => {
//     const { register, handleSubmit, control, formState: { errors }, watch } = useForm<FormData>({defaultValues:{
//         description: 'Elevate your digital presence by using the og image generation built by savar bhasin. Use this tool to generate images efficiently.',
//         title: 'Example OG Image',
//     }});

//     const [ogImage, setOgImage] = useState('');
//     const router = useRouter();
//     const title = watch('title');
//     const description = watch('description');

//     useEffect(() => {
//         if (ogImage) {
//           router.push(`?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(ogImage)}`)
//         }
//       }, [ogImage, title, description, router])

//     const onSubmit : SubmitHandler<FormData> = async (data, e?: BaseSyntheticEvent) => {
//         e?.preventDefault();
//         const response = await fetch(`/api/og?title=${encodeURIComponent(data.title.slice(0,50))}&description=${encodeURIComponent(data.description.slice(0,200))}${data.image && `&image=${encodeURIComponent(data.image)}`}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         });
//         const blob = await response.blob();
//         const url = URL.createObjectURL(blob);
//         setOgImage(url);
//     };

//     return (
//         <Card className="w-full max-w-md mx-auto">
//             <Head>
//                 <title>Create a post</title>
//                 <meta property="og:title" content={title} />
//                 <meta property="og:description" content={description} />
//                 {ogImage && <meta property="og:image" content={ogImage} />}
//             </Head>
//             <CardHeader>
//                 <h2 className="text-2xl font-bold">Generate OG Image</h2>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//                         <Input
//                             id="title"
//                             {...register("title", { required: "Title is required" })}
//                             className="mt-1"
//                         />
//                         {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                         <Textarea
//                             id="description"
//                             {...register("description", { required: "Description is required" })}
//                             className="mt-1"
//                             rows={3}
//                         />
//                         {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
//                     </div>

//                     <div>
//                         <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
//                         <Input
//                             id="image"
//                             type="url"
//                             {...register("image")}
//                             className="mt-1"
//                         />
//                     </div>

                    
//                     <Button type="submit" className="w-full">Generate OG Image</Button>
//                 </form>
//             </CardContent>
//             <CardFooter>
//                 {ogImage && (
//                     <div className="w-full">
//                         <h3 className="text-lg font-semibold mb-2">Generated OG Image</h3>
//                         <img src={ogImage} alt="Generated OG Image" className="w-full h-auto" />
//                     </div>
//                 )}
//             </CardFooter>
//         </Card>
//     );
// };

// export default OGImageForm;

'use client'

import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

interface FormData {
  title: string
  description: string
  image?: string
}

interface Props {
  initialData: {
    title?: string
    description?: string
    image?: string
  }
}

const OGImageForm: React.FC<Props> = ({ initialData }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: initialData.title ?? 'Example OG Image',
      description: initialData.description ?? 'Elevate your digital presence by using the og image generation built by savar bhasin. Use this tool to generate images efficiently.',
      image: initialData.image,
    }
  })

  const [ogImage,setOgImage] = useState('')
  const router = useRouter()
  const image = watch('image')
  const title = watch('title')
  const description = watch('description')

  useEffect(() => {
    if (ogImage) {
        console.log(image)
      router.push(`?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}${image!='' && image && `&image=${encodeURIComponent(image)}`}`)
    }
  }, [ogImage, router])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await fetch(`/api/og?title=${encodeURIComponent(data.title.slice(0,50))}&description=${encodeURIComponent(data.description.slice(0,200))}${data.image ? `&image=${encodeURIComponent(data.image)}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    setOgImage(url)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Generate OG Image</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="mt-1"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              className="mt-1"
              rows={3}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
            <Input
              id="image"
              type="url"
              {...register("image")}
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full">Generate OG Image</Button>
        </form>
      </CardContent>
      <CardFooter>
        {ogImage && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Generated OG Image</h3>
            <img src={ogImage} alt="Generated OG Image" className="w-full h-auto" />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default OGImageForm