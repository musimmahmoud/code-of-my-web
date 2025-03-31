"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Stethoscope, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HealthGuidePage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const symptoms = [
    { id: "fever", label: "Fever" },
    { id: "cough", label: "Cough" },
    { id: "headache", label: "Headache" },
    { id: "sore-throat", label: "Sore Throat" },
    { id: "fatigue", label: "Fatigue" },
    { id: "runny-nose", label: "Runny Nose" },
    { id: "body-ache", label: "Body Ache" },
    { id: "nausea", label: "Nausea" },
  ]

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
    )
  }

  const handleGetRecommendation = () => {
    if (selectedSymptoms.length === 0) return

    setIsLoading(true)
    setRecommendation(null)

    // Simulate AI processing
    setTimeout(() => {
      // This is where you would call an actual AI model
      // For demo purposes, we'll provide sample recommendations
      let recommendation = ""

      if (selectedSymptoms.includes("fever")) {
        if (selectedSymptoms.includes("cough") || selectedSymptoms.includes("sore-throat")) {
          recommendation =
            "The symptoms suggest a possible respiratory infection. Ensure the child gets plenty of rest and fluids. Monitor temperature regularly. If fever persists for more than 2 days or exceeds 102°F (38.9°C), consult a healthcare provider."
        } else {
          recommendation =
            "Fever could indicate various conditions. Ensure the child stays hydrated and gets adequate rest. Use appropriate fever-reducing medication as advised by a healthcare provider. If fever persists for more than 24 hours, seek medical advice."
        }
      } else if (selectedSymptoms.includes("headache") && selectedSymptoms.includes("fatigue")) {
        recommendation =
          "These symptoms might indicate tiredness or mild dehydration. Ensure the child gets adequate rest and drinks plenty of fluids. Reduce screen time and provide a calm environment. If symptoms persist or worsen, consult a healthcare provider."
      } else if (selectedSymptoms.includes("runny-nose") || selectedSymptoms.includes("cough")) {
        recommendation =
          "These symptoms suggest a common cold. Ensure the child gets plenty of rest and fluids. A humidifier may help ease congestion. If symptoms worsen or persist beyond a week, consult a healthcare provider."
      } else {
        recommendation =
          "Based on the selected symptoms, it's recommended to monitor the child's condition. Ensure they get adequate rest and stay hydrated. If symptoms persist or worsen, consult a healthcare provider for proper diagnosis and treatment."
      }

      setRecommendation(recommendation)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Health Guidance</h1>
        <p className="text-muted-foreground">Get AI-powered health recommendations based on symptoms.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Select Symptoms</CardTitle>
              <CardDescription>Check all symptoms the child is experiencing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {symptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom.id}
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={() => toggleSymptom(symptom.id)}
                    />
                    <Label htmlFor={symptom.id}>{symptom.label}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGetRecommendation}
                disabled={selectedSymptoms.length === 0 || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Get Recommendation
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Health Recommendation</CardTitle>
              <CardDescription>AI-generated health guidance based on symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                  <RefreshCw className="h-8 w-8 animate-spin mb-4" />
                  <p className="text-muted-foreground">Analyzing symptoms...</p>
                </div>
              ) : recommendation ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Alert className="mb-4">
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription className="text-xs">
                      This is an AI-generated recommendation and should not replace professional medical advice. Always
                      consult a healthcare provider for proper diagnosis and treatment.
                    </AlertDescription>
                  </Alert>
                  <div className="p-4 bg-secondary rounded-lg">{recommendation}</div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                  <Stethoscope className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                  <p className="text-muted-foreground">
                    Select symptoms and click "Get Recommendation" to receive health guidance
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

