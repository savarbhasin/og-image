'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { compressDataClient, getBaseUrl } from '@/lib/og-utils-client'
import { Copy, Check } from 'lucide-react'

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
  const [loading,setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedPageUrl, setCopiedPageUrl] = useState(false)


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    setCopied(false)
    setCopiedPageUrl(false)
    toast.loading('Generating OG Image...');
    const {title, image, description} = data;
    
    // Compress data for both browser URL and OG image URL
    const dataToEncode = { title, description, image };
    const encodedData = compressDataClient(dataToEncode);
    
    // Update URL with compressed data parameter (much shorter!)
    router.push(`?d=${encodedData}`);

    // Generate compressed OG image URL
    const baseUrl = getBaseUrl();
    setOgImage(`${baseUrl}/api/og?data=${encodedData}`);
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ogImage);
      setCopied(true);
      toast.success('Image URL copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  }

  const copyPageUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopiedPageUrl(true);
      toast.success('Page URL copied!');
      setTimeout(() => setCopiedPageUrl(false), 2000);
    } catch (err) {
      toast.error('Failed to copy page URL');
    }
  }

  

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-900 border-gray-800 shadow-2xl">
      <CardHeader className="space-y-1 pb-3">
        <h2 className="text-xl font-bold text-white">OG Image Generator</h2>
        <p className="text-xs text-gray-400">Create beautiful social media preview images</p>
      </CardHeader>
      <CardContent className="pb-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="title" className="block text-xs font-medium text-gray-300 mb-1">Title</label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                className="bg-gray-800 border-gray-700 text-white text-sm placeholder:text-gray-500 focus:border-blue-500 h-9"
                placeholder="Enter a catchy title..."
              />
              {errors.title && <p className="text-red-400 text-xs mt-0.5">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="image" className="block text-xs font-medium text-gray-300 mb-1">Image URL (optional)</label>
              <Input
                id="image"
                type="url"
                {...register("image")}
                className="bg-gray-800 border-gray-700 text-white text-sm placeholder:text-gray-500 focus:border-blue-500 h-9"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-medium text-gray-300 mb-1">Description</label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              className="bg-gray-800 border-gray-700 text-white text-sm placeholder:text-gray-500 focus:border-blue-500 resize-none"
              rows={2}
              placeholder="Add a compelling description..."
            />
            {errors.description && <p className="text-red-400 text-xs mt-0.5">{errors.description.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm">
            Generate Image
          </Button>
        </form>
      </CardContent>
      <CardFooter className="pt-3">
        {ogImage!='' &&  (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Preview</h3>
              {!loading && (
                <div className="flex gap-1.5">
                  <Button
                    onClick={copyPageUrl}
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 h-7 text-xs px-2"
                    title="Copy page URL"
                  >
                    {copiedPageUrl ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Page
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 h-7 text-xs px-2"
                    title="Copy image URL"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Image
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => window.open(ogImage, '_blank')}
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 h-7 text-xs px-2"
                    title="Open image in new tab"
                  >
                    Open
                  </Button>
                </div>
              )}
            </div>
            <div className="relative w-full rounded-md overflow-hidden border border-gray-700">
              {loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
                  <div className="flex items-center justify-center h-full">
                    <div className="space-y-2 w-full p-6">
                      <div className="h-3 bg-gray-600 rounded w-3/4 mx-auto"></div>
                      <div className="h-3 bg-gray-600 rounded w-1/2 mx-auto"></div>
                      <div className="h-2 bg-gray-600 rounded w-2/3 mx-auto mt-4"></div>
                      <div className="h-2 bg-gray-600 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                </div>
              )}
              <img 
                src={ogImage} 
                onLoad={()=>{toast.dismiss(); setLoading(false)}} 
                alt="Generated OG Image" 
                className={`w-full h-auto transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                style={{ aspectRatio: '1.91/1' }}
              />
            </div>
            {!loading && (
              <p className="text-xs text-gray-500 text-center">
                1200×630px • Optimized for social media
              </p>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default OGImageForm