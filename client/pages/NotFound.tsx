import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SpaceButton from "@/components/SpaceButton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto flex min-h-[calc(100vh-216px)] flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <div className="rounded-3xl border border-white/10 bg-card/70 px-10 py-12 shadow-[0_0_45px_rgba(6,182,212,0.2)] backdrop-blur-xl">
        <p className="font-orbitron text-xs uppercase tracking-[0.45em] text-muted-foreground">
          Signal Lost
        </p>
        <h1 className="mt-4 font-orbitron text-5xl text-foreground">404</h1>
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          The requested module drifted beyond our telemetry range. Return to the
          command console to continue mission planning.
        </p>
        <div className="mt-8">
          <SpaceButton type="button" onClick={() => navigate("/")}>
            Back to BioRiskAI
          </SpaceButton>
        </div>
      </div>
    </motion.section>
  );
};

export default NotFound;
