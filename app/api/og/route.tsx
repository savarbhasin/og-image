import { NextRequest } from "next/server"
import { ImageResponse } from 'next/og';
import { promises as fs } from 'fs'
import path from 'path'

const maxTitleLength = 40
const maxDescriptionLength = 150

const truncate = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength - 3) + '...'
    }
    return text
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl
        // const { searchParams } = new URL(req.url)
        const encodedData = searchParams.get('data')!;
        
        // const title = searchParams.get('title')?.slice(0, 70)
        // const description = searchParams.get('description')?.slice(0, 200)
        // const image = searchParams.get('image')
        const decodedData = JSON.parse(Buffer.from(encodedData, 'base64').toString('utf-8'));
        const { title, description, image } = decodedData;
        
        const fontPath = path.join(process.cwd(), 'assets', 'poppins.ttf')
        const fontData = await fs.readFile(fontPath)

        if(!image)
            return new ImageResponse(
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
                        <img src="https://medial.app/image/medial-purple-logo.png" alt="" width={60} height={40} />
                        <p style={{
                            color: "#b19eff",
                            transform: "translateY(5px)"
                        }}>medial.com</p>
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
                        {truncate(title, maxTitleLength)}
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
                        {truncate(description, maxDescriptionLength)}
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
                        Use Medial Now
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
        return new ImageResponse(
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
                            <img src="https://medial.app/image/medial-purple-logo.png" alt="" width={50} height={30} />
                            <p style={{ color: "#b19eff", fontSize: "24px", fontWeight: 700 }}>medial.com</p>
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
                            {truncate(title, maxTitleLength)}
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "24px",
                                fontWeight: 400,
                                maxWidth: "500px",
                            }}
                        >
                            {truncate(description, maxDescriptionLength)}
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
        )
    } catch (e: any) {
        console.error('OG Image generation error:', e)
        return new Response(`Failed to generate image: ${e.message}`, {
            status: 500,
        })
    }
}
