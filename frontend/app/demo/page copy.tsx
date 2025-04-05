"use client"

import { useState } from "react"
import { Key } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { WorldIDVerifier } from "@/components/world/WorldIDVerifier"


export default function NFTCreationFlow() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, name: "World Identify" },
    { id: 2, name: "Self Identify" },
  ]

  const handleSetupIdentify = () => {
    setCurrentStep(2)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Delegate voting to AI agents</h1>

      {/* Step Indicator */}
      <div className="flex justify-center items-center mb-12 gap-32">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div 
              className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                step.id === currentStep 
                  ? "bg-black text-white border-black" 
                  : "bg-gray-100 text-gray-400 border-gray-300"
              }`}
            >
              {step.id === currentStep && step.id === 1 && (
                <div className="w-4 h-4 bg-white rounded-full" />
              )}
            </div>
            <span 
              className={`mt-2 text-center ${
                step.id === currentStep ? "font-medium" : "text-gray-500"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Horizontal Line */}
      <div className="w-full h-px bg-gray-200 my-8"></div>

      {/* Step 1: World Identify */}
      <div className="border border-gray-200 rounded-lg p-8 mt-8">
        <h2 className="text-3xl font-bold mb-2">Step 1: World Identify</h2>
        <h2 className="text-sm text-gray-500 mb-2">
  Verify your unique humanity using World ID, powered by biometric authentication.
</h2>

        {/* WorldIDVerifier Component */}
        <div id="world-identify-container">
          <WorldIDVerifier />
        </div>

        <div className="flex justify-end mt-8">
          <Button 
            className="bg-gray-500 hover:bg-gray-600 text-white"
            onClick={handleSetupIdentify}
          >
            <Key className="mr-2 h-4 w-4" /> Setup Identity
          </Button>
        </div>
      </div>
    </div>
  )
}

