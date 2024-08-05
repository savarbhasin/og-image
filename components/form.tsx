'use client'
import React, { BaseSyntheticEvent, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Head from 'next/head';

interface FormData {
    title: string;
    description: string;
    image?: string;
    template: string;
}

const OGImageForm = () => {
    const { register, handleSubmit, control, formState: { errors }, watch } = useForm<FormData>({defaultValues:{
        template: 'template-1',
        description: 'Elevate your digital presence by using the og image generation built by savar bhasin. Use this tool to generate images efficiently.',
        title: 'Example OG Image',
    }});

    const [ogImage, setOgImage] = useState('');

    const title = watch('title');
    const description = watch('description');

    const onSubmit : SubmitHandler<FormData> = async (data, e?: BaseSyntheticEvent) => {
        e?.preventDefault();
        const response = await fetch(`/api/og?title=${encodeURIComponent(data.title.slice(0,50))}&description=${encodeURIComponent(data.description.slice(0,200))}&template=${data.template}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setOgImage(url);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <Head>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={ogImage} />
            </Head>
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

                    <div>
                        <label htmlFor="template" className="block text-sm font-medium text-gray-700">Image Templates</label>
                        <Controller
                            name="template"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="template-1">Template 1</SelectItem>
                                        <SelectItem value="template-2">Template 2</SelectItem>
                                        <SelectItem value="template-3">Template 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                            rules={{ required: "Template is required" }}
                        />
                        {errors.template && <p className="text-red-500 text-xs mt-1">{errors.template.message}</p>}
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
    );
};

export default OGImageForm;
