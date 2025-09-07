import { useState, useEffect, useCallback } from 'react';

interface VoiceState {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  error: string | null;
}

interface VoiceCommands {
  [key: string]: (() => void) | undefined;
}

export const useVoice = (commands: VoiceCommands = {}) => {
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    isSupported: false,
    transcript: '',
    error: null,
  });

  const [recognition, setRecognition] = useState<any | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onstart = () => {
          setState(prev => ({ ...prev, isListening: true, error: null }));
        };

        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          setState(prev => ({
            ...prev,
            transcript: finalTranscript || interimTranscript,
          }));

          // Process commands when we have final results
          if (finalTranscript) {
            processVoiceCommand(finalTranscript.toLowerCase().trim());
          }
        };

        recognitionInstance.onerror = (event: any) => {
          setState(prev => ({
            ...prev,
            error: `Speech recognition error: ${event.error}`,
            isListening: false,
          }));
        };

        recognitionInstance.onend = () => {
          setState(prev => ({ ...prev, isListening: false }));
        };

        setRecognition(recognitionInstance);
        setState(prev => ({ ...prev, isSupported: true }));
      } else {
        setState(prev => ({ ...prev, error: 'Speech recognition not supported' }));
      }
    }
  }, []);

  const processVoiceCommand = useCallback((transcript: string) => {
    // Common voice command patterns
    const commandPatterns = {
      'start simulation': () => commands.startSimulation?.(),
      'run simulation': () => commands.startSimulation?.(),
      'analyze content': () => commands.analyzeContent?.(),
      'read emails': () => commands.readEmails?.(),
      'summarize emails': () => commands.summarizeEmails?.(),
      'read schedule': () => commands.readSchedule?.(),
      'today schedule': () => commands.readSchedule?.(),
      'add event': () => commands.addEvent?.(),
      'stop listening': () => stopListening(),
      'stop voice': () => stopListening(),
      'help': () => commands.showHelp?.(),
    };

    // Find matching command
    for (const [pattern, action] of Object.entries(commandPatterns)) {
      if (transcript.includes(pattern)) {
        action();
        break;
      }
    }
  }, [commands]);

  const startListening = useCallback(() => {
    if (recognition && !state.isListening) {
      recognition.start();
    }
  }, [recognition, state.isListening]);

  const stopListening = useCallback(() => {
    if (recognition && state.isListening) {
      recognition.stop();
    }
  }, [recognition, state.isListening]);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    speak,
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
