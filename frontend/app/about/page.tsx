
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import {
	Vote,
	Users,
	Target,
	LineChart,
	Calculator,
	CheckSquare,
	LogOut,
	History,
	Square,
	Clock,
	Users2,
	Coins,
  } from "lucide-react"
  import Navbar from "@/components/header/navbar"
  
  export default function Home() {
	return (
	  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
		<Navbar />
		<div className="max-w-7xl mx-auto">
		  {/* Voting Mechanisms Section */}
		  <div className="mb-20">
			<div className="text-center mb-16">
			  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
				Voting Mechanisms
			  </h2>
			  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				Advanced governance systems designed for decentralized decision-making
			  </p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			  {[
				{
				  title: "Conviction Voting",
				  description:
					"Votes accumulate over time, and when enough conviction is reached, the proposal is approved.",
				  icon: <Vote className="w-6 h-6 text-purple-500" />,
				},
				{
				  title: "Liquid Democracy",
				  description:
					"A flexible voting system where participants can either vote directly or delegate their vote to a trusted representative.",
				  icon: <Users className="w-6 h-6 text-blue-500" />,
				},
				{
				  title: "Holographic Consensus",
				  description:
					"Uses prediction markets to highlight and prioritize important proposals for large-scale DAO governance.",
				  icon: <Target className="w-6 h-6 text-indigo-500" />,
				},
				{
				  title: "Futarchy",
				  description:
					"Instead of direct voting, decisions are made based on prediction markets that forecast the best expected outcomes.",
				  icon: <LineChart className="w-6 h-6 text-cyan-500" />,
				},
				{
				  title: "Quadratic Voting",
				  description:
					"Voters allocate points to multiple options, but the cost of voting on a single option increases exponentially to ensure fairness.",
				  icon: <Calculator className="w-6 h-6 text-teal-500" />,
				},
				{
				  title: "Approval Voting",
				  description:
					"Voters can approve multiple choices, and the option with the highest number of approvals wins.",
				  icon: <CheckSquare className="w-6 h-6 text-green-500" />,
				},
			  ].map((item, index) => (
				<Card
				  key={index}
				  className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
				>
				  <CardHeader className="space-y-1">
					<div className="flex items-center space-x-3">
					  {item.icon}
					  <CardTitle className="text-xl">{item.title}</CardTitle>
					</div>
				  </CardHeader>
				  <CardContent>
					<p className="text-gray-600 dark:text-gray-300">{item.description}</p>
				  </CardContent>
				</Card>
			  ))}
			</div>
		  </div>
  
		  {/* Funding Mechanisms Section */}
		  <div>
			<div className="text-center mb-16">
			  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 mb-4">
				Funding Mechanisms
			  </h2>
			  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				Innovative financial systems for sustainable project funding
			  </p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			  {[
				{
				  title: "Rage Quitting",
				  description:
					"A system in Moloch DAO where dissatisfied members can exit the organization and take their proportional share of funds.",
				  icon: <LogOut className="w-6 h-6 text-red-500" />,
				},
				{
				  title: "Retrospective Funding",
				  description:
					"Instead of providing funds upfront, successful projects receive funding after proving their value.",
				  icon: <History className="w-6 h-6 text-orange-500" />,
				},
				{
				  title: "Quadratic Funding",
				  description:
					"Public goods funding method where small contributions receive more matching funds, encouraging decentralized funding.",
				  icon: <Square className="w-6 h-6 text-amber-500" />,
				},
				{
				  title: "Continuous Funding",
				  description:
					"Funds are distributed continuously over time, adjusting based on performance or community signals.",
				  icon: <Clock className="w-6 h-6 text-yellow-500" />,
				},
				{
				  title: "Crowdmatching",
				  description:
					"Participants collectively commit funds, and when contributions reach a threshold, additional matching funds are unlocked.",
				  icon: <Users2 className="w-6 h-6 text-lime-500" />,
				},
				{
				  title: "Harberger Funding",
				  description:
					"A system where project owners pay a continuous tax based on their self-assessed valuation, ensuring ongoing resource allocation.",
				  icon: <Coins className="w-6 h-6 text-emerald-500" />,
				},
			  ].map((item, index) => (
				<Card
				  key={index}
				  className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
				>
				  <CardHeader className="space-y-1">
					<div className="flex items-center space-x-3">
					  {item.icon}
					  <CardTitle className="text-xl">{item.title}</CardTitle>
					</div>
				  </CardHeader>
				  <CardContent>
					<p className="text-gray-600 dark:text-gray-300">{item.description}</p>
				  </CardContent>
				</Card>
			  ))}
			</div>
		  </div>
		</div>
	  </div>
	)
  }
  
  
