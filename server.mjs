/**
 * Local development proxy server for Future Fit AI
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node server.mjs
 *
 * Then set VITE_AI_API_URL=http://localhost:3001/api/chat in your .env file
 * and run `npm run dev` in another terminal.
 */

import http from "node:http"
import https from "node:https"

const PORT = 3001
const API_KEY = process.env.ANTHROPIC_API_KEY

if (!API_KEY) {
  console.error("❌ Missing ANTHROPIC_API_KEY environment variable")
  console.error("   Run with: ANTHROPIC_API_KEY=sk-ant-... node server.mjs")
  process.exit(1)
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method !== "POST" || req.url !== "/api/chat") {
    res.writeHead(404)
    res.end("Not found")
    return
  }

  try {
    // Read request body
    const chunks = []
    for await (const chunk of req) {
      chunks.push(chunk)
    }
    const body = JSON.parse(Buffer.concat(chunks).toString())

    console.log(`\n💬 ${body.messages?.length || 0} messages, step context in system prompt`)

    // Forward to Anthropic
    const postData = JSON.stringify({
      model: body.model || "claude-sonnet-4-6",
      max_tokens: body.max_tokens || 1024,
      system: body.system || "",
      messages: body.messages,
    })

    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: postData,
    })

    const data = await apiRes.json()

    if (!apiRes.ok) {
      console.error("❌ Anthropic API error:", apiRes.status, JSON.stringify(data).slice(0, 200))
      res.writeHead(apiRes.status, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ error: `AI error: ${apiRes.status}` }))
      return
    }

    // Log the AI response for debugging
    const textContent = data.content
      ?.filter((b) => b.type === "text")
      ?.map((b) => b.text)
      ?.join("")
      ?.slice(0, 120)
    console.log(`✅ Response: ${textContent}...`)

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(data))
  } catch (err) {
    console.error("❌ Proxy error:", err.message)
    res.writeHead(500, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Internal server error" }))
  }
})

server.listen(PORT, () => {
  console.log(`\n🚀 Future Fit AI proxy running at http://localhost:${PORT}`)
  console.log(`   API endpoint: http://localhost:${PORT}/api/chat`)
  console.log(`\n   Add to .env: VITE_AI_API_URL=http://localhost:${PORT}/api/chat`)
  console.log(`   Then run: npm run dev\n`)
})
