import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  
  // Security Check: Only check auth when the client is requesting a token.
  // The 'blob.upload-completed' webhook comes from Vercel servers, so it has no cookies.
  if (body.type === 'blob.generate-client-token') {
    const session = (await cookies()).get("epcos_admin_session");
    if (session?.value !== "true") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          tokenPayload: JSON.stringify({ uploadedBy: 'admin' }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Blob upload completed', blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
