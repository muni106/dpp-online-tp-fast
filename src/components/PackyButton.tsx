import { motion, AnimatePresence, useDragControls, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';
import { MessageCircle, X, Mic, Sparkles, Square } from 'lucide-react';

const suggestions = [
  'Explain this product simply',
  'Help me choose between products',
  'When does my milk expire?',
  'How do I recycle this pack?',
];

export const PackyButton = () => {
  const [open, setOpen] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMicToggle = useCallback(() => {
    setIsTalking(prev => !prev);
  }, []);

  // Pulsing ring scale when talking
  const pulseVariants = {
    idle: { scale: 1, opacity: 0 },
    talking: {
      scale: [1, 1.5, 1.8],
      opacity: [0.5, 0.25, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeOut' as const },
    },
  };

  const pulseVariants2 = {
    idle: { scale: 1, opacity: 0 },
    talking: {
      scale: [1, 1.3, 1.6],
      opacity: [0.4, 0.2, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeOut' as const, delay: 0.3 },
    },
  };

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
                <button onClick={() => { setOpen(false); setIsTalking(false); }} className="p-2 rounded-full hover:bg-muted">
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
                <div className="relative flex items-center justify-center">
                  {/* Pulse rings when talking */}
                  <motion.div
                    variants={pulseVariants}
                    animate={isTalking ? 'talking' : 'idle'}
                    className="absolute w-12 h-12 rounded-full bg-accent/40"
                  />
                  <motion.div
                    variants={pulseVariants2}
                    animate={isTalking ? 'talking' : 'idle'}
                    className="absolute w-12 h-12 rounded-full bg-accent/30"
                  />
                  <motion.button
                    onClick={handleMicToggle}
                    animate={isTalking ? { scale: [1, 1.08, 1], transition: { duration: 0.8, repeat: Infinity } } : { scale: 1 }}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-md z-10 transition-colors ${
                      isTalking ? 'bg-expired text-accent-foreground' : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {isTalking ? <Square className="w-4 h-4" /> : <Mic className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>

              {isTalking && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 flex items-center justify-center gap-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleY: [1, 2.5, 1], transition: { duration: 0.5, repeat: Infinity, delay: i * 0.1 } }}
                      className="w-1 h-4 rounded-full bg-accent origin-center"
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">Listening...</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag constraints container */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50" />

      {!open && (
        <motion.button
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          dragMomentum={false}
          
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onDragEnd={() => {}}
          onClick={() => setOpen(true)}
          className="fixed bottom-24 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-50 pointer-events-auto cursor-grab active:cursor-grabbing max-w-md touch-none"
          style={{ x, y, right: 'max(1rem, calc(50% - 210px + 1rem))' }}
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
