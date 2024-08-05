// import { ImageResponse } from 'next/og'
// import { NextRequest } from 'next/server';
// import logoImage from '../../../public/logo.jpg'

// export async function GET (req:NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const title = searchParams.get('title')?.slice(0,100) || 'Your Title Here';
//     const description = searchParams.get('description')?.slice(0,200) || 'Your Description Here';
//     const template = searchParams.get('template') || 'template1';

//     // Load Google Fonts
//     const fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap';
//     const font = await fetch(fontUrl).then(res => res.text());

//     let templateStyles = {};

//     if (template === 'template-1') {
//         templateStyles = {
//             backgroundImage: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
//             fontFamily: 'Roboto, sans-serif'
//         };
//     } else if (template === 'template-2') {
//         templateStyles = {
//             backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
//             fontFamily: 'Arial, sans-serif'
//         };
//     }

//     return new ImageResponse(
//         // (
//         //     <div
//         //         style={{
//         //             ...templateStyles,
//         //             height: '100%',
//         //             width: '100%',
//         //             display: 'flex',
//         //             alignItems: 'flex-start',
//         //             justifyContent: 'flex-start',
//         //         }}
//         //     >
//         //         <div style={{
//         //             display: 'flex',
//         //             flexDirection: 'column',
//         //             justifyContent: 'space-between',
//         //             width: '100%',
//         //             height: '100%',
//         //             padding: '80px',
//         //         }}>
//         //             <img src="https://pbs.twimg.com/profile_images/1650641078536802306/iNORZEim_400x400.jpg" alt="" 
//         //             width={300} height={200}/>

//         //             <h2 style={{
//         //                 fontSize: '30px',
//         //                 color: 'white',
//         //                 fontWeight: 'bold',
//         //                 textAlign: 'left',
//         //             }}>{description}</h2>

//         //             <h1 style={{
//         //                 fontSize: '60px',
//         //                 color: 'white',
//         //                 fontWeight: 'extrabold',
//         //                 textAlign: 'left',
//         //             }}>{title}</h1>
//         //         </div>
//         //     </div>
//         // ),
//         (
//             // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections

//             <div tw="flex flex-col w-full  h-full items-center justify-center bg-gray-300">
//                 <img src="https://pbs.twimg.com/profile_images/1650641078536802306/iNORZEim_400x400.jpg" alt="" width={200} height={200} style={{borderRadius:200}}/>

//             <div tw="bg-gray-200 flex w-full">
//                 <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
//                 <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
//                     <span>Ready to dive in?</span>
//                     <span tw="text-indigo-600">Start your free trial today.</span>
//                 </h2>
//                 <div tw="mt-8 flex md:mt-0">
//                     <div tw="flex rounded-md shadow">
//                     <a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">Get started</a>
//                     </div>
//                     <div tw="ml-3 flex rounded-md shadow">
//                     <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">Learn more</a>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//             </div>
//         ),
//         {
//             width: 1200,
//             height: 630,
//         }
//     );
// }

// import { ImageResponse } from 'next/og'
// import { NextRequest } from 'next/server'

// export const runtime = 'edge'

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url)
//   const title = searchParams.get('title')?.slice(0, 70) || 'Default Title'
//   const description = searchParams.get('description')?.slice(0, 200) || 'Default Description'
//   const template = searchParams.get('template')

//   // Fetch Poppins font from Google Fonts
// //   const poppins = await fetch(
// //     'https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap'
// //   ).then((res) => res.arrayBuffer())

//   const templateStyles = {
//     template1: {
//       bgGradient: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)',
//       titleColor: '#ffffff',
//       descriptionColor: '#e0e0e0',
//     },
//     template2: {
//       bgGradient: 'linear-gradient(to right, #ff7e5f, #feb47b)',
//       titleColor: '#1a1a1a',
//       descriptionColor: '#333333',
//     },
//   }

//   return new ImageResponse(
//     (
//       <div
//         style={{
//           height: '100%',
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'flex-start',
//           justifyContent: 'flex-start',
//           backgroundImage: templateStyles['template2'].bgGradient,
//           fontFamily: '"Poppins", sans-serif',
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             width: '100%',
//             height: '100%',
//             padding: '60px',
//           }}
//         >
//         <div style={{display:'flex', flexDirection:'row-reverse', justifyItems:'center', alignItems:'center', gap:'20px', marginLeft:'auto'}}>
//             <img
//                 src="https://medial.app/image/medial-purple-logo.png"
//                 alt="Logo"
//                 height={80}
//                 width={120}
                
