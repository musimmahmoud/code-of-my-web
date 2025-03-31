"use client"

import { FileText, Home } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { RiSparklingFill } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { state } = useSidebar()
  const [showRightButton, setShowRightButton] = useState(false)

  const mainMenuItems = [
    {
      title: "Home",
      icon: Home,
      href: "/",
    },
    {
      title: "Education & Healthcare",
      icon: RiSparklingFill,
      href: "/tools/education-healthcare",
    },
  ]

  const handleDocumentClick = () => {
    // Navigate to a documentation page or open a modal
    router.push("/documentation")
  }

  return (
    <div className="relative group">
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="flex items-center justify-between p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="AI Edu-Health Logo" fill className="object-contain" />
            </div>
          </motion.div>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {mainMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                  <Link href={item.href}>
                    {item.title === "Education & Healthcare" ? (
                      <RiSparklingFill className="h-4 w-4" />
                    ) : (
                      <item.icon className="h-4 w-4" />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-center">
            <ModeToggle />
          </div>
          <div className="flex items-center justify-center">
            <Button variant="outline" size="icon" onClick={handleDocumentClick} className="bg-background border-border">
              <FileText className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Documentation</span>
            </Button>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Right side button that appears on hover */}
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        onMouseEnter={() => setShowRightButton(true)}
        onMouseLeave={() => setShowRightButton(false)}
      >
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-l-none rounded-r-md bg-black border-gray-700"
          onClick={() => router.push("/documentation")}
        >
          <FileText className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  )
}

