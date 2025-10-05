import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SpaceButton from "@/components/SpaceButton";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-[calc(100vh-216px)] items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(30,58,138,0.4)_0%,_transparent_60%)] blur-3xl" />
        <div className="absolute -left-32 bottom-10 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(6,182,212,0.25)_0%,_transparent_65%)] blur-3xl" />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl text-center"
      >
        <p className="font-orbitron text-sm uppercase tracking-[0.55em] text-accent/80">
          Deep Space Health Risk Predictor
        </p>
        <h1 className="mt-6 font-orbitron text-6xl font-semibold uppercase tracking-[0.3em] text-foreground drop-shadow-[0_10px_60px_rgba(6,182,212,0.25)]">
          🧬 BioRiskAI
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Model the genomic resilience of astronauts against radiation bursts,
          prolonged microgravity, and circadian disruption. BioRiskAI fuses
          mission telemetry with biomarker intelligence to anticipate DNA damage
          and keep crews mission-ready.
        </p>
        <div className="mt-10 flex justify-center">
          <SpaceButton type="button" onClick={() => navigate("/predict")}>
            Start Prediction
          </SpaceButton>
        </div>
        <footer className="mt-16 text-xs uppercase tracking-[0.6em] text-muted-foreground">
          Developed for NASA Space Apps Challenge 2025
        </footer>
      </motion.div>
    </section>
  );
};

export default Index;
