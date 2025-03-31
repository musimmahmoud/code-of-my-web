"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Frown, Meh, Smile, ThermometerSnowflake, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Emotion = "happy" | "sad" | "neutral" | "tired" | "excited" | null

interface EmotionDisplayProps {
  emotion: Emotion
  confidence: number
}

export function EmotionDisplay({ emotion, confidence }: EmotionDisplayProps) {
  const getEmotionIcon = (emotion: Emotion) => {
    switch (emotion) {
      case "happy":
        return <Smile className="h-12 w-12 text-green-500" />
      case "sad":
        return <Frown className="h-12 w-12 text-blue-500" />
      case "neutral":
        return <Meh className="h-12 w-12 text-yellow-500" />
      case "tired":
        return <ThermometerSnowflake className="h-12 w-12 text-purple-500" />
      case "excited":
        return <Zap className="h-12 w-12 text-orange-500" />
      default:
        return <Meh className="h-12 w-12 text-muted-foreground" />
    }
  }

  const getRecommendation = (emotion: Emotion) => {
    switch (emotion) {
      case "happy":
        return "Child appears happy. Great time for learning activities!"
      case "sad":
        return "Child seems sad. Consider engaging in fun activities or offering comfort."
      case "neutral":
        return "Child appears neutral. Good time for routine activities."
      case "tired":
        return "Child looks tired. Consider a rest period or nap time."
      case "excited":
        return "Child is excited. Channel this energy into physical or creative activities."
      default:
        return "No emotion detected. Try again when the child's face is clearly visible."
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Emotion Analysis</CardTitle>
        <CardDescription>AI-detected emotions and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={emotion || "none"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4">{getEmotionIcon(emotion)}</div>

            <h3 className="text-xl font-semibold mb-2 capitalize">{emotion || "No emotion detected"}</h3>

            {emotion && (
              <div className="w-full mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Confidence</span>
                  <span className="text-sm font-medium">{Math.round(confidence)}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
            )}

            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-sm">{getRecommendation(emotion)}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

