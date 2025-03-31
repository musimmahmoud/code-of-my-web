"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Typing animation for assistant messages
  useEffect(() => {
    if (message.role === "assistant") {
      setIsTyping(true)
      let i = 0
      const text = message.content
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    } else {
      setDisplayedText(message.content)
    }
  }, [message])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3 mb-4", message.role === "user" ? "justify-end" : "justify-start")}
    >
      {message.role === "assistant" && (
        <Avatar>
          <AvatarFallback className="bg-primary/10">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "px-4 py-2 rounded-lg max-w-[80%]",
          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        )}
      >
        {message.role === "assistant" ? (
          <div className={isTyping ? "typing-animation" : ""}>{displayedText}</div>
        ) : (
          message.content
        )}
      </div>

      {message.role === "user" && (
        <Avatar>
          <AvatarFallback className="bg-primary/10">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  )
}