//             />
//           <p 
//             style={{
//                 fontSize: '30px',
//                 fontWeight: 'extrabold',
//                 color: templateStyles.template2.titleColor,
//               }}
//             >medial.com</p>
//         </div>
          
//           <div style={{ marginTop: '40px', display:'flex', flexDirection:'column-reverse'}}>
//             <h1
//               style={{
//                 fontSize: '50px',
//                 fontWeight: 'bold',
//                 color: templateStyles.template2.titleColor,
//               }}
//             >
//               {title}
//             </h1>
//             <p
//               style={{
//                 fontSize: '30px',
//                 color: templateStyles.template2.descriptionColor,
//                 fontWeight: 'bold',
//               }}
//             >
//               {description}
//             </p>
//           </div>
//         </div>
//       </div>
//     ),
//     {
//       width: 1200,
//       height: 630,
//     //   fonts: [
//     //     {
//     //       name: 'Poppins',
//     //       data: poppins,
//     //       style: 'normal',
//     //       weight: 700,
//     //     },
//     //   ],
//     }
//   )
// }

import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const config = {
    runtime: "experimental-edge",
  };

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')?.slice(0, 70) || 'Default Title'
    const description = searchParams.get('description')?.slice(0, 200) || 'Default Description'
    const template = searchParams.get('template')
  
    // const poppins = await fetch(
    //     new URL('../../../assets/poppins.ttf', import.meta.url)
    //   ).then((res) => res.arrayBuffer())
  
    const templateStyles = {
      template1: {
        bgGradient: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)',
        titleColor: '#ffffff',
        descriptionColor: '#e0e0e0',
      },
      template2: {
        bgGradient: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        titleColor: '#1a1a1a',
        descriptionColor: '#333333',
      },
    }
  
    return new ImageResponse(
      (
        <div style={{ background: '#ffffff', height: '630px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div
            style={{
                background: '#7c58db',
                borderRadius: '50%',
                width: '676.44px',
                height: '676.44px',
                position: 'absolute',
                left: '50%',
                top: '630px',
                transform: 'translateX(-50%)',
                filter: 'blur(252.16px)'
            }}
        ></div>
        <div
            style={{
                color: '#342961',
                textAlign: 'center',
                fontSize: '56px',
                fontWeight: '400',
                position: 'absolute',
                left: '50%',
                top: '148px',
                width: '991px',
                height: '167px',
                transform: 'translateX(-50%)'
            }}
        >
            Scale your video production with customizable AI avatars
        </div>
        <div
            style={{
                color: '#342961',
                textAlign: 'center',
                fontSize: '34px',
                fontWeight: '600',
                position: 'absolute',
                left: '50%',
                top: '315px',
                width: '876px',
                height: '167px',
                transform: 'translateX(-50%)'
            }}
        >
            HeyGen is a video platform that helps you create engaging business videos with generative AI, as easily as making PowerPoints for various use cases.
        </div>
        <img
            className="group-16"
            style={{ height: 'auto', position: 'absolute', left: '50%', top: '74px', overflow: 'visible', transform: 'translateX(-50%)' }}
            src="https://medial.app/image/medial-purple-logo.png"
            alt=""
        />
        <div
            style={{
                background: '#41b4f4',
                borderRadius: '12px',
                width: '385px',
                height: '66px',
                position: 'absolute',
                left: '50%',
                top: '482px',
                transform: 'translateX(-50%)'
            }}
        ></div>
        <div
            style={{
                color: '#ffffff',
                textAlign: 'center',
                fontSize: '32px',
                fontWeight: '800',
                position: 'absolute',
                left: '50%',
                top: '482px',
                width: '385px',
                height: '66px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateX(-50%)'
            }}
        >
            Try HeyGen for Free
        </div>
    </div>


      ),
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: 'Poppins',
        //     data: poppins,
        //     style: 'normal',
        //     weight: 700,
        //   },
        // ],
      }
    )
  }