import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  X,
  Volume2,
  Play,
  Pause
} from 'lucide-react';
import { CalendarEvent } from '../types';
import { calendarApi } from '../services/api';
import { motion } from 'framer-motion';

interface CalendarIntegrationProps {
  events: CalendarEvent[];
  onEventsUpdate: (events: CalendarEvent[]) => void;
}

export const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({
  events,
  onEventsUpdate,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id'>>({
    title: '',
    start: new Date().toISOString().slice(0, 16),
    end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
    description: '',
    location: '',
    attendees: [],
  });

  const handleCreateEvent = async () => {
    if (!newEvent.title.trim()) {
      alert('Please enter an event title');
      return;
    }

    try {
      const response = await calendarApi.addEvent(newEvent);
      const createdEvent: CalendarEvent = {
        ...newEvent,
        id: response.id,
      };
      onEventsUpdate([...events, createdEvent]);
      setIsCreating(false);
      setNewEvent({
        title: '',
        start: new Date().toISOString().slice(0, 16),
        end: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        description: '',
        location: '',
        attendees: [],
      });
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  const handleCancelEvent = async (eventId: string) => {
    try {
      await calendarApi.cancelEvent(eventId);
      onEventsUpdate(events.filter(event => event.id !== eventId));
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error('Failed to cancel event:', error);
      alert('Failed to cancel event. Please try again.');
    }
  };

  const readScheduleAloud = () => {
    if (events.length === 0) {
      const message = 'You have no events scheduled for today.';
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
      return;
    }

    const schedule = events.map(event => {
      const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${event.title} at ${startTime}${event.location ? ` in ${event.location}` : ''}`;
    }).join('. ');

    const message = `You have ${events.length} events today. ${schedule}`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
    }
  };

  const readEventAloud = (event: CalendarEvent) => {
    const startTime = new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const message = `${event.title} from ${startTime} to ${endTime}${event.location ? ` at ${event.location}` : ''}${event.description ? `. ${event.description}` : ''}`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const upcomingEvents = events.filter(event => new Date(event.start) >= new Date()).sort((a, b) => 
    new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Calendar Integration</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={readScheduleAloud}
            disabled={isReading}
            className="btn-primary flex items-center space-x-2"
          >
            {isReading ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isReading ? 'Stop' : 'Read Schedule'}</span>
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Today's Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-3">
            {upcomingEvents.slice(0, 3).map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">
                      {formatTime(event.start)} - {formatTime(event.end)}
                      {event.location && ` • ${event.location}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    readEventAloud(event);
                  }}
                  className="p-1 text-gray-400 hover:text-primary-600"
                >
                  <Play className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            {upcomingEvents.length > 3 && (
              <p className="text-sm text-gray-500 text-center">
                +{upcomingEvents.length - 3} more events
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No events scheduled for today</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Events</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                    selectedEvent?.id === event.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </p>
                      {event.location && (
                        <p className="text-xs text-gray-500 truncate">{event.location}</p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelEvent(event.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="lg:col-span-2">
          {selectedEvent ? (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEvent.title}</h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(selectedEvent.start)} • {formatTime(selectedEvent.start)} - {formatTime(selectedEvent.end)}
                  </p>
                </div>
                <button
                  onClick={() => readEventAloud(selectedEvent)}
                  disabled={isReading}
                  className="p-2 text-gray-400 hover:text-primary-600 disabled:opacity-50"
                >
                  {isReading ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              {selectedEvent.description && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.location && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-700">{selectedEvent.location}</p>
                  </div>
                </div>
              )}

              {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Attendees</h4>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-wrap gap-1">
                      {selectedEvent.attendees.map((attendee, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          {attendee}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => handleCancelEvent(selectedEvent.id)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel Event</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Event</h3>
                <p className="text-gray-500">Choose an event from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Event</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field"
                  placeholder="Enter event title..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, start: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, end: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={newEvent.location || ''}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  className="input-field"
                  placeholder="Enter location..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  value={newEvent.description || ''}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field"
                  rows={3}
                  placeholder="Enter description..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateEvent}
                className="btn-primary flex-1"
              >
                Create Event
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

      {/* Voice Commands Help */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Commands</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>• "Read schedule" - Read today's schedule aloud</div>
          <div>• "Add event" - Create a new calendar event</div>
          <div>• "Cancel event" - Cancel selected event</div>
          <div>• "What's next" - Read next upcoming event</div>
        </div>
      </div>
    </div>
  );
};
