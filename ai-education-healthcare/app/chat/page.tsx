"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useChatStore } from "@/store/chat-store"
import { SpeechToText } from "@/components/speech-to-text"
import { ChatMessage } from "@/components/chat-message"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatPage() {
  const { messages, addMessage, isLoading } = useChatStore()
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (input.trim() && !isLoading) {
      addMessage({ role: "user", content: input })

      // Clear input after sending
      setInput("")

      // Simulate AI response (in a real app, this would call an API)
      setTimeout(() => {
        const responses = [
          "I understand your question. Let me think about that...",
          "That's an interesting topic! Here's what I know about it.",
          "Great question! I'd be happy to help with that.",
          "I've analyzed your question and here's what I found.",
          "Based on my knowledge, I can provide this information.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        addMessage({ role: "assistant", content: randomResponse })
      }, 1500)
    }
  }

  const handleSpeechResult = (transcript: string) => {
    setInput(transcript)
    if (transcript.trim()) {
      handleSendMessage()
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">AI Educational Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions by typing or speaking and get accurate responses from our AI assistant.
        </p>
      </motion.div>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Chat with AI</CardTitle>
          <CardDescription>Ask educational questions or get help with various topics</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[50vh] pr-4">
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center p-8"
                >
                  <p className="text-muted-foreground mb-2">No messages yet</p>
                  <p className="text-sm text-muted-foreground">
                    Start a conversation by typing a message or using voice input
                  </p>
                </motion.div>
              ) : (
                messages.map((message, index) => <ChatMessage key={index} message={message} />)
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading || isListening}
              className="flex-1"
            />
            <SpeechToText onResult={handleSpeechResult} onListeningChange={setIsListening} disabled={isLoading}>
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </SpeechToText>
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

