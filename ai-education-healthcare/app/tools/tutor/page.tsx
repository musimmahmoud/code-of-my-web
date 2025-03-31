"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"

export default function TutorPage() {
  const [question, setQuestion] = useState("")
  const [subject, setSubject] = useState("math")
  const [ageGroup, setAgeGroup] = useState("elementary")
  const [answer, setAnswer] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const subjects = [
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
  ]

  const ageGroups = [
    { value: "preschool", label: "Preschool (3-5 years)" },
    { value: "elementary", label: "Elementary (6-10 years)" },
    { value: "middle", label: "Middle School (11-13 years)" },
    { value: "high", label: "High School (14-18 years)" },
  ]

  const handleGetAnswer = () => {
    if (!question.trim()) return

    setIsLoading(true)
    setAnswer(null)

    // Simulate AI processing
    setTimeout(() => {
      // This is where you would call an actual AI model
      // For demo purposes, we'll provide sample answers based on subject and age group
      let tutorAnswer = ""

      if (subject === "math") {
        if (ageGroup === "elementary") {
          tutorAnswer =
            "Let's break this down into simple steps!\n\n1. First, we need to understand what the problem is asking.\n2. We can use counting or simple addition to solve this.\n3. Remember, math is like a puzzle - we just need to find the right pieces!\n\nDoes that make sense? Let me know if you'd like me to explain further!"
        } else {
          tutorAnswer =
            "Great question! Let's approach this systematically:\n\n1. We'll start by identifying the key variables and what we're solving for.\n2. Next, we'll apply the appropriate formula or method.\n3. Then we'll work through the calculations step by step.\n\nDoes this approach make sense to you? I can elaborate on any part that's unclear."
        }
      } else if (subject === "science") {
        tutorAnswer =
          "That's a fascinating scientific question! Here's how we can understand it:\n\n1. Let's look at the basic principles involved.\n2. We can observe how these principles apply in the real world.\n3. Scientists have discovered that this phenomenon works because of specific interactions.\n\nScience is all about curiosity and discovery - keep asking great questions!"
      } else {
        tutorAnswer =
          "I'm happy to help with your question! Here's what I know about this topic:\n\n1. The key concepts we need to understand are...\n2. When we apply these concepts to your question...\n3. The answer becomes clear when we consider...\n\nLearning is a journey, and you're asking exactly the right questions to deepen your understanding!"
      }

      setAnswer(tutorAnswer)
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
        <h1 className="text-3xl font-bold mb-2">AI Tutor</h1>
        <p className="text-muted-foreground">Get personalized learning assistance from our AI tutor.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Ask Your Question</CardTitle>
              <CardDescription>Our AI tutor will provide a personalized answer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.value} value={subject.value}>
                            {subject.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age-group">Age Group</Label>
                    <Select value={ageGroup} onValueChange={setAgeGroup}>
                      <SelectTrigger id="age-group">
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map((age) => (
                          <SelectItem key={age.value} value={age.value}>
                            {age.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="question">Your Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Example: How do I solve fractions?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGetAnswer} disabled={!question.trim() || isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Answer
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
              <CardTitle>Tutor's Answer</CardTitle>
              <CardDescription>Personalized explanation based on your question</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                  <RefreshCw className="h-8 w-8 animate-spin mb-4" />
                  <p className="text-muted-foreground">Your tutor is thinking...</p>
                </div>
              ) : answer ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-line min-h-[300px] p-4 bg-secondary rounded-lg"
                >
                  {answer}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                  <Sparkles className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                  <p className="text-muted-foreground">
                    Ask a question and click "Get Answer" to receive a personalized explanation
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

