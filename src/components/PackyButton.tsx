import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle, X, Mic, Sparkles } from 'lucide-react';

const suggestions = [
  'Explain this product simply',
  'Help me choose between products',
  'When does my milk expire?',
  'How do I recycle this pack?',
];

export const PackyButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card rounded-t-2xl shadow-2xl z-[60] border-t border-border"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-lg">📦</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">Packy</h3>
                    <p className="text-xs text-muted-foreground">Your AI guide</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-muted">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Hi! I'm Packy 👋 I can help you understand products, compare options, and learn about recycling.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    className="text-xs px-3 py-2 rounded-full bg-sky text-sky-foreground font-medium hover:opacity-80 transition-opacity"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-muted rounded-full px-4 py-3 text-sm text-muted-foreground">
                  Ask Packy anything...
                </div>
                <button className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md">
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-50 max-w-md"
          style={{ right: 'max(1rem, calc(50% - 210px + 1rem))' }}
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-warning" />
          </div>
        </motion.button>
      )}
    </>
  );
};
