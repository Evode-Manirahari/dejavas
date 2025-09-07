import React, { useState } from 'react';
import { 
  Play, 
  Upload, 
  Settings, 
  BarChart3, 
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { simulationApi, contentApi } from '../services/api';
import { Brief, SimulationResult, SimulationConfig } from '../types';
import { motion } from 'framer-motion';

interface SimulationPanelProps {
  results: SimulationResult[];
  onResultsUpdate: (results: SimulationResult[]) => void;
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({
  results,
  onResultsUpdate,
}) => {
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [brief, setBrief] = useState<Brief>({
    product_name: '',
    features: [{ title: '', description: '' }],
  });
  const [config, setConfig] = useState<SimulationConfig>({
    customer_percentage: 60,
    competitor_percentage: 20,
    influencer_percentage: 10,
    internal_team_percentage: 10,
    network_topology: 'loose_network',
    rounds: 5,
  });
  const [analysisUrl, setAnalysisUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleUploadBrief = async () => {
    if (!brief.product_name.trim()) {
      alert('Please enter a product name');
      return;
    }

    try {
      const response = await simulationApi.uploadBrief(brief);
      setCurrentSession(response.session_id);
      alert('Brief uploaded successfully! You can now configure agents and run the simulation.');
    } catch (error) {
      console.error('Failed to upload brief:', error);
      alert('Failed to upload brief. Please try again.');
    }
  };

  const handleConfigureAgents = async () => {
    if (!currentSession) {
      alert('Please upload a brief first');
      return;
    }

    try {
      await simulationApi.configureAgents(currentSession, config);
      alert('Agents configured successfully!');
    } catch (error) {
      console.error('Failed to configure agents:', error);
      alert('Failed to configure agents. Please try again.');
    }
  };

  const handleRunSimulation = async () => {
    if (!currentSession) {
      alert('Please upload a brief and configure agents first');
      return;
    }

    setIsRunning(true);
    try {
      const response = await simulationApi.runSimulation(currentSession);
      const report = await simulationApi.getReport(currentSession);
      onResultsUpdate([report, ...results]);
      alert('Simulation completed successfully!');
    } catch (error) {
      console.error('Failed to run simulation:', error);
      alert('Failed to run simulation. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleAnalyzeContent = async () => {
    if (!analysisUrl.trim()) {
      alert('Please enter a URL to analyze');
      return;
    }

    try {
      const result = await contentApi.analyzeContent(analysisUrl);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Failed to analyze content:', error);
      alert('Failed to analyze content. Please try again.');
    }
  };

  const addFeature = () => {
    setBrief(prev => ({
      ...prev,
      features: [...prev.features, { title: '', description: '' }],
    }));
  };

  const updateFeature = (index: number, field: 'title' | 'description', value: string) => {
    setBrief(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      ),
    }));
  };

  const removeFeature = (index: number) => {
    setBrief(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Product Brief Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Product Brief</h3>
          <button
            onClick={handleUploadBrief}
            className="btn-primary flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Brief</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={brief.product_name}
              onChange={(e) => setBrief(prev => ({ ...prev, product_name: e.target.value }))}
              className="input-field"
              placeholder="Enter product name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="space-y-3">
              {brief.features.map((feature, index) => (
                <div key={index} className="flex space-x-3">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    className="input-field flex-1"
                    placeholder="Feature title..."
                  />
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                    className="input-field flex-2"
                    placeholder="Feature description..."
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addFeature}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                + Add Feature
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Configuration */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Agent Configuration</h3>
          <button
            onClick={handleConfigureAgents}
            className="btn-secondary flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Configure Agents</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Agents: {config.customer_percentage}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={config.customer_percentage}
              onChange={(e) => setConfig(prev => ({ ...prev, customer_percentage: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Competitor Agents: {config.competitor_percentage}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={config.competitor_percentage}
              onChange={(e) => setConfig(prev => ({ ...prev, competitor_percentage: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Influencer Agents: {config.influencer_percentage}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={config.influencer_percentage}
              onChange={(e) => setConfig(prev => ({ ...prev, influencer_percentage: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Internal Team: {config.internal_team_percentage}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={config.internal_team_percentage}
              onChange={(e) => setConfig(prev => ({ ...prev, internal_team_percentage: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Network Topology
            </label>
            <select
              value={config.network_topology}
              onChange={(e) => setConfig(prev => ({ ...prev, network_topology: e.target.value as any }))}
              className="input-field"
            >
              <option value="echo_chamber">Echo Chamber</option>
              <option value="loose_network">Loose Network</option>
              <option value="real_follower">Real Follower</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Simulation Rounds: {config.rounds}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={config.rounds}
              onChange={(e) => setConfig(prev => ({ ...prev, rounds: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Simulation Controls</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleRunSimulation}
              disabled={isRunning || !currentSession}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isRunning ? 'Running...' : 'Run Simulation'}</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            {currentSession 
              ? `Session ID: ${currentSession}` 
              : 'Upload a brief to start a new simulation session'
            }
          </p>
        </div>
      </div>

      {/* Content Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Analysis</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="url"
              value={analysisUrl}
              onChange={(e) => setAnalysisUrl(e.target.value)}
              className="input-field flex-1"
              placeholder="Enter URL to analyze..."
            />
            <button
              onClick={handleAnalyzeContent}
              className="btn-primary flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analyze</span>
            </button>
          </div>

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Analysis Results</h4>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  analysisResult.adoption_score >= 70 
                    ? 'bg-accent-100 text-accent-800'
                    : analysisResult.adoption_score >= 50
                    ? 'bg-secondary-100 text-secondary-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {analysisResult.adoption_score.toFixed(1)}% Adoption Score
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">Quick Insights</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysisResult.visual_indicators.quick_insights.map((insight: string, index: number) => (
                      <li key={index}>• {insight}</li>
                    ))}
                  </ul>
                </div>
                
                {analysisResult.top_objections.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Top Objections</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {analysisResult.top_objections.map((objection: string, index: number) => (
                        <li key={index}>• {objection}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Simulation Results */}
      {results.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <motion.div
                key={result.session_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Session: {result.session_id}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(result.timestamp).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.adoption_score >= 70 
                      ? 'bg-accent-100 text-accent-800'
                      : result.adoption_score >= 50
                      ? 'bg-secondary-100 text-secondary-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.adoption_score.toFixed(1)}% Score
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Polarization: {(result.arena_health.polarization_score * 100).toFixed(1)}%
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Advocate Ratio: {result.arena_health.advocate_to_saboteur_ratio.toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
