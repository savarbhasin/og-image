'use client'

import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from './ui/use-toast'
import toast from 'react-hot-toast'

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
 

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    toast.loading('Generating OG Image...');
    const {title,image, description} = data;
    const queryParams = new URLSearchParams({
        title: (title),
        description: (description),
    });
    
    if (image) {
        queryParams.append('image', (image));
    }
    router.push(`?${queryParams.toString()}`);

    const dataToEncode = { title, description, image };
    const encodedData = Buffer.from(JSON.stringify(dataToEncode)).toString('base64');
    
    setOgImage(`https://og-image-snowy-nu.vercel.app/api/og?data=${encodedData}`);
    // setOgImage(`http://localhost:3000/api/og?data=${encodedData}`);
    toast.dismiss();
    toast.success('Generated OG Image');
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
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
            <p className='text-black'>Image will be shown down here</p>
            {ogImage && ogImage !='' && <a href={ogImage} className='underline text-blue-500'>Click here for image link</a>}
            <img src={ogImage} alt="Generated OG Image" className="w-full h-auto" />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default OGImageForm