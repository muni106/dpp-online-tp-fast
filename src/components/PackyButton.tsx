import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useState, useRef } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { PackyChat } from './PackyChat';

export const PackyButton = () => {
  const [open, setOpen] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[420px] md:max-h-[80vh] z-[61] flex flex-col"
            >
              <div className="relative flex-1 flex flex-col min-h-0">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-muted/80 hover:bg-muted"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
                <PackyChat />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Drag constraints */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Draggable FAB */}
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
          onClick={() => setOpen(true)}
          className="fixed bottom-24 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-50 pointer-events-auto cursor-grab active:cursor-grabbing touch-none"
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
