"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { RiSparklingFill } from "react-icons/ri"

export default function Home() {
  const feature = {
    title: "Education and Healthcare",
    description: "Comprehensive AI tools for educational and healthcare needs.",
    href: "/tools/education-healthcare",
    color: "bg-yellow-500/10",
  }

  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">AI Education & Healthcare</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          An AI-powered platform designed to enhance education and healthcare for children through emotion detection,
          voice interaction, and personalized learning.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <Card className="h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${feature.color}`}>
              <RiSparklingFill className="h-6 w-6" />
            </div>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={feature.href}>Explore</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

