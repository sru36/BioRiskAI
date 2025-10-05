import { motion } from "framer-motion";

interface AnalyzingOverlayProps {
  visible: boolean;
}

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

const AnalyzingOverlay = ({ visible }: AnalyzingOverlayProps) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-2xl"
    >
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="flex h-48 w-48 flex-col items-center justify-center rounded-full border border-accent/60 bg-card/90 text-center text-sm uppercase tracking-[0.35em] text-accent shadow-[0_0_60px_rgba(6,182,212,0.25)]"
      >
        <span className="font-orbitron text-lg">Analyzing</span>
        <span className="mt-2 text-[10px] tracking-[0.6em] text-muted-foreground">
          quantum models engaged
        </span>
      </motion.div>
    </motion.div>
  );
};

export default AnalyzingOverlay;
