// "use client";
// import { useRouter } from "next/navigation";
// import { use } from "react";
// import { Button } from "src/components/ui/button";
// import { authClient } from "src/lib/auth-client";

// export const Homeview = ()=> {
//   const router = useRouter();

//   const {data:session} = authClient.useSession();

//   if(!session){
//     return(
//       <p>Loading...</p>
//     )
//   }

//   return(
//     <div className = "flex flex-col p-4 gap-y-4">
//         <p> Logged in as {session.user.name} </p>
//         <br></br>
//         <Button onClick = {()=> authClient.signOut({
//           fetchOptions : {
//             onSuccess : () => router.push("/auth/sign-in")
//            }
//           })
//           }>
//           Sign Out
//         </Button>
//     </div>
//   );
   
// }




'use client';

import React from 'react';
import { Calendar, Clock, Users, Video, Bot, TrendingUp, Activity, Bell, Plus, ArrowRight, Play, Eye } from 'lucide-react';
import { Button } from 'src/components/ui/button';
import { authClient } from 'src/lib/auth-client';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useTRPC } from 'src/trpc/client';
import { da } from 'date-fns/locale';

export const DashboardHome = () => {
  const { data: session } = authClient.useSession();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({text: 'from dashboard'}));
  if (!session) {
    return <p>Loading...</p>;
  }

  const upcomingMeetings = [
    {
      title: "Product Strategy Review",
      time: "10:00 AM",
      participants: 4,
      agent: "Strategy Analyzer"
    },
    {
      title: "Client Onboarding Call",
      time: "2:30 PM",
      participants: 2,
      agent: "Customer Success Bot"
    }
  ];

  const recentActivity = [
    {
      type: "meeting",
      title: "Q4 Planning Session completed",
      time: "2 hours ago",
      status: "completed"
    },
    {
      type: "agent",
      title: "Sales Coach agent updated",
      time: "4 hours ago",
      status: "updated"
    },
    {
      type: "meeting",
      title: "Customer Feedback Review",
      time: "1 day ago",
      status: "completed"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back {data?.greeting}, {session.user.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your AI-powered meetings today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Quick Start
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Meetings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2 from yesterday</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Agents</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
              <div className="flex items-center mt-2">
                <Activity className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">All operational</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Bot className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meeting Hours</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">24.5</p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-gray-600">This month</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Insights</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">47</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600">+12 new insights</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Video className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          <div className="p-6">
            {upcomingMeetings.length > 0 ? (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{meeting.time}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {meeting.participants} participants
                          </span>
                          <span className="flex items-center">
                            <Bot className="w-4 h-4 mr-1" />
                            {meeting.agent}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-1" />
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No meetings scheduled for today</p>
                <Button className="mt-3 bg-green-600 hover:bg-green-700">
                  Schedule Meeting
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'meeting' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'meeting' ? 
                      <Video className="w-4 h-4 text-blue-600" /> : 
                      <Bot className="w-4 h-4 text-green-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-sm">
        <div className="p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
              <Bot className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
              <Eye className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};