import { useEffect, useRef } from 'react'
import UserMessage from './UserMessage'
import AssistantMessage from './AssistantMessage'

export default function ChatThread({ messages, onAssetClick }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) return null

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 pb-8">
      {messages.map((msg) =>
        msg.role === 'user' ? (
          <UserMessage key={msg.id} content={msg.content} />
        ) : (
          <AssistantMessage key={msg.id} message={msg} onAssetClick={onAssetClick} />
        )
      )}
      <div ref={bottomRef} />
    </div>
  )
}
