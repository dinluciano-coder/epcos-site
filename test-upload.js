const { upload } = require('@vercel/blob/client');

async function test() {
  console.log("Starting...");
  const fetch = require('node-fetch');
  global.fetch = fetch;
  
  try {
    const file = new Blob(["Hello world"], { type: "text/plain" });
    file.name = "test.txt";
    
    // We cannot easily test @vercel/blob/client in Node without mocking DOM File.
    console.log("This might fail due to DOM dependencies");
  } catch(e) {
    console.error(e);
  }
}

test();
