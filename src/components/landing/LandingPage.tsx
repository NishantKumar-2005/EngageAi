import React from 'react';
import { Play, Shield, Clock, Search, Video, MessageSquare, CheckCircle, Star } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold">Engage.AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-green-200 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-green-200 transition-colors">Pricing</a>
              <a href="#demo" className="hover:text-green-200 transition-colors">Demo</a>
              <a href="#support" className="hover:text-green-200 transition-colors">Support</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
              onClick={() => window.location.href = 'http://localhost:3000/auth/sign-in'}
              className="text-white hover:text-green-200 transition-colors">
               Sign In
              </button>
              <button 
               onClick={() => window.location.href = 'http://localhost:3000/auth/sign-up'}
              className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg transition-colors font-medium">
                Get Started
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-green-500/30 rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4" />
                <span className="text-sm">AI-Powered Video Calls</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Meet with <br />
                <span className="text-green-300">AI Agents</span>
              </h1>
              
              <p className="text-xl mb-8 text-green-100 leading-relaxed">
                Transform your video calls with intelligent AI agents that understand, 
                transcribe, and summarize every conversation in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2">
                  <span>Start Free Trial</span>
                  <span className="ml-2">→</span>
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors backdrop-blur-sm">
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block flex-1 ml-12">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <p className="text-center text-green-200 mt-4">Hero Video Call Interface</p>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-3">
                  <Search className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need for <br />
              <span className="text-green-600">intelligent meetings</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From real-time AI agents to comprehensive post-call analytics, Engage.AI transforms 
              every aspect of your video communications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom AI Agents */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Smart</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Custom AI Agents</h3>
              <p className="text-gray-600 leading-relaxed">
                Deploy specialized AI agents tailored to your meeting needs, from sales coaching to technical 
                reviews.
              </p>
            </div>
            
            {/* Auto Transcripts */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Automated</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Auto Transcripts</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time transcription and automatic summary generation with key insights and action items.
              </p>
            </div>
            
            {/* Intelligent Search */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Fast</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Search across all your meeting transcripts and find exactly what you're looking for instantly.
              </p>
            </div>
            
            {/* Video Playback */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Complete</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Video Playback</h3>
              <p className="text-gray-600 leading-relaxed">
                Full post-call experience with synchronized video playback and interactive transcripts.
              </p>
            </div>
            
            {/* Context-Aware Chat */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Intelligent</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Context-Aware Chat</h3>
              <p className="text-gray-600 leading-relaxed">
                AI chat that understands your meeting context and can answer questions about past conversations.
              </p>
            </div>
            
            {/* Background Processing */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Efficient</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Background Processing</h3>
              <p className="text-gray-600 leading-relaxed">
                Seamless background jobs handle all the heavy lifting while you focus on your conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-green-500/30 rounded-full px-4 py-2 mb-6">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Limited Time Offer</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Start your AI-powered <br />
                  <span className="text-green-300">meeting revolution</span>
                </h2>
                
                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                  Experience the future of video communications with our 14-day free trial. 
                  No credit card required, setup in under 5 minutes.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span>Deploy AI agents in minutes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span>Automatic meeting transcriptions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span>Intelligent search & summaries</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span>Post-call video analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span>Context-aware AI chat</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span>Enterprise-grade security</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2">
                    <span>Start Free Trial Today</span>
                    <span className="ml-2">→</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors backdrop-blur-sm">
                    Schedule Demo
                  </button>
                </div>
                
                <div className="flex items-center justify-center space-x-8 text-sm text-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>SOC 2 Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>GDPR Ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>99.9% Uptime SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-green-200">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Ready to get started?
            </p>
            <p className="text-green-100 mt-2">
              Join thousands of teams already using Engage.AI to supercharge their meetings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;