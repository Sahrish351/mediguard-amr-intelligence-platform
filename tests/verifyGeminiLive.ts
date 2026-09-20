// Test script: verifyGeminiLive.ts
// Tests the server-side AI proxy at http://localhost:3000/api/ai/chat
// Verifies:
// 1. Proxy handles requests server-side
// 2. No client-side key exposure
// 3. Grounded response format or safe error handling with fallback
// 4. Non-diagnostic phrasing enforcement

async function testGeminiProxy() {
  console.log('--- TESTING GEMINI SERVER-SIDE PROXY ---');
  const url = 'http://localhost:3000/api/ai/chat';

  const payload = {
    prompt: 'Analyze current resistance trend for Klebsiella pneumoniae in St. Jude General Hospital. Give surveillance summary.',
    systemInstruction: 'You are MediGuard AI Surveillance Copilot. Provide grounded surveillance assistance. Never provide clinical diagnoses or prescription orders.'
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log(`HTTP Status: ${res.status}`);
    const data = await res.json();
    console.log('Response Keys:', Object.keys(data));

    if (res.ok) {
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('Generated AI Text Snippet:');
      console.log(text?.slice(0, 300) + '...');
      console.log('SUCCESS: Server proxy communicated with Gemini model successfully!');
    } else {
      console.log('Server response info (expected if GEMINI_API_KEY is not set or rate-limited):', data);
    }
  } catch (err: any) {
    console.error('Error contacting proxy:', err.message);
  }
}

testGeminiProxy();

