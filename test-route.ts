import { POST } from './src/app/api/upload/route.ts';

async function test() {
  const req = new Request('http://localhost/api/upload', {
    method: 'POST',
    body: JSON.stringify({
      type: 'blob.generate-client-token',
      payload: { pathname: 'test.pdf', callbackUrl: 'http://localhost/api/upload', multipart: false, clientPayload: null }
    }),
    headers: {
      'content-type': 'application/json'
    }
  });

  try {
    const res = await POST(req);
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text);
  } catch (e) {
    console.error("Exception:", e);
  }
}

test();
