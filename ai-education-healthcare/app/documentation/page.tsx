"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn how to use the AI Education & Healthcare platform effectively.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-6 w-6" />
              <CardTitle>Platform Documentation</CardTitle>
            </div>
            <CardDescription>Comprehensive guide to using all features of the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <h2>Getting Started</h2>
              <p>
                Welcome to the AI Education & Healthcare platform. This documentation will help you navigate and use all
                the features effectively.
              </p>

              <h3>Navigation</h3>
              <p>The platform has a simple navigation structure:</p>
              <ul>
                <li>
                  <strong>Home</strong> - The main dashboard with an overview of available tools
                </li>
                <li>
                  <strong>Education & Healthcare</strong> - Access to educational and healthcare AI tools
                </li>
              </ul>

              <h3>Using the Education & Healthcare Tool</h3>
              <p>The Education & Healthcare tool provides two main functions:</p>
              <ol>
                <li>
                  <strong>Education Tab</strong> - Ask any educational questions and receive AI-powered recommendations
                  tailored for children's learning.
                </li>
                <li>
                  <strong>Healthcare Tab</strong> - Submit health-related queries to get guidance and recommendations
                  (remember that this does not replace professional medical advice).
                </li>
              </ol>

              <h2>Tips for Best Results</h2>
              <p>To get the most out of the platform:</p>
              <ul>
                <li>Be specific in your queries for more targeted responses</li>
                <li>Use complete sentences to provide context</li>
                <li>For educational queries, mention the age group or grade level when relevant</li>
                <li>For health queries, provide relevant symptoms and duration</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

