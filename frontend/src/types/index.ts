export interface Feature {
  title: string;
  description: string;
}

export interface Brief {
  product_name: string;
  features: Feature[];
}

export interface Agent {
  id: string;
  agent_type: 'customer' | 'competitor' | 'influencer' | 'internal_team';
  demographics: {
    age: number;
    income_level: string;
    location: string;
    education: string;
  };
  psychographics: {
    tech_savviness: number;
    price_sensitivity: number;
    brand_loyalty: number;
  };
  personality_traits: string[];
  influence_score: number;
  attention_tokens: number;
}

export interface SimulationResult {
  session_id: string;
  adoption_score: number;
  visual_indicators: {
    quick_insights: string[];
  };
  top_objections: string[];
  must_fix: string[];
  arena_health: {
    polarization_score: number;
    advocate_to_saboteur_ratio: number;
    viral_path_length: number;
    engagement_density: number;
  };
  agent_interactions: AgentInteraction[];
  timestamp: string;
}

export interface AgentInteraction {
  agent_id: string;
  agent_type: string;
  action: string;
  message: string;
  influence_score: number;
  timestamp: string;
}

export interface ContentAnalysis {
  adoption_score: number;
  visual_indicators: {
    quick_insights: string[];
  };
  top_objections: string[];
  must_fix: string[];
  arena_health: {
    polarization_score: number;
    advocate_to_saboteur_ratio: number;
  };
}

export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  body: string;
  received_at: string;
  is_read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  attendees?: string[];
}

export interface VoiceCommand {
  command: string;
  action: string;
  parameters?: Record<string, any>;
}

export interface SimulationConfig {
  customer_percentage: number;
  competitor_percentage: number;
  influencer_percentage: number;
  internal_team_percentage: number;
  network_topology: 'echo_chamber' | 'loose_network' | 'real_follower';
  rounds: number;
}
