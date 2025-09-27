'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, Plus, Search, Filter, MoreHorizontal, Play, Eye, Download } from 'lucide-react';
import { Button } from 'src/components/ui/button';

const MeetingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingMeetings = [
    {
      id: 1,
      title: "Product Strategy Review",
      participants: ["Sarah Chen", "Mike Johnson", "Alex Rivera"],
      scheduledTime: "2024-09-28 10:00 AM",
      duration: "1 hour",
      aiAgent: "Strategy Analyzer",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Client Onboarding Call",
      participants: ["Emma Wilson", "David Brown"],
      scheduledTime: "2024-09-28 2:30 PM",
      duration: "45 minutes",
      aiAgent: "Customer Success Bot",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Engineering Standup",
      participants: ["Team Alpha", "Team Beta"],
      scheduledTime: "2024-09-29 9:00 AM",
      duration: "30 minutes",
      aiAgent: "Dev Assistant",
      status: "scheduled"
    }
  ];

  const pastMeetings = [
    {
      id: 4,
      title: "Q4 Planning Session",
      participants: ["Leadership Team"],
      completedTime: "2024-09-26 3:00 PM",
      duration: "2 hours",
      aiAgent: "Planning Assistant",
      status: "completed",
      hasRecording: true,
      hasTranscript: true
    },
    {
      id: 5,
      title: "Customer Feedback Review",
      participants: ["Product Team"],
      completedTime: "2024-09-25 11:00 AM",
      duration: "1.5 hours",
      aiAgent: "Feedback Analyzer",
      status: "completed",
      hasRecording: true,
      hasTranscript: true
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
          <p className="text-gray-600 mt-1">Manage your AI-powered video conferences</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">12</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">24h</p>
              <p className="text-sm text-gray-600">Total Time</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">47</p>
              <p className="text-sm text-gray-600">Participants</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Video className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">8</p>
              <p className="text-sm text-gray-600">AI Insights</p>
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
            placeholder="Search meetings..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming ({upcomingMeetings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'past'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past ({pastMeetings.length})
          </button>
        </nav>
      </div>

      {/* Meeting List */}
      <div className="space-y-4">
        {activeTab === 'upcoming' && upcomingMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {meeting.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {meeting.scheduledTime}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {meeting.participants.join(', ')}
                  </div>
                  <div className="flex items-center">
                    <Video className="w-4 h-4 mr-1" />
                    {meeting.aiAgent}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-1" />
                  Join
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'past' && pastMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                    {meeting.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {meeting.completedTime}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {meeting.participants.join(', ')}
                  </div>
                  <div className="flex items-center">
                    <Video className="w-4 h-4 mr-1" />
                    {meeting.aiAgent}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {meeting.hasRecording && (
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                )}
                {meeting.hasTranscript && (
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Transcript
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingsPage;