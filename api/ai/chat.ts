// Serverless function for Vercel deployment: POST /api/ai/chat
// Proxies AI chat requests to Google Gemini securely without exposing GEMINI_API_KEY to the client bundle.

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, systemInstruction } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server environment' });
    }

    const models = [
      'gemini-2.5-flash',
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-3.5-flash',
      'gemini-flash-latest',
      'gemini-1.5-pro',
      'gemini-3.1-flash-lite'
    ];
    let responseData = null;
    let lastStatus = 500;

    for (const model of models) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 2048,
            },
          }),
        });
        lastStatus = response.status;
        const data = await response.json();
        if (response.ok && data.candidates) {
          responseData = data;
          lastStatus = 200;
          break;
        }
      } catch (err) {
        // try next fallback model
      }
    }

    if (responseData) {
      return res.status(200).json(responseData);
    } else {
      return res.status(lastStatus).json({ error: 'Gemini service unavailable across candidate models' });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error in AI proxy' });
  }
}

