"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function MathSolverPage() {
  const [problem, setProblem] = useState("")
  const [solution, setSolution] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSolve = async () => {
    if (!problem.trim()) return

    setIsLoading(true)
    setSolution(null)

    // Simulate AI processing
    setTimeout(() => {
      // This is where you would call an actual AI model
      // For demo purposes, we'll provide a simple solution
      const sampleSolutions = [
        `Step 1: Identify the equation type\nThis is a quadratic equation in the form ax² + bx + c = 0\n\nStep 2: Use the quadratic formula\nx = (-b ± √(b² - 4ac)) / 2a\n\nStep 3: Substitute values and solve\nx = 5 or x = -2`,
        `Step 1: Factor the expression\n2x² - 7x + 3 = (2x - 1)(x - 3)\n\nStep 2: Set each factor equal to zero\n2x - 1 = 0 or x - 3 = 0\n\nStep 3: Solve for x\nx = 1/2 or x = 3`,
        `Step 1: Simplify the left side\n3(x + 2) - 4 = 3x + 6 - 4 = 3x + 2\n\nStep 2: Solve for x\n3x + 2 = 14\n3x = 12\nx = 4`,
      ]

      setSolution(sampleSolutions[Math.floor(Math.random() * sampleSolutions.length)])
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
        <h1 className="text-3xl font-bold mb-2">Math Problem Solver</h1>
        <p className="text-muted-foreground">Get step-by-step solutions to math problems using AI.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Math Problem</CardTitle>
              <CardDescription>Type any math problem and our AI will solve it step by step</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Example: Solve for x: 2x + 3 = 7"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="min-h-[200px]"
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleSolve} disabled={!problem.trim() || isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Solving...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Solve Problem
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
              <CardTitle>Solution</CardTitle>
              <CardDescription>Step-by-step explanation of the solution</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[200px]">
                  <RefreshCw className="h-8 w-8 animate-spin mb-4" />
                  <p className="text-muted-foreground">Solving your problem...</p>
                </div>
              ) : solution ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-line min-h-[200px] p-4 bg-secondary rounded-lg"
                >
                  {solution}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                  <Calculator className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                  <p className="text-muted-foreground">
                    Enter a math problem and click "Solve Problem" to see the solution
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

