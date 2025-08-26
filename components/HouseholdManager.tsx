"use client"

import { useState, useEffect } from "react"

interface Member {
  id: string
  name: string | null
  email: string
}

interface Household {
  id: string
  name: string
  joinCode: string
  wasteGoal: number
  members: Member[]
}

export default function HouseholdManager() {
  const [household, setHousehold] = useState<Household | null>(null)
  const [createForm, setCreateForm] = useState({
    name: "",
    wasteGoal: "10",
  })
  const [joinCode, setJoinCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"create" | "join">("create")

  useEffect(() => {
    fetchHousehold()
  }, [])

  const fetchHousehold = async () => {
    try {
      const response = await fetch("/api/household")
      if (response.ok) {
        const data = await response.json()
        setHousehold(data.household)
      }
    } catch (error) {
      console.error("Error fetching household:", error)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/household/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      })

      if (response.ok) {
        const data = await response.json()
        setHousehold(data.household)
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error("Error creating household:", error)
      alert("Failed to create household")
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/household/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ joinCode }),
      })

      if (response.ok) {
        const data = await response.json()
        setHousehold(data.household)
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error("Error joining household:", error)
      alert("Failed to join household")
    } finally {
      setLoading(false)
    }
  }

  if (household) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6">Your Household</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-3">{household.name}</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Join Code:</span>{" "}
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">{household.joinCode}</span>
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Waste Reduction Goal:</span> {household.wasteGoal}%
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Members ({household.members.length})</h4>
            <ul className="space-y-2">
              {household.members.map((member) => (
                <li key={member.id} className="flex items-center">
                  <div className="w-8 h-8 bg-recipe-primary rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                    {(member.name || member.email)[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Share the join code <span className="font-mono font-semibold">{household.joinCode}</span> with
            family members to collaborate on reducing food waste together!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Household Management</h3>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "create"
              ? "bg-recipe-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Create Household
        </button>
        <button
          onClick={() => setActiveTab("join")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "join"
              ? "bg-recipe-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Join Household
        </button>
      </div>
      
      {activeTab === "create" ? (
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Household Name
            </label>
            <input
              type="text"
              value={createForm.name}
              onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
              className="input-field"
              placeholder="e.g., The Smith Family"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waste Reduction Goal (%)
            </label>
            <input
              type="number"
              value={createForm.wasteGoal}
              onChange={(e) => setCreateForm({ ...createForm, wasteGoal: e.target.value })}
              className="input-field"
              min="5"
              max="50"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Set a target for reducing food waste compared to average households
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Creating..." : "Create Household"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Join Code
            </label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="input-field font-mono"
              placeholder="Enter 8-character code"
              maxLength={8}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Ask your household creator for the join code
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Joining..." : "Join Household"}
          </button>
        </form>
      )}
    </div>
  )
}