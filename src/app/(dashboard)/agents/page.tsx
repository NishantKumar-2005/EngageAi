'use client';

import React, { useState } from 'react';
import { Bot, Settings, Plus, Search, Filter, MoreHorizontal, Play, Edit, Trash2, Users, Activity, Zap, Brain } from 'lucide-react';
import { Button } from 'src/components/ui/button';

const AgentsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const agents = [
    {
      id: 1,
      name: "Sales Coach",
      description: "AI agent specialized in analyzing sales calls and providing coaching feedback",
      type: "Sales",
      status: "active",
      usageCount: 45,
      lastUsed: "2 hours ago",
      color: "bg-blue-500",
      capabilities: ["Call Analysis", "Performance Metrics", "Deal Insights"]
    },
    {
      id: 2,
      name: "Meeting Summarizer",
      description: "Automatically generates comprehensive meeting summaries and action items",
      type: "Productivity",
      status: "active",
      usageCount: 128,
      lastUsed: "1 hour ago",
      color: "bg-green-500",
      capabilities: ["Auto Transcription", "Action Items", "Key Insights"]
    },
    {
      id: 3,
      name: "Customer Success Bot",
      description: "Monitors customer health signals during onboarding and support calls",
      type: "Customer Success",
      status: "active",
      usageCount: 67,
      lastUsed: "30 minutes ago",
      color: "bg-purple-500",
      capabilities: ["Sentiment Analysis", "Health Scoring", "Churn Prediction"]
    },
    {
      id: 4,
      name: "Tech Interview Assistant",
      description: "Evaluates technical interviews and provides candidate assessment",
      type: "HR",
      status: "draft",
      usageCount: 12,
      lastUsed: "1 day ago",
      color: "bg-orange-500",
      capabilities: ["Code Review", "Skill Assessment", "Interview Scoring"]
    },
    {
      id: 5,
      name: "Compliance Monitor",
      description: "Ensures calls comply with regulatory requirements and company policies",
      type: "Compliance",
      status: "active",
      usageCount: 89,
      lastUsed: "3 hours ago",
      color: "bg-red-500",
      capabilities: ["Regulation Checking", "Policy Compliance", "Risk Assessment"]
    }
  ];

  const agentTypes = ["All", "Sales", "Productivity", "Customer Success", "HR", "Compliance"];

  const filteredAgents = activeTab === 'all' 
    ? agents 
    : agents.filter(agent => agent.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
          <p className="text-gray-600 mt-1">Create and manage your intelligent meeting assistants</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{agents.length}</p>
              <p className="text-sm text-gray-600">Total Agents</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{agents.filter(a => a.status === 'active').length}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{agents.reduce((sum, agent) => sum + agent.usageCount, 0)}</p>
              <p className="text-sm text-gray-600">Total Usage</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Brain className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">98%</p>
              <p className="text-sm text-gray-600">Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {agentTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type.toLowerCase())}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === type.toLowerCase()
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {type}
              {type !== 'All' && (
                <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  {agents.filter(agent => agent.type.toLowerCase() === type.toLowerCase()).length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${agent.color} rounded-lg flex items-center justify-center`}>
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    agent.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {agent.status}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{agent.description}</p>

            {/* Capabilities */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">CAPABILITIES</p>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.map((capability, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{agent.usageCount} uses</span>
              </div>
              <span>Last used {agent.lastUsed}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-1" />
                Deploy
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for filtered results */}
      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
          <p className="text-gray-600 mb-4">
            {activeTab === 'all' 
              ? "You don't have any agents yet." 
              : `No agents found in the ${activeTab} category.`}
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Agent
          </Button>
        </div>
      )}
    </div>
  );
};

export default AgentsPage;