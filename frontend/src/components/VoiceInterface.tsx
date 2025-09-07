import React from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';

interface VoiceInterfaceProps {
  onCommand?: (command: string) => void;
  onStartSimulation?: () => void;
  onAnalyzeContent?: () => void;
  onReadEmails?: () => void;
  onReadSchedule?: () => void;
  onAddEvent?: () => void;
  onShowHelp?: () => void;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({
  onCommand,
  onStartSimulation,
  onAnalyzeContent,
  onReadEmails,
  onReadSchedule,
  onAddEvent,
  onShowHelp,
}) => {
  const {
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
    speak,
  } = useVoice({
    startSimulation: onStartSimulation,
    analyzeContent: onAnalyzeContent,
    readEmails: onReadEmails,
    readSchedule: onReadSchedule,
    addEvent: onAddEvent,
    showHelp: onShowHelp,
  });

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeak = (text: string) => {
    speak(text);
  };

  if (!isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">
          Voice recognition is not supported in this browser. Please use Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Voice Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleListening}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              <span>Stop Listening</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>Start Voice Commands</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleSpeak('Hello! I am your AI assistant. How can I help you today?')}
          className="btn-accent flex items-center space-x-2"
        >
          <Volume2 className="w-5 h-5" />
          <span>Test Voice</span>
        </button>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center space-x-4 text-sm">
        <div className={`flex items-center space-x-2 ${isListening ? 'text-accent-600' : 'text-beige'}`}>
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-accent-500 animate-pulse' : 'bg-secondary-400'}`} />
          <span>{isListening ? 'Listening...' : 'Voice Off'}</span>
        </div>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="bg-beige border border-secondary-200 rounded-lg p-3">
          <p className="text-sm text-beige mb-1">You said:</p>
          <p className="text-neutral-800">{transcript}</p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Voice Commands Help */}
      <div className="card-beige">
        <h3 className="font-medium text-primary-700 mb-2">Available Voice Commands:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-primary-600">
          <div>• "Start simulation" - Run AI simulation</div>
          <div>• "Analyze content" - Analyze current content</div>
          <div>• "Read emails" - Read unread emails</div>
          <div>• "Read schedule" - Read today's schedule</div>
          <div>• "Add event" - Add calendar event</div>
          <div>• "Stop listening" - Turn off voice</div>
        </div>
      </div>
    </div>
  );
};
