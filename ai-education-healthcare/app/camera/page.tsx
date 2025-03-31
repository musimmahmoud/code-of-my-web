"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { EmotionDisplay } from "@/components/emotion-display"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEmotionDetection } from "@/hooks/use-emotion-detection"

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const { emotion, confidence, isProcessing, detectEmotion } = useEmotionDetection()

  const startCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraError("Could not access camera. Please check permissions and try again.")
      setIsStreaming(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
    }
  }

  const handleDetectEmotion = () => {
    if (videoRef.current) {
      detectEmotion(videoRef.current)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Camera & Emotion Detection</h1>
        <p className="text-muted-foreground">
          Use AI to detect emotions and provide personalized recommendations based on facial expressions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Camera</CardTitle>
              <CardDescription>Allow access to your camera to enable emotion detection</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {cameraError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{cameraError}</AlertDescription>
                </Alert>
              )}

              <div className="relative w-full max-w-2xl mx-auto bg-black rounded-lg overflow-hidden aspect-video mb-4">
                {!isStreaming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <Camera className="h-16 w-16 text-muted-foreground opacity-20" />
                  </div>
                )}
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              </div>

              <div className="flex gap-4 mt-2">
                {!isStreaming ? (
                  <Button onClick={startCamera}>
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={stopCamera}>
                    <CameraOff className="mr-2 h-4 w-4" />
                    Stop Camera
                  </Button>
                )}

                <Button variant="secondary" onClick={handleDetectEmotion} disabled={!isStreaming || isProcessing}>
                  {isProcessing ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Detect Emotion
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <EmotionDisplay emotion={emotion} confidence={confidence} />
        </motion.div>
      </div>
    </div>
  )
}

