import { NextRequest } from "next/server"
import { ImageResponse } from 'next/og';
import { promises as fs } from 'fs'
import path from 'path'
import { validateOGData, truncateText, getBrandingConfig, decompressData } from '@/lib/og-utils'

const maxTitleLength = 40
const maxDescriptionLength = 150

// Runtime configuration
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl
        const encodedData = searchParams.get('data');
        
        // Validate input
        if (!encodedData) {
            return new Response('Missing data parameter', { status: 400 });
        }

        // Decode, decompress and validate data
        let decodedData;
        try {
            decodedData = decompressData(encodedData);
        } catch (error) {
            return new Response('Invalid data encoding or compression', { status: 400 });
        }

        const validation = validateOGData(decodedData);
        if (!validation.valid) {
            return new Response(validation.error || 'Invalid data', { status: 400 });
        }

        const { title, description, image } = validation.data!;
        const branding = getBrandingConfig();
        
        const fontPath = path.join(process.cwd(), 'assets', 'poppins.ttf')
        const fontData = await fs.readFile(fontPath)

        // Generate image response based on whether custom image is provided
        const imageResponse = !image
            ? new ImageResponse(
            (
                <div
                    style={{
                        width: "1200px",
                        height: "630px",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: 'Gotile',
                        background: "linear-gradient(45deg, #0a0b1c 0%, #1c1f33 50%, #2e3350 100%)",
                    }}
                >
                    <div
                        style={{
                            background: "#1fcce8",
                            borderRadius: "50%",
                            width: "676px",
                            height: "676px",
                            position: "absolute",
                            left: "261px",
                            top: "630px",
                            transform: "rotate(0deg) scale(1, 1)",
                            filter: "blur(252px)",
                        }}
                    />
                    <div
                        style={{
                            color: "#e0e0e0",
                            textAlign: "center",
                            fontSize: "32px",
                            fontWeight: 700,
                            maxWidth: "888px",
                            marginBottom: "20px",
                            display: 'flex',
                            justifyItems: 'center',
                            alignItems: 'center',
                            gap: '20px'
                        }}>
                        {branding.logo && <img src={branding.logo} alt="" width={60} height={40} />}
                        <p style={{
                            color: branding.color,
                            transform: "translateY(5px)"
                        }}>{branding.name}</p>
                    </div>
                    <div
                        style={{
                            color: "#e0e0e0",
                            textAlign: "center",
                            fontSize: "64px",
                            fontWeight: 700,
                            maxWidth: "888px",
                            marginBottom: "20px",
                        }}
                    >
                        {truncateText(title, maxTitleLength)}
                    </div>
                    <div
                        style={{
                            color: "#e0e0e0",
                            textAlign: "center",
                            fontSize: "36px",
                            fontWeight: 400,
                            maxWidth: "966px",
                            marginBottom: "40px",
                        }}
                    >
                        {truncateText(description, maxDescriptionLength)}
                    </div>
                    <div
                        style={{
                            background: "#ffb347",
                            borderRadius: "12px",
                            padding: "15px 30px",
                            color: "#0a0b1c",
                            fontSize: "32px",
                            fontWeight: 700,
                        }}
                    >
                        Learn More
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Gotile',
                        data: fontData,
                        style: 'normal',
                    },
                ],
            }
        )
            : new ImageResponse(
            (
                <div
                    style={{
                        width: "1200px",
                        height: "630px",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "row",
                        fontFamily: 'Gotile',
                        background: "#0a0b1c",
                    }}
                >
                    <div
                        style={{
                            width: "600px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "20px",
                            color: "#e0e0e0",
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            {branding.logo && <img src={branding.logo} alt="" width={50} height={30} />}
                            <p style={{ color: branding.color, fontSize: "24px", fontWeight: 700 }}>{branding.name}</p>
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "48px",
                                fontWeight: 700,
                            maxWidth: "500px",
                            marginBottom: "20px",
                        }}
                        >
                            {truncateText(title, maxTitleLength)}
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "24px",
                                fontWeight: 400,
                                maxWidth: "500px",
                            }}
                        >
                            {truncateText(description, maxDescriptionLength)}
                        </div>
                    </div>
                    <div
                        style={{
                            width: "600px",
                            height: "100%",
                            overflow: "hidden",
                            position: "relative",
                            display:'flex'
                        }}
                    >
                        <img
                            src={image}
                            alt="Right Side Image"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                        />
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Gotile',
                        data: fontData,
                        style: 'normal',
                    },
                ],
            }
        );

        // Add caching headers for better performance
        const headers = new Headers();
        headers.set('Content-Type', 'image/png');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        
        // Return the image with proper headers
        return new Response(await imageResponse.arrayBuffer(), {
            headers,
            status: 200,
        });
    } catch (e: any) {
        console.error('OG Image generation error:', e)
        return new Response(`Failed to generate image: ${e.message}`, {
            status: 500,
        })
    }
}
