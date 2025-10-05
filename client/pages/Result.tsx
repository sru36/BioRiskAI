import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import ResultCard from "@/components/ResultCard";
import ShapChart from "@/components/ShapChart";
import SpaceButton from "@/components/SpaceButton";
import type { PredictResponse } from "@shared/api";

const pageVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [report, setReport] = useState<PredictResponse | null>(null);

  useEffect(() => {
    const stateResult = (location.state as { result?: PredictResponse } | null)
      ?.result;
    if (stateResult) {
      setReport(stateResult);
      return;
    }
    try {
      const persisted = sessionStorage.getItem("bioriskai:last-result");
      if (persisted) {
        setReport(JSON.parse(persisted) as PredictResponse);
      }
    } catch (error) {
      console.warn("Unable to retrieve persisted result", error);
    }
  }, [location.state]);

  const contributions = useMemo(() => report?.contributions ?? [], [report]);

  if (!report) {
    return (
      <motion.section
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-[calc(100vh-216px)] flex-col items-center justify-center gap-8 px-6 text-center"
      >
        <p className="max-w-md text-sm text-muted-foreground">
          Awaiting telemetry uplink. Submit a prediction profile to access the
          latest BioRisk assessment.
        </p>
        <SpaceButton type="button" onClick={() => navigate("/predict")}>
          Launch Prediction Console
        </SpaceButton>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16"
    >
      <ResultCard
        riskLevel={report.riskLevel}
        confidence={report.confidence}
        summary={report.summary}
      />
      <ShapChart data={contributions} />
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 bg-card/60 p-6">
        <div className="max-w-xl text-sm text-muted-foreground">
          Mission specialists can export detailed telemetry and SHAP vectors
          from the command console. Iterate parameters to explore countermeasure
          scenarios and reinforce astronaut genomic resilience plans.
        </div>
        <SpaceButton type="button" onClick={() => navigate("/predict")}>
          Run Another Scenario
        </SpaceButton>
      </div>
    </motion.section>
  );
};

export default Result;
