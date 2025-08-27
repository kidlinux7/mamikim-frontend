'use client'
import { useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'How can I help you today?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    })
    const data = await res.json()
    setMessages([...newMessages, data.reply])
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="border p-4 rounded h-[400px] overflow-y-auto bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.content}
          </div>
        ))}
        {loading && <div className="text-gray-400">Typing...</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}
