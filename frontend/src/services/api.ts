import axios from 'axios';
import { Brief, SimulationResult, ContentAnalysis, EmailMessage, CalendarEvent, SimulationConfig } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simulation API
export const simulationApi = {
  uploadBrief: async (brief: Brief) => {
    const response = await api.post('/upload-brief/', brief);
    return response.data;
  },

  configureAgents: async (sessionId: string, config: SimulationConfig) => {
    const response = await api.post(`/configure-agents/${sessionId}`, config);
    return response.data;
  },

  runSimulation: async (sessionId: string) => {
    const response = await api.post(`/simulate/${sessionId}`);
    return response.data;
  },

  getReport: async (sessionId: string): Promise<SimulationResult> => {
    const response = await api.get(`/report/${sessionId}`);
    return response.data;
  },

  rerunSimulation: async (sessionId: string) => {
    const response = await api.post(`/rerun/${sessionId}`);
    return response.data;
  },
};

// Content Analysis API
export const contentApi = {
  analyzeContent: async (url: string): Promise<ContentAnalysis> => {
    const response = await api.post('/analyze-content/', { url });
    return response.data;
  },

  analyzeText: async (text: string): Promise<ContentAnalysis> => {
    const response = await api.post('/extension/analyze-text', { text });
    return response.data;
  },
};

// Email Integration API (mock for now)
export const emailApi = {
  getUnreadEmails: async (): Promise<EmailMessage[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        from: 'john.doe@company.com',
        subject: 'Q4 Marketing Strategy Review',
        body: 'We need to discuss the Q4 marketing strategy and budget allocation...',
        received_at: new Date().toISOString(),
        is_read: false,
        priority: 'high',
      },
      {
        id: '2',
        from: 'sarah.smith@client.com',
        subject: 'Product Launch Feedback',
        body: 'The new product launch was successful, but we need to address some concerns...',
        received_at: new Date(Date.now() - 3600000).toISOString(),
        is_read: false,
        priority: 'medium',
      },
    ];
  },

  markAsRead: async (_emailId: string) => {
    // Mock implementation
    return { success: true };
  },

  respondToEmail: async (_emailId: string, _response: string) => {
    // Mock implementation
    return { success: true, message: 'Response sent successfully' };
  },
};

// Calendar Integration API (mock for now)
export const calendarApi = {
  getTodayEvents: async (): Promise<CalendarEvent[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        title: 'Team Standup',
        start: new Date().toISOString(),
        end: new Date(Date.now() + 1800000).toISOString(),
        description: 'Daily team standup meeting',
        attendees: ['john@company.com', 'jane@company.com'],
      },
      {
        id: '2',
        title: 'Product Demo',
        start: new Date(Date.now() + 3600000).toISOString(),
        end: new Date(Date.now() + 5400000).toISOString(),
        description: 'Demo of new features to stakeholders',
        location: 'Conference Room A',
      },
    ];
  },

  addEvent: async (_event: Omit<CalendarEvent, 'id'>) => {
    // Mock implementation
    return { success: true, id: Math.random().toString(36).substr(2, 9) };
  },

  cancelEvent: async (_eventId: string) => {
    // Mock implementation
    return { success: true };
  },
};

// Health check
export const healthApi = {
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
