"use client"

import { create } from "zustand"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  addMessage: (message: Message) => void
  setIsLoading: (isLoading: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) => {
    set((state) => {
      // If it's a user message, set loading to true
      if (message.role === "user") {
        return {
          messages: [...state.messages, message],
          isLoading: true,
        }
      }
      // If it's an assistant message, set loading to false
      return {
        messages: [...state.messages, message],
        isLoading: false,
      }
    })
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  clearMessages: () => set({ messages: [] }),
}))

