import React, { useState } from 'react';
import { 
  Mail, 
  MailOpen, 
  Reply, 
  Archive, 
  Search,
  Volume2,
  Play,
  Pause
} from 'lucide-react';
import { EmailMessage } from '../types';
import { emailApi } from '../services/api';
import { motion } from 'framer-motion';

interface EmailIntegrationProps {
  emails: EmailMessage[];
  onEmailsUpdate: (emails: EmailMessage[]) => void;
}

export const EmailIntegration: React.FC<EmailIntegrationProps> = ({
  emails,
  onEmailsUpdate,
}) => {
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.from.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'unread') return matchesSearch && !email.is_read;
    if (filter === 'high') return matchesSearch && email.priority === 'high';
    return matchesSearch;
  });

  const handleMarkAsRead = async (emailId: string) => {
    try {
      await emailApi.markAsRead(emailId);
      onEmailsUpdate(emails.map(email => 
        email.id === emailId ? { ...email, is_read: true } : email
      ));
    } catch (error) {
      console.error('Failed to mark email as read:', error);
    }
  };

  const handleRespondToEmail = async (emailId: string, response: string) => {
    try {
      await emailApi.respondToEmail(emailId, response);
      alert('Response sent successfully!');
    } catch (error) {
      console.error('Failed to respond to email:', error);
    }
  };

  const readEmailAloud = (email: EmailMessage) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Email from ${email.from}. Subject: ${email.subject}. ${email.body}`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };


  const summarizeEmails = () => {
    const unreadEmails = emails.filter(email => !email.is_read);
    const summary = `You have ${unreadEmails.length} unread emails. ` +
      unreadEmails.map(email => 
        `From ${email.from}: ${email.subject}`
      ).join('. ');
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-secondary-600 bg-secondary-100';
      case 'low': return 'text-accent-600 bg-accent-100';
      default: return 'text-beige bg-neutral-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Email Integration</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={summarizeEmails}
            className="btn-primary flex items-center space-x-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>Summarize Emails</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="input-field"
            >
              <option value="all">All Emails</option>
              <option value="unread">Unread</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Inbox ({filteredEmails.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredEmails.map((email) => (
                <motion.div
                  key={email.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                    selectedEmail?.id === email.id
                      ? 'border-primary-500 bg-primary-50'
                      : email.is_read
                      ? 'border-gray-200 hover:border-gray-300'
                      : 'border-blue-200 bg-blue-50 hover:border-blue-300'
                  }`}
                  onClick={() => {
                    setSelectedEmail(email);
                    if (!email.is_read) {
                      handleMarkAsRead(email.id);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className={`text-sm font-medium truncate ${
                          !email.is_read ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {email.from}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(email.priority)}`}>
                          {email.priority}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${
                        !email.is_read ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {email.subject}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(email.received_at).toLocaleString()}
                      </p>
                    </div>
                    {!email.is_read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Email Content */}
        <div className="lg:col-span-2">
          {selectedEmail ? (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEmail.subject}</h3>
                  <p className="text-sm text-gray-600">From: {selectedEmail.from}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedEmail.priority)}`}>
                    {selectedEmail.priority}
                  </span>
                  <button
                    onClick={() => readEmailAloud(selectedEmail)}
                    disabled={isPlaying}
                    className="p-2 text-gray-400 hover:text-primary-600 disabled:opacity-50"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedEmail.body}</p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    const response = prompt('Enter your response:');
                    if (response) {
                      handleRespondToEmail(selectedEmail.id, response);
                    }
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                <button
                  onClick={() => handleMarkAsRead(selectedEmail.id)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <MailOpen className="w-4 h-4" />
                  <span>Mark as Read</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <Archive className="w-4 h-4" />
                  <span>Archive</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Email</h3>
                <p className="text-gray-500">Choose an email from the list to view its content</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Voice Commands Help */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Commands</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>• "Read emails" - Summarize unread emails</div>
          <div>• "Read this email" - Read selected email aloud</div>
          <div>• "Reply to email" - Start reply process</div>
          <div>• "Mark as read" - Mark current email as read</div>
        </div>
      </div>
    </div>
  );
};
