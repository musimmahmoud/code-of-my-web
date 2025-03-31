"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RiBookOpenLine, RiHealthBookLine, RiBrainLine } from "react-icons/ri"

export default function EducationHealthcarePage() {
  const [activeTab, setActiveTab] = useState("education")
  const [educationQuery, setEducationQuery] = useState("")
  const [healthQuery, setHealthQuery] = useState("")
  const [educationResult, setEducationResult] = useState<string | null>(null)
  const [healthResult, setHealthResult] = useState<string | null>(null)
  const [isEducationLoading, setIsEducationLoading] = useState(false)
  const [isHealthLoading, setIsHealthLoading] = useState(false)

  const handleEducationSubmit = () => {
    if (!educationQuery.trim()) return

    setIsEducationLoading(true)
    setEducationResult(null)

    // Simulate AI processing
    setTimeout(() => {
      const educationResponses = [
        "Based on your query, I recommend focusing on interactive learning methods. Children often learn best when they're engaged through activities, games, and visual aids. Try incorporating more hands-on experiences related to this topic.",
        "This is an excellent educational topic! To enhance understanding, consider breaking it down into smaller, manageable concepts. Use real-world examples that the child can relate to, and encourage questions to promote critical thinking.",
        "For this educational area, I suggest a multi-sensory approach. Combine visual materials with auditory explanations and tactile activities. This approach caters to different learning styles and reinforces understanding through multiple pathways.",
      ]

      setEducationResult(educationResponses[Math.floor(Math.random() * educationResponses.length)])
      setIsEducationLoading(false)
    }, 2000)
  }

  const handleHealthSubmit = () => {
    if (!healthQuery.trim()) return

    setIsHealthLoading(true)
    setHealthResult(null)

    // Simulate AI processing
    setTimeout(() => {
      const healthResponses = [
        "Based on your health query, I recommend maintaining a consistent sleep schedule and ensuring proper hydration. These fundamental aspects of health often have a significant impact on overall wellbeing and can help address many common issues.",
        "For this health concern, regular monitoring is important. Keep track of any changes or patterns, and ensure a balanced diet rich in essential nutrients. If symptoms persist for more than a few days, consulting with a healthcare professional is advised.",
        "This health topic requires attention to both physical and emotional aspects. Ensure the child feels comfortable discussing how they feel, and maintain open communication. Regular check-ins about their wellbeing can help identify issues early.",
      ]

      setHealthResult(healthResponses[Math.floor(Math.random() * healthResponses.length)])
      setIsHealthLoading(false)
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
        <h1 className="text-3xl font-bold mb-2">Education and Healthcare</h1>
        <p className="text-muted-foreground">Comprehensive AI tools for educational and healthcare needs.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Integrated Learning and Health Support</CardTitle>
          <CardDescription>Get personalized recommendations for both educational and healthcare needs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="education" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="education">
                <RiBookOpenLine className="mr-2 h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger value="health">
                <RiHealthBookLine className="mr-2 h-4 w-4" />
                Healthcare
              </TabsTrigger>
            </TabsList>

            <TabsContent value="education" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="education-query">Educational Query</Label>
                <Textarea
                  id="education-query"
                  placeholder="Example: How can I help my child understand fractions better?"
                  value={educationQuery}
                  onChange={(e) => setEducationQuery(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <Button
                onClick={handleEducationSubmit}
                disabled={!educationQuery.trim() || isEducationLoading}
                className="w-full"
              >
                {isEducationLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <RiBrainLine className="mr-2 h-4 w-4" />
                    Get Educational Recommendation
                  </>
                )}
              </Button>

              {isEducationLoading ? (
                <div className="flex flex-col items-center justify-center h-40">
                  <RefreshCw className="h-8 w-8 animate-spin mb-4" />
                  <p className="text-muted-foreground">Analyzing your educational query...</p>
                </div>
              ) : educationResult ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-secondary rounded-lg">
                  {educationResult}
                </motion.div>
              ) : null}
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="health-query">Health Query</Label>
                <Textarea
                  id="health-query"
                  placeholder="Example: What should I do if my child has a mild fever?"
                  value={healthQuery}
                  onChange={(e) => setHealthQuery(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <Button onClick={handleHealthSubmit} disabled={!healthQuery.trim() || isHealthLoading} className="w-full">
                {isHealthLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <RiHealthBookLine className="mr-2 h-4 w-4" />
                    Get Health Recommendation
                  </>
                )}
              </Button>

              {isHealthLoading ? (
                <div className="flex flex-col items-center justify-center h-40">
                  <RefreshCw className="h-8 w-8 animate-spin mb-4" />
                  <p className="text-muted-foreground">Analyzing your health query...</p>
                </div>
              ) : healthResult ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Alert className="mb-4">
                    <AlertTitle>Important Note</AlertTitle>
                    <AlertDescription className="text-xs">
                      This is an AI-generated recommendation and should not replace professional medical advice. Always
                      consult a healthcare provider for proper diagnosis and treatment.
                    </AlertDescription>
                  </Alert>
                  <div className="p-4 bg-secondary rounded-lg">{healthResult}</div>
                </motion.div>
              ) : null}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

