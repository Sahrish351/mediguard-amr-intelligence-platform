import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      // Secure local server-side middleware for Gemini API calls to ensure
      // the key is never exposed to the client bundle.
      {
        name: 'secure-gemini-server-proxy',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith('/api/ai/chat') && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const { prompt, systemInstruction } = JSON.parse(body);
                  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
                  if (!apiKey) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'GEMINI_API_KEY not configured on server' }));
                    return;
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
                  let responseData: any = null;
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
                          }
                        })
                      });
                      lastStatus = response.status;
                      const data = await response.json();
                      if (response.ok && data.candidates) {
                        responseData = data;
                        lastStatus = 200;
                        break;
                      }
                    } catch (e) {
                      // try next model
                    }
                  }

                  if (responseData) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(responseData));
                  } else {
                    res.statusCode = lastStatus;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Gemini service temporarily unavailable across candidate models' }));
                  }
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message || 'Server error proxying to Gemini' }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
    },
  };
});

