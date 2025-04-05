"use client"; 

import Link from "next/link"; // Import Link to enable routing
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Coins,
  Users2,
  Calculator,
  LineChart,
  MessageSquare,
  Vote,
  Users,
} from "lucide-react";
import Navbar from "@/components/header/navbar";

export default function SimulationPage() {
  return (
	<>
	  {/* Navbar is rendered first so it isn't affected by the gradient background */}
	  <Navbar />

	  {/* Gradient background starts from this container */}
	  <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500 py-16 px-4 sm:px-6 lg:px-8">
		<div className="max-w-7xl mx-auto space-y-8">
		  {/* Simulation Section */}
		  <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8">
			<div className="mb-20">
			  <div className="text-center mb-16">
				<h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
				  Simulation
				</h2>
				<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				  Tools and models for testing decision-making mechanisms
				</p>
			  </div>

			  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{[
				  {
					title: "Prediction Market",
					description:
					  "Use market-based forecasting to simulate proposal outcomes before implementation.",
					icon: <Coins className="w-6 h-6 text-purple-500" />,
					href: "/prediction",
				  },
				  {
					title: "VCG Auction",
					description:
					  "Each winner pays the loss they cause to others by winning..",
					icon: <Users2 className="w-6 h-6 text-blue-500" />,
					href: "/vcgAuction",
				  },
				  {
					title: "Quadratic Voting",
					description:
					  "Simulate Quadratic Voting to understand how fair representation is ensured.",
					icon: <Vote className="w-6 h-6 text-indigo-500" />,
					href: "/quadraticVoting",
				  },
				].map((item, index) => (
				  <Link key={index} href={item.href} className="block">
					<Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-gray-800 backdrop-blur-sm">
					  <CardHeader className="space-y-1">
						<div className="flex items-center space-x-3">
						  {item.icon}
						  <CardTitle className="text-xl">{item.title}</CardTitle>
						</div>
					  </CardHeader>
					  <CardContent>
						<p className="text-gray-600 dark:text-gray-300">
						  {item.description}
						</p>
					  </CardContent>
					</Card>
				  </Link>
				))}
			  </div>
			</div>
		  </div>

		  {/* Contracts Section */}
		  <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8">
			<div className="text-center mb-16">
			  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-cyan-600 mb-4">
				Contracts
			  </h2>
			  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				On-chain contracts for decentralized governance operations
			  </p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			  {[
				{
				  title: "Prediction Market",
				  description:
					"Smart contracts that settle outcomes based on market signals.",
				  icon: <LineChart className="w-6 h-6 text-cyan-500" />,
				  href: "/predictionMarket",
				},
				{
				  title: "Quadratic Voting",
				  description:
					"On-chain Quadratic Voting mechanism to ensure fair representation.",
				  icon: <Calculator className="w-6 h-6 text-teal-500" />,
				  href: "/quadratic",
				},
				{
				  title: "Liquid Democracy",
				  description:
					"Decentralized Liquid Democracy smart contracts allowing vote delegation.",
				  icon: <Users className="w-6 h-6 text-green-500" />,
				  href: "/liquidDemocracy",
				},
			  ].map((item, index) => (
				<Link key={index} href={item.href} className="block">
				  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-gray-800 backdrop-blur-sm">
					<CardHeader className="space-y-1">
					  <div className="flex items-center space-x-3">
						{item.icon}
						<CardTitle className="text-xl">{item.title}</CardTitle>
					  </div>
					</CardHeader>
					<CardContent>
					  <p className="text-gray-600 dark:text-gray-300">
						{item.description}
					  </p>
					</CardContent>
				  </Card>
				</Link>
			  ))}
			</div>
		  </div>

		  {/* Other Section */}
		  <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 mb-20">
			<div className="text-center mb-16">
			  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 mb-4">
				Other
			  </h2>
			  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				Additional tools and integrations for extended governance
			  </p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			  {[
				 {
				  title: "Grants Review",
				  description:
					"Evaluate different grant proposals through simulation models for funding decisions.",
				  icon: <Users2 className="w-6 h-6 text-blue-500" />,
				  href: "/score",
				},
				{
				  title: "LLM Conversation",
				  description:
					"Engage in natural language dialogues with an AI to explore proposals or governance strategies.",
				  icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
				  href: "/conversation",
				},

				// ----------------------
				// 1) Pinecone LLM (ADDED)
				// ----------------------
				{
				  title: "Pinecone LLM",
				  description:
					"An LLM that learns from past Prediction Market results using Pinecone to enhance forecast accuracy.",
				  icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
				  href: "/evolution",
				},

				// ------------------------------------
				// 2) Hidden Link (ADDED)
				// Appears only when hovered
				// ------------------------------------
				{
				  title: "Hidden Link",
				  description:
					"This link is hidden and appears only when hovered over. Keep it secret!",
				  icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
				  href: "/chacha",
				  hidden: true, // We'll apply extra classes below
				},
			  ].map((item, index) => (
				<Link
				  key={index}
				  href={item.href}
				  className={`block group ${
					item.hidden
					  ? "opacity-0 hover:opacity-100 transition-opacity duration-300"
					  : ""
				  }`}
				>
				  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
					<CardHeader className="space-y-1">
					  <div className="flex items-center space-x-3">
						{item.icon}
						<CardTitle className="text-xl">{item.title}</CardTitle>
					  </div>
					</CardHeader>
					<CardContent>
					  <p className="text-gray-600 dark:text-gray-300">
						{item.description}
					  </p>
					</CardContent>
				  </Card>
				</Link>
			  ))}
			</div>
		  </div>
		</div>
	  </div>
	</>
  );
}