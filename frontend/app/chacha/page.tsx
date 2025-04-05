"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Github, Star, Search, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

export default function MainPage() {
  const tracksRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const leaderboardRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl">
                Kessynuma
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => scrollToSection(tracksRef)} className="text-sm font-medium hover:text-blue-600">
                Tracks
              </button>
              <button onClick={() => scrollToSection(projectsRef)} className="text-sm font-medium hover:text-blue-600">
                Projects
              </button>
              <button
                onClick={() => scrollToSection(leaderboardRef)}
                className="text-sm font-medium hover:text-blue-600"
              >
                Leaderboard
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                BUIDL
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Original Content (FundPG Section) */}
      <div className="pt-16">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link href="/fundpg" className="inline-flex items-center text-white hover:text-blue-100 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              FundPG
            </Link>
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  FUNDPG
                </Badge>
                <Link href="#" className="text-blue-600 hover:underline text-sm">
                  What is FundPG?
                </Link>
              </div>
              <h1 className="text-3xl font-bold mb-4">Blockchain & AI Track</h1>
              <p className="text-gray-600">Create scalable and innovative projects leveraging Mantle.</p>

              <Tabs defaultValue="submissions" className="mt-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="judges">Judges</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions (26)</TabsTrigger>
                  <TabsTrigger value="comments">Comments (2)</TabsTrigger>
                  <TabsTrigger value="ideas">Ideas (0)</TabsTrigger>
                </TabsList>
                <TabsContent value="submissions" className="mt-6">
                  <div className="flex gap-8">
                    <div className="flex-1">
                      <div className="relative mb-4">
                        <input
                          type="search"
                          placeholder="Search by product name"
                          className="w-full pl-4 pr-10 py-2 border rounded-lg"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Project Cards */}
                      {[
                        {
                          title: "Gallery AI nft event app V2",
                          description:
                            "ERC-7007 enables AI-generated art in galleries, fostering closer artist-fan connections.",
                          points: 45,
                          ratings: {
                            technicality: 26,
                            originality: 28,
                            practicality: 27,
                            usability: 26,
                            wow: 26,
                          },
                        },
                        {
                          title: "Addy, the focus App",
                          description: "Addy is a motivation tool designed for developers to help lock in.",
                          points: 45,
                          ratings: {
                            technicality: 26,
                            originality: 28,
                            practicality: 28,
                            usability: 26,
                            wow: 27,
                          },
                        },
                      ].map((project, i) => (
                        <Card key={i} className="p-6 mb-4 hover:shadow-lg transition-shadow">
                          <div className="flex gap-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-xl font-semibold">{project.title}</h3>
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                  {project.points} points
                                </Badge>
                              </div>
                              <p className="text-gray-600 mb-4">{project.description}</p>
                              <Link
                                href="#"
                                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                              >
                                <Github className="w-4 h-4" />
                                GitHub
                              </Link>

                              <div className="grid grid-cols-2 gap-4 mt-4">
                                {Object.entries(project.ratings).map(([key, value]) => (
                                  <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 capitalize">{key}</span>
                                    <div className="flex items-center">
                                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                      <span>{value}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Sidebar */}
                    <div className="w-80">
                      <Card className="p-6">
                        <h3 className="font-semibold mb-4">Grant</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600">Pool</p>
                            <p>0 USDC</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Distribution Network</p>
                            <p>Mantle</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Judging Criteria</h4>
                            <ul className="space-y-2 text-sm">
                              <li>• Technicality</li>
                              <li>• Originality</li>
                              <li>• Practicality</li>
                              <li>• Usability (UI/UX)</li>
                              <li>• WOW factor</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">#Mantle</Badge>
                              <Badge variant="secondary">#AI</Badge>
                              <Badge variant="secondary">#Art</Badge>
                              <Badge variant="secondary">#OnChain</Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      {/* Tracks Section */}
      <div ref={tracksRef} className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Active Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((track) => (
              <Card key={track} className="hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      ACTIVE
                    </Badge>
                    <span className="text-sm text-gray-500">3 days left</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Blockchain Track {track}</h3>
                  <p className="text-gray-600 mb-4">Build innovative solutions using blockchain technology</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Prize Pool: <span className="font-semibold">5,000 USDC</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div ref={projectsRef} className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <div className="relative">
              <input type="search" placeholder="Search projects..." className="pl-10 pr-4 py-2 border rounded-lg" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <Card key={project} className="hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full" />
                    <div>
                      <h3 className="font-semibold">Project {project}</h3>
                      <p className="text-sm text-gray-500">by Developer Name</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">An innovative solution for decentralized applications</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">#Web3</Badge>
                    <Badge variant="secondary">#DeFi</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div ref={leaderboardRef} className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Top Builders</h2>
          <Card>
            <div className="divide-y">
              {[1, 2, 3, 4, 5].map((position) => (
                <div key={position} className="p-6 flex items-center gap-6">
                  <span className="text-2xl font-bold text-gray-400">#{position}</span>
                  <div className="w-12 h-12 bg-blue-100 rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Builder Name</h3>
                    <p className="text-sm text-gray-500">5 projects • 3 tracks completed</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">1,234</div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

