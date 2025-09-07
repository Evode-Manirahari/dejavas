import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Settings,
  Brain,
  Target,
  MessageSquare,
  Building
} from 'lucide-react';
import { Agent } from '../types';
import { motion } from 'framer-motion';

export const AgentManagement: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    agent_type: 'customer',
    demographics: {
      age: 25,
      income_level: 'middle',
      location: 'urban',
      education: 'college',
    },
    psychographics: {
      tech_savviness: 0.5,
      price_sensitivity: 0.5,
      brand_loyalty: 0.5,
    },
    personality_traits: [],
    influence_score: 0.5,
    attention_tokens: 100,
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockAgents: Agent[] = [
      {
        id: '1',
        agent_type: 'customer',
        demographics: {
          age: 28,
          income_level: 'middle',
          location: 'urban',
          education: 'college',
        },
        psychographics: {
          tech_savviness: 0.8,
          price_sensitivity: 0.6,
          brand_loyalty: 0.4,
        },
        personality_traits: ['early_adopter', 'enthusiast'],
        influence_score: 0.7,
        attention_tokens: 100,
      },
      {
        id: '2',
        agent_type: 'competitor',
        demographics: {
          age: 35,
          income_level: 'high',
          location: 'urban',
          education: 'graduate',
        },
        psychographics: {
          tech_savviness: 0.9,
          price_sensitivity: 0.3,
          brand_loyalty: 0.8,
        },
        personality_traits: ['strategic', 'analytical'],
        influence_score: 0.9,
        attention_tokens: 150,
      },
      {
        id: '3',
        agent_type: 'influencer',
        demographics: {
          age: 24,
          income_level: 'middle',
          location: 'urban',
          education: 'college',
        },
        psychographics: {
          tech_savviness: 0.9,
          price_sensitivity: 0.4,
          brand_loyalty: 0.2,
        },
        personality_traits: ['trendy', 'social'],
        influence_score: 0.8,
        attention_tokens: 120,
      },
    ];
    setAgents(mockAgents);
  }, []);

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'customer': return <Users className="w-5 h-5" />;
      case 'competitor': return <Target className="w-5 h-5" />;
      case 'influencer': return <MessageSquare className="w-5 h-5" />;
      case 'internal_team': return <Building className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getAgentColor = (type: string) => {
    switch (type) {
      case 'customer': return 'bg-primary-100 text-primary-800';
      case 'competitor': return 'bg-red-100 text-red-800';
      case 'influencer': return 'bg-secondary-100 text-secondary-800';
      case 'internal_team': return 'bg-accent-100 text-accent-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const handleCreateAgent = () => {
    if (newAgent.agent_type && newAgent.demographics && newAgent.psychographics) {
      const agent: Agent = {
        id: Math.random().toString(36).substr(2, 9),
        agent_type: newAgent.agent_type as any,
        demographics: newAgent.demographics,
        psychographics: newAgent.psychographics,
        personality_traits: newAgent.personality_traits || [],
        influence_score: newAgent.influence_score || 0.5,
        attention_tokens: newAgent.attention_tokens || 100,
      };
      setAgents([...agents, agent]);
      setIsCreating(false);
      setNewAgent({
        agent_type: 'customer',
        demographics: {
          age: 25,
          income_level: 'middle',
          location: 'urban',
          education: 'college',
        },
        psychographics: {
          tech_savviness: 0.5,
          price_sensitivity: 0.5,
          brand_loyalty: 0.5,
        },
        personality_traits: [],
        influence_score: 0.5,
        attention_tokens: 100,
      });
    }
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id));
    if (selectedAgent?.id === id) {
      setSelectedAgent(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Agent Management</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Agent</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Agents</h3>
            <div className="space-y-2">
              {agents.map((agent) => (
                <motion.div
                  key={agent.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                    selectedAgent?.id === agent.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getAgentIcon(agent.agent_type)}
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {agent.agent_type.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-500">
                          Age: {agent.demographics.age} | Influence: {(agent.influence_score * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAgent(agent);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAgent(agent.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="lg:col-span-2">
          {selectedAgent ? (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getAgentIcon(selectedAgent.agent_type)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {selectedAgent.agent_type.replace('_', ' ')} Agent
                    </h3>
                    <p className="text-sm text-gray-500">ID: {selectedAgent.id}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAgentColor(selectedAgent.agent_type)}`}>
                  {(selectedAgent.influence_score * 100).toFixed(0)}% Influence
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Demographics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Demographics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Age:</span>
                      <span className="text-sm font-medium">{selectedAgent.demographics.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Income:</span>
                      <span className="text-sm font-medium capitalize">{selectedAgent.demographics.income_level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium capitalize">{selectedAgent.demographics.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Education:</span>
                      <span className="text-sm font-medium capitalize">{selectedAgent.demographics.education}</span>
                    </div>
                  </div>
                </div>

                {/* Psychographics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Psychographics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Tech Savviness</span>
                        <span className="text-sm font-medium">{(selectedAgent.psychographics.tech_savviness * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${selectedAgent.psychographics.tech_savviness * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Price Sensitivity</span>
                        <span className="text-sm font-medium">{(selectedAgent.psychographics.price_sensitivity * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-600 h-2 rounded-full" 
                          style={{ width: `${selectedAgent.psychographics.price_sensitivity * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Brand Loyalty</span>
                        <span className="text-sm font-medium">{(selectedAgent.psychographics.brand_loyalty * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${selectedAgent.psychographics.brand_loyalty * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personality Traits */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Personality Traits</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.personality_traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {trait.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Attention Tokens */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Attention Tokens</h4>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary-600 h-3 rounded-full" 
                      style={{ width: `${(selectedAgent.attention_tokens / 200) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {selectedAgent.attention_tokens}/200
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Agent</h3>
                <p className="text-gray-500">Choose an agent from the list to view detailed information</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Agent Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Agent</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agent Type</label>
                <select
                  value={newAgent.agent_type}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, agent_type: e.target.value as any }))}
                  className="input-field"
                >
                  <option value="customer">Customer</option>
                  <option value="competitor">Competitor</option>
                  <option value="influencer">Influencer</option>
                  <option value="internal_team">Internal Team</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={newAgent.demographics?.age || 25}
                  onChange={(e) => setNewAgent(prev => ({
                    ...prev,
                    demographics: { ...prev.demographics!, age: parseInt(e.target.value) }
                  }))}
                  className="input-field"
                  min="18"
                  max="80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Influence Score</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={newAgent.influence_score || 0.5}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, influence_score: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 text-center">
                  {(newAgent.influence_score || 0.5) * 100}%
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateAgent}
                className="btn-primary flex-1"
              >
                Create Agent
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
