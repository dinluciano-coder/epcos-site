const http = require('http');

async function test() {
  const fetch = require('node-fetch');
  
  console.log("Sending POST to /api/upload...");
  try {
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Mock a cookie for auth
        'Cookie': 'epcos_admin_session=true'
      },
      body: JSON.stringify({
        type: 'blob.generate-client-token',
        payload: { pathname: 'test.pdf', callbackUrl: 'http://localhost:3000/api/upload', multipart: false, clientPayload: null }
      })
    });
    
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

test();
