import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Mic, Send, Sparkles, Square, Bot } from 'lucide-react';

const suggestions = [
  'Explain this product simply',
  'Help me choose between products',
  'When does my milk expire?',
  'How do I recycle this pack?',
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const packyReplies: Record<string, string> = {
  'Explain this product simply': "This is a Tetra Pak carton of milk from a local Swedish farm. It's organic, fresh, and packaged in a recyclable carton. Best used within 7 days of opening! 🥛",
  'Help me choose between products': "Looking at your scanned products: the organic whole milk has the best sustainability score (87%), while the orange juice expires soonest. I'd recommend using the juice first! 🍊",
  'When does my milk expire?': "Your Arla Organic Whole Milk expires on Feb 20, 2025. That's about a week away — still fresh! I'll remind you when it's getting close. ⏰",
  'How do I recycle this pack?': "Great question! ♻️ Flatten the carton, keep the cap on, and place it in your paper/carton recycling bin. The carton is made of 70% renewable materials!",
};

export const PackyChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = packyReplies[text.trim()] || "Thanks for asking! I'm Packy, your product guide. I can help with product info, comparisons, expiry dates, and recycling tips. Try one of the quick suggestions! 📦";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: reply }]);
      setIsTyping(false);
    }, 1200);
  }, []);

  const handleMicToggle = useCallback(() => {
    setIsTalking(prev => !prev);
  }, []);

  const pulseVariants = {
    idle: { scale: 1, opacity: 0 },
    talking: {
      scale: [1, 1.5, 1.8],
      opacity: [0.5, 0.25, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-border bg-primary/5">
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-base">📦</span>
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-1">
            Packy <Sparkles className="w-3 h-3 text-warning" />
          </h3>
          <p className="text-[10px] text-muted-foreground">Your AI product guide</p>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="h-48 md:h-56 overflow-y-auto p-3 space-y-2 hide-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-4">
            <Bot className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              Hi! I'm Packy 👋 Ask me about your products, recycling, or tap a suggestion below.
            </p>
          </div>
        )}
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-muted text-foreground rounded-bl-md'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-3 py-2 flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick suggestions */}
      {messages.length === 0 && (
        <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto hide-scrollbar">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-[10px] px-2.5 py-1.5 rounded-full bg-sky text-sky-foreground font-medium whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="p-2 border-t border-border flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask Packy anything..."
          className="flex-1 bg-muted rounded-full px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
        />
        {/* Mic button */}
        <div className="relative flex items-center justify-center">
          <motion.div
            variants={pulseVariants}
            animate={isTalking ? 'talking' : 'idle'}
            className="absolute w-9 h-9 rounded-full bg-accent/40"
          />
          <motion.button
            onClick={handleMicToggle}
            animate={isTalking ? { scale: [1, 1.08, 1], transition: { duration: 0.8, repeat: Infinity } } : { scale: 1 }}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center z-10 transition-colors ${
              isTalking ? 'bg-expired text-accent-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {isTalking ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-4 h-4" />}
          </motion.button>
        </div>
        {/* Send button */}
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40 transition-opacity"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Waveform when talking */}
      <AnimatePresence>
        {isTalking && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3 pb-2 flex items-center justify-center gap-1"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [1, 2.5, 1], transition: { duration: 0.5, repeat: Infinity, delay: i * 0.1 } }}
                className="w-1 h-3 rounded-full bg-accent origin-center"
              />
            ))}
            <span className="text-[10px] text-muted-foreground ml-2">Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
