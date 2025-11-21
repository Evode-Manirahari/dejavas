import React, { useState } from 'react';

type Message = {
  id: number;
  role: 'user' | 'tutor';
  content: string;
  timestamp: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'tutor',
    content: 'How can I help?',
    timestamp: '09:00',
  },
];

export const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const tutorMessage: Message = {
      id: Date.now() + 1,
      role: 'tutor',
      content:
        'Thanks for articulating that. I’ll log it, update the rubric, and suggest a visualization when it helps. Ready for a spatial walkthrough?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage, tutorMessage]);
    setInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">DEJAVA</p>
            <h1 className="text-lg font-semibold text-neutral-900">Dejava</h1>
          </div>
          <p className="text-sm text-neutral-500">Simple, grounded conversations.</p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8">
        <section className="flex-1 space-y-6 rounded-2xl border border-neutral-200 bg-white p-6">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col gap-1">
              <div
                className={`max-w-3xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'self-end bg-neutral-100 text-neutral-900'
                    : 'bg-neutral-900 text-white'
                }`}
              >
                {message.content}
              </div>
              <span className="text-xs text-neutral-500">
                {message.role === 'user' ? 'You · ' : 'Dejava · '}
                {message.timestamp}
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white p-4">
          <label htmlFor="user-input" className="sr-only">
            Ask Dejava anything
          </label>
          <textarea
            id="user-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder="Ask a question or describe what feels confusing…"
            className="w-full resize-none border-0 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
          />
          <div className="mt-4 border-t border-neutral-100 pt-4 text-right">
            <button
              onClick={handleSend}
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Send
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
