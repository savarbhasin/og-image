import OGImageForm from "@/components/form";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
                <meta property="og:title" content={'hi'} />
                <meta property="og:description" content={'yo yo'} />
                <meta property="og:image" content={'https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=sZM5HlZvHFYnzjrhaStRpex43URlxg6wwJXff3BE9VA='} />
      </Head>
      <OGImageForm/>
    </>
  );
}
