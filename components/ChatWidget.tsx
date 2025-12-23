import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat } from "@google/genai";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to Mobile Healthcare Initiative. I am MediBot, your virtual wellness assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = createChatSession();
    setChatSession(session);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !chatSession || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      const streamResult = await sendMessageToGemini(chatSession, userMessage);
      
      let fullText = '';
      for await (const chunk of streamResult) {
        const textChunk = chunk.text;
        if (textChunk) {
            fullText += textChunk;
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'model') {
                    lastMessage.text = fullText;
                }
                return newMessages;
            });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'I apologize, but I am having trouble connecting right now. Please try calling our support line.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-brand-slate rotate-90' : 'bg-brand-primary shadow-brand-primary/40'}`}
      >
        {isOpen ? <X className="text-white" size={28} /> : <MessageSquare className="text-white" size={28} />}
      </button>

      <div 
        className={`fixed bottom-24 right-6 w-[92vw] md:w-[420px] h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none translate-y-10'}`}
      >
        {/* Header */}
        <div className="medical-gradient p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                    <Bot size={28} />
                </div>
                <div>
                    <h3 className="text-white font-bold font-heading text-lg">MediBot AI</h3>
                    <p className="text-brand-accent text-xs font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                        AI Health Assistant
                    </p>
                </div>
            </div>
            <Sparkles className="text-brand-accent/60" size={20} />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 bg-brand-soft/30 space-y-5 scrollbar-thin">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-primary text-white rounded-tr-none' 
                    : 'bg-white text-brand-slate border border-brand-soft rounded-tl-none'
                } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <p className="text-[15px] leading-relaxed font-medium">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-5 bg-white border-t border-brand-soft flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="How can I assist you?"
            className="flex-1 px-5 py-3.5 bg-brand-soft/50 border border-brand-soft rounded-2xl focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all text-[15px] font-medium placeholder:text-gray-400"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center hover:bg-brand-secondary active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-primary/20"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;