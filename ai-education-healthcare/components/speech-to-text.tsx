"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface SpeechToTextProps {
  onResult: (transcript: string) => void
  onListeningChange?: (isListening: boolean) => void
  disabled?: boolean
  children: React.ReactNode
}

// Declare SpeechRecognition
declare var SpeechRecognition: any
declare var webkitSpeechRecognition: any

export function SpeechToText({ onResult, onListeningChange, disabled = false, children }: SpeechToTextProps) {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!("SpeechRecognition" in window) && !("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser")
      return
    }

    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()

    // Configure
    if (recognitionRef.current) {
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      // Event handlers
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")

        if (event.results[0].isFinal) {
          onResult(transcript)
          stopListening()
        }
      }

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        stopListening()
      }

      recognitionRef.current.onend = () => {
        stopListening()
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [onResult])

  const toggleListening = () => {
    if (disabled) return

    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        if (onListeningChange) onListeningChange(true)
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error("Error stopping speech recognition:", error)
      }
    }
    setIsListening(false)
    if (onListeningChange) onListeningChange(false)
  }

  return (
    <Button
      type="button"
      variant={isListening ? "destructive" : "secondary"}
      size="icon"
      onClick={toggleListening}
      disabled={disabled}
      className="relative"
    >
      {children}

      {isListening && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="absolute inset-0 rounded-full bg-destructive/20"
        />
      )}
    </Button>
  )
}

