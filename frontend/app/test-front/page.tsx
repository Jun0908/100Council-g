"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea";


// Type definitions
interface Project {
  id: string
  name: string
  category: string
  description: string
  impact: string
  budget: number
  votes: number
  confidence: number
  creator: string
}

// Utility function to format addresses
const formatShortAddress = (address: string): string => {
  if (!address || address.length < 10) return address || ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [voteLoading, setVoteLoading] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [agentModalOpen, setAgentModalOpen] = useState(false)
  const [agentPreferences, setAgentPreferences] = useState("")
  const [votingPower, setVotingPower] = useState(100)

  const router = useRouter()

  useEffect(() => {
    // Simulate fetching data
    const fetchProjects = async () => {
      try {
        setLoading(true)
        // Mock data for demonstration
        const mockProjects: Project[] = [
          {
            id: "proj1",
            name: "Community Garden Network",
            category: "Environment",
            description:
              "Create a network of community gardens in underserved neighborhoods to improve food security and community engagement.",
            impact: "Potential to serve 5,000+ residents with fresh produce and create 20 part-time jobs.",
            budget: 75000,
            votes: 230,
            confidence: 78,
            creator: "0x1234567890abcdef1234567890abcdef12345678",
          },
          {
            id: "proj2",
            name: "Youth Coding Initiative",
            category: "Education",
            description: "Provide coding education and mentorship to 500 students from low-income backgrounds.",
            impact: "Increase tech career readiness for underrepresented youth with 85% program completion rate.",
            budget: 120000,
            votes: 310,
            confidence: 82,
            creator: "0x2345678901abcdef2345678901abcdef23456789",
          },
          {
            id: "proj3",
            name: "Mental Health Access Platform",
            category: "Healthcare",
            description:
              "Develop a digital platform connecting residents to mental health resources and affordable care options.",
            impact: "Estimated to help 2,000+ individuals access mental health services in the first year.",
            budget: 95000,
            votes: 275,
            confidence: 71,
            creator: "0x3456789012abcdef3456789012abcdef34567890",
          },
          {
            id: "proj4",
            name: "Renewable Energy Microgrids",
            category: "Infrastructure",
            description:
              "Install solar-powered microgrids in three vulnerable communities to improve energy resilience.",
            impact: "Reduce energy costs by 30% for 1,200 households and decrease carbon emissions.",
            budget: 250000,
            votes: 190,
            confidence: 68,
            creator: "0x4567890123abcdef4567890123abcdef45678901",
          },
          {
            id: "proj5",
            name: "Public Art Revitalization",
            category: "Culture",
            description:
              "Commission local artists to create public art installations in 10 neighborhoods to revitalize public spaces.",
            impact: "Increase community pride, reduce vandalism by 25%, and support 30+ local artists.",
            budget: 85000,
            votes: 220,
            confidence: 75,
            creator: "0x5678901234abcdef5678901234abcdef56789012",
          },
          {
            id: "proj6",
            name: "Accessible Transportation Network",
            category: "Mobility",
            description:
              "Expand accessible transportation options for elderly and disabled residents through a community-run shuttle service.",
            impact: "Provide 10,000+ rides annually to medical appointments and essential services.",
            budget: 180000,
            votes: 260,
            confidence: 79,
            creator: "0x6789012345abcdef6789012345abcdef67890123",
          },
        ]

        setProjects(mockProjects)
      } catch (error) {
        console.error("Error retrieving project data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()

    // Simulate authentication state
    const checkAuth = () => {
      // For demo purposes, we'll just set a random state
      setIsSignedIn(false)
    }

    checkAuth()
  }, [])

  // Handle voting
  const handleVote = async (projectId: string) => {
    try {
      setVoteLoading(projectId)

      // Simulate voting process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update project votes
      setProjects(
        projects.map((project) => {
          if (project.id === projectId) {
            return {
              ...project,
              votes: project.votes + Math.floor(Math.sqrt(votingPower)),
              confidence: Math.min(100, project.confidence + Math.floor(Math.random() * 5)),
            }
          }
          return project
        }),
      )

      // Reset voting power
      setVotingPower(Math.max(0, votingPower - 100))

      console.log("Vote cast successfully", { projectId })
    } catch (error) {
      console.error("Failed to cast vote", { error, projectId })
    } finally {
      setVoteLoading(null)
    }
  }

  // Handle project details
  const handleViewProject = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setModalOpen(false)
    setSelectedProject(null)
  }

  // Close agent modal
  const closeAgentModal = () => {
    setAgentModalOpen(false)
  }

  // Configure AI agent
  const configureAgent = () => {
    setAgentModalOpen(true)
  }

  // Deploy AI agent
  const deployAgent = async () => {
    try {
      // Simulate agent deployment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success
      setAgentModalOpen(false)
      setIsSignedIn(true)
      setVotingPower(500) // Give voting power after agent deployment

      // Update UI to show signed in state
      setTimeout(() => {
        // Force re-render
        setProjects((projects) => [...projects])
      }, 100)
    } catch (error) {
      console.error("Error deploying agent", error)
    }
  }

  const handleClick = () => {
    router.push('/demo') // ← 遷移先
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
          Council of 100
        </h1>
        <p className="text-xl max-w-2xl mb-8">
          Public Goods Funding Simulation with AI Agents. Delegate your voting rights to AI agents that represent your
          values in local governance.
        </p>

        {isSignedIn ? (
          <div className="flex gap-4">
            <Button onClick={() => router.push("/propose")} size="lg" className="px-8">
              Propose New Project
            </Button>
            <Button onClick={() => router.push("/my-agent")} variant="outline" size="lg">
              Manage My AI Agent
            </Button>
          </div>
        ) : (
          <div className="p-4 bg-accent/50 rounded-lg max-w-xl">
            <Button onClick={handleClick} className="mt-2">
             Go to App
            </Button>
          </div>
        )}
      </div>

      {/* Problem & Solution Section - More Visual Approach */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <Card className="overflow-hidden border-red-200">
            <div className="bg-red-50 p-4 border-b border-red-100">
              <div className="flex items-center">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 mr-3">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">The Problem</h2>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                <div className="p-4 border-b sm:border-b-0 sm:border-r border-red-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                      <path
                        d="M12 6V18M12 6L7 11M12 6L17 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">Top-Down Allocation</h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="h-2 w-16 bg-gray-200 rounded-full">
                      <div className="h-2 w-10 bg-red-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-sm font-bold ml-2">65%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Municipal budgets fail to reflect community needs</p>
                </div>

                <div className="p-4 border-b sm:border-b-0 border-red-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                      <path
                        d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">Low Civic Participation</h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="h-2 w-16 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <span className="text-sm font-bold ml-2">30%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Citizens rarely participate in budgeting</p>
                </div>

                <div className="p-4 border-b sm:border-b-0 sm:border-r border-red-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M18.2218 11.4274C18.3868 11.7764 18.4697 11.9508 18.5 12.1397C18.5302 12.3286 18.5302 12.5189 18.5 12.7078C18.4697 12.8967 18.3868 13.0711 18.2218 13.4201L17.2306 15.6977C17.0613 16.0637 16.9766 16.2466 16.8484 16.3878C16.7349 16.5139 16.5931 16.6122 16.4342 16.6759C16.2547 16.7484 16.0516 16.7484 15.6455 16.7484H8.35453C7.94841 16.7484 7.74535 16.7484 7.56583 16.6759C7.40685 16.6122 7.26509 16.5139 7.15163 16.3878C7.02338 16.2466 6.93874 16.0637 6.76946 15.6977L5.77821 13.4201C5.6132 13.0711 5.5307 12.8967 5.50044 12.7078C5.47017 12.5189 5.47017 12.3286 5.50044 12.1397C5.5307 11.9508 5.6132 11.7764 5.77821 11.4274L6.76946 9.14985C6.93874 8.78385 7.02338 8.60085 7.15163 8.45969C7.26509 8.33358 7.40685 8.23525 7.56583 8.17159C7.74535 8.09905 7.94841 8.09905 8.35453 8.09905H15.6455C16.0516 8.09905 16.2547 8.09905 16.4342 8.17159C16.5931 8.23525 16.7349 8.33358 16.8484 8.45969C16.9766 8.60085 17.0613 8.78385 17.2306 9.14985L18.2218 11.4274Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M7 20L17 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">Low Voting Quality</h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="h-2 w-16 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="text-sm font-bold ml-2">45%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Minority voices are underrepresented</p>
                </div>

                <div className="p-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M14.5 9.5L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9.5 9.5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">Web3 Governance Barriers</h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="h-2 w-16 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <span className="text-sm font-bold ml-2">70%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Blockchain governance experiments fail</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solution Card */}
          <Card className="overflow-hidden border-green-200">
            <div className="bg-green-50 p-4 border-b border-green-100">
              <div className="flex items-center">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 mr-3">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Our Solution</h2>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                <div className="p-4 border-b sm:border-b-0 sm:border-r border-green-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                      <path
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 9L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M16 9L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">AI Agent Delegation</h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      24/7 Representation
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Agents represent your values in governance</p>
                </div>

                <div className="p-4 border-b sm:border-b-0 border-green-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                      <path
                        d="M2 9H6C7.10457 9 8 8.10457 8 7V3H2V9Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 21H6C7.10457 21 8 20.1046 8 19V15H2V21Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 3V7C14 8.10457 14.8954 9 16 9H20V3H14Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 21H20V15H14V21Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 3V3.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 15V15.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3V3.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 15V15.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">Advanced Voting</h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      QV + VCG + Futarchy
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Reduces manipulation in voting systems</p>
                </div>

                <div className="p-4 border-b sm:border-b-0 sm:border-r border-green-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                      <path d="M2 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M19 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 5V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 22V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M5 5L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 17L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M5 19L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 7L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path
                        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">Prediction Markets</h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Outcome-Based</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Fund projects based on predicted success</p>
                </div>

                <div className="p-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                      <path
                        d="M16 3H21V8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 21H3V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 16V21H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 8V3H8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M16 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1">Continuous Participation</h3>
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <span className="text-xs font-bold">+</span>
                      <span className="text-xs ml-1">300%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Increased civic engagement through AI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Governance Mechanisms Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Governance Mechanisms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg p-6 bg-gradient-to-br from-purple-500/10 to-violet-500/10 flex flex-col items-center text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center bg-white shadow-sm mb-4">
              <svg
                className="h-8 w-8 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Quadratic Voting</h3>
            <p className="text-sm text-muted-foreground">
              Cost of votes increases quadratically, preventing wealth concentration and giving voice to minority
              preferences.
            </p>
          </div>

          <div className="rounded-lg p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex flex-col items-center text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center bg-white shadow-sm mb-4">
              <svg
                className="h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">VCG Mechanism</h3>
            <p className="text-sm text-muted-foreground">
              Vickrey-Clarke-Groves mechanism incentivizes truthful revelation of preferences for optimal resource
              allocation.
            </p>
          </div>

          <div className="rounded-lg p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex flex-col items-center text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center bg-white shadow-sm mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 20V10"></path>
                <path d="M18 20V4"></path>
                <path d="M6 20v-6"></path>
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Futarchy</h3>
            <p className="text-sm text-muted-foreground">
              Prediction markets determine which projects are most likely to achieve desired outcomes before funding.
            </p>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700 mr-2">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                    {selectedProject.confidence}% Confidence
                  </span>
                </div>
                <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
              </div>
              <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p>{selectedProject.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Expected Impact</h3>
                <p>{selectedProject.impact}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Requested Budget</h3>
                  <p className="text-xl font-bold">${selectedProject.budget.toLocaleString()}</p>
                </div>

                <div className="bg-muted/30 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Votes</h3>
                  <p className="text-xl font-bold">{selectedProject.votes}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Proposed By</h3>
                <p>{selectedProject.creator}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-purple-700 mb-1">AI Agent Analysis</h3>
                <p className="mb-2">This project has a high probability of success based on:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Strong alignment with community needs</li>
                  <li>Realistic budget for proposed outcomes</li>
                  <li>Clear implementation strategy</li>
                  <li>Measurable impact metrics</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Your voting power:</span> {votingPower} credits
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleVote(selectedProject.id)
                    closeModal()
                  }}
                  disabled={votingPower < 100}
                >
                  Cast Votes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Agent Configuration Modal */}
      {agentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-w-full">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/10 mb-3">
                <svg
                  className="h-8 w-8 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1-1h-1v1a2 2 0 0 1-2-2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                  <circle cx="7" cy="14" r="1"></circle>
                  <circle cx="17" cy="14" r="1"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-1">Configure Your AI Agent</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Customize your AI agent to represent your values and priorities in governance decisions.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Priorities</label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {["Environment", "Education", "Healthcare", "Infrastructure", "Culture", "Mobility"].map(
                    (category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={category}
                          className="rounded text-purple-600 focus:ring-purple-600"
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ),
                  )}
                </div>
              </div>

			  <div>
  <label className="block text-sm font-medium mb-1">Agent Preferences</label>
  <Textarea
    value={agentPreferences}
    onChange={(e) => setAgentPreferences(e.target.value)}
    placeholder="Describe your values and preferences for public goods funding..."
    className="min-h-[100px] resize-none"
  />
  <p className="text-xs text-muted-foreground mt-1">
    Example: "Prioritize projects that benefit underserved communities and have long-term sustainability."
  </p>
</div>

              <div className="bg-muted/40 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-2">How Your AI Agent Works</h4>
                <p className="text-xs text-muted-foreground">
                  Your AI agent will analyze proposals, participate in governance, and allocate resources based on your
                  preferences. It uses advanced mechanisms like Quadratic Voting and prediction markets to make optimal
                  decisions.
                </p>
              </div>

              <div className="flex justify-between gap-2 mt-6">
                <Button variant="outline" className="flex-1" onClick={closeAgentModal}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={deployAgent}>
                  Deploy My AI Agent
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center">
                <svg
                  className="h-3 w-3 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Your data is secure and your agent only acts according to your preferences
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


