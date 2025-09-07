import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  BarChart3, 
  Users, 
  Mail, 
  Calendar, 
  Play, 
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { VoiceInterface } from './VoiceInterface';
import { SimulationPanel } from './SimulationPanel';
import { AgentManagement } from './AgentManagement';
import { EmailIntegration } from './EmailIntegration';
import { CalendarIntegration } from './CalendarIntegration';
import { RealTimeMetrics } from './RealTimeMetrics';
import { ColorPreview } from './ColorPreview';
import { simulationApi, emailApi, calendarApi } from '../services/api';
import { SimulationResult, EmailMessage, CalendarEvent } from '../types';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('simulation');
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const [emailsData, eventsData] = await Promise.all([
        emailApi.getUnreadEmails(),
        calendarApi.getTodayEvents(),
      ]);
      setEmails(emailsData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartSimulation = () => {
    setActiveTab('simulation');
  };

  const handleAnalyzeContent = () => {
    setActiveTab('simulation');
  };

  const handleReadEmails = () => {
    setActiveTab('emails');
  };

  const handleReadSchedule = () => {
    setActiveTab('calendar');
  };

  const handleAddEvent = () => {
    setActiveTab('calendar');
  };

  const handleShowHelp = () => {
    // Show help modal or navigate to help section
    alert('Voice Commands Help:\n\n• "Start simulation" - Run AI simulation\n• "Analyze content" - Analyze current content\n• "Read emails" - Read unread emails\n• "Read schedule" - Read today\'s schedule\n• "Add event" - Add calendar event\n• "Stop listening" - Turn off voice');
  };

  const tabs = [
    { id: 'simulation', label: 'Simulation', icon: Brain },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'emails', label: 'Emails', icon: Mail },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'colors', label: 'Colors', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-milk-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="gradient-blue-green p-2 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-800">Dejavas</h1>
                <p className="text-sm text-beige">AI Marketing Intelligence Arena</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-beige">
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                <span>System Online</span>
              </div>
              <Settings className="w-5 h-5 text-secondary-400 hover:text-primary-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Voice Control</h2>
              <VoiceInterface
                onStartSimulation={handleStartSimulation}
                onAnalyzeContent={handleAnalyzeContent}
                onReadEmails={handleReadEmails}
                onReadSchedule={handleReadSchedule}
                onAddEvent={handleAddEvent}
                onShowHelp={handleShowHelp}
              />
            </div>

            {/* Quick Stats */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Simulations</span>
                  <span className="text-sm font-medium text-primary-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Unread Emails</span>
                  <span className="text-sm font-medium text-red-600">{emails.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Today's Events</span>
                  <span className="text-sm font-medium text-blue-600">{events.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Health</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-secondary-200 mb-6">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-beige hover:text-primary-700 hover:border-secondary-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'simulation' && (
                <SimulationPanel 
                  results={simulationResults}
                  onResultsUpdate={setSimulationResults}
                />
              )}
              
              {activeTab === 'agents' && (
                <AgentManagement />
              )}
              
              {activeTab === 'emails' && (
                <EmailIntegration 
                  emails={emails}
                  onEmailsUpdate={setEmails}
                />
              )}
              
              {activeTab === 'calendar' && (
                <CalendarIntegration 
                  events={events}
                  onEventsUpdate={setEvents}
                />
              )}
              
              {activeTab === 'metrics' && (
                <RealTimeMetrics 
                  simulationResults={simulationResults}
                />
              )}
              
              {activeTab === 'colors' && (
                <ColorPreview />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
