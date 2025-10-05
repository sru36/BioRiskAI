import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InputCard from "@/components/InputCard";
import SpaceButton from "@/components/SpaceButton";
import AnalyzingOverlay from "@/components/AnalyzingOverlay";
import { submitPrediction } from "@/lib/api";
import type { PredictResponse } from "@shared/api";
import { useToast } from "@/components/ui/use-toast";

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const circadianOptions = [
  { label: "0 – 2", value: 1 },
  { label: "3 – 5", value: 4 },
  { label: "6 – 8", value: 7 },
  { label: "9+", value: 10 },
];

const Predict = () => {
  const [radiationDose, setRadiationDose] = useState(4.5);
  const [microgravityDays, setMicrogravityDays] = useState(180);
  const [circadianDisruption, setCircadianDisruption] = useState(
    circadianOptions[1].value,
  );
  const [dnaMarker, setDnaMarker] = useState(0.78);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const circadianLabel = useMemo(() => {
    return (
      circadianOptions.find((option) => option.value === circadianDisruption)
        ?.label ?? "0 – 2"
    );
  }, [circadianDisruption]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAnalyzing(true);
    try {
      const payload = {
        radiation_dose: Number(radiationDose.toFixed(2)),
        microgravity_days: Math.round(microgravityDays),
        circadian_disruption: circadianDisruption,
        dna_marker: Number(dnaMarker.toFixed(2)),
      };
      const result = await submitPrediction(payload);
      persistResult(result);
      navigate("/result", { state: { result } });
    } catch (error) {
      console.error(error);
      toast({
        title: "Transmission error",
        description:
          "Unable to synchronize with BioRiskAI core systems. Please retry.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <AnalyzingOverlay visible={isAnalyzing} />
      <motion.section
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <header className="mb-12 max-w-3xl">
          <p className="font-orbitron text-xs uppercase tracking-[0.45em] text-accent/80">
            Mission Input Console
          </p>
          <h1 className="mt-4 font-orbitron text-4xl text-foreground">
            Configure Astronaut Exposure Profile
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Adjust mission parameters to assess predicted genomic risk. Inputs
            are tuned for long-duration deep space missions and can be synced
            with telemetry systems for live monitoring.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputCard
              title="Radiation Dose"
              description="Cumulative ionizing radiation exposure (Gy/Sv)"
            >
              <div className="space-y-4">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.1}
                  value={radiationDose}
                  onChange={(event) =>
                    setRadiationDose(Number(event.target.value))
                  }
                  className="w-full accent-accent"
                />
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    Current Dose
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={0.1}
                    value={radiationDose}
                    onChange={(event) =>
                      setRadiationDose(Number(event.target.value))
                    }
                    className="w-24 rounded-lg border border-white/10 bg-secondary/50 px-3 py-2 text-right text-sm text-foreground"
                  />
                </div>
              </div>
            </InputCard>
            <InputCard
              title="Microgravity Duration"
              description="Time spent in microgravity environment (days)"
            >
              <div className="space-y-4">
                <input
                  type="range"
                  min={0}
                  max={365}
                  step={5}
                  value={microgravityDays}
                  onChange={(event) =>
                    setMicrogravityDays(Number(event.target.value))
                  }
                  className="w-full accent-accent"
                />
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    Mission Days
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={365}
                    step={1}
                    value={microgravityDays}
                    onChange={(event) =>
                      setMicrogravityDays(Number(event.target.value))
                    }
                    className="w-28 rounded-lg border border-white/10 bg-secondary/50 px-3 py-2 text-right text-sm text-foreground"
                  />
                </div>
              </div>
            </InputCard>
            <InputCard
              title="Circadian Disruption"
              description="Average hours of circadian misalignment per sol"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                    Selection
                  </label>
                  <select
                    className="w-full rounded-lg border border-white/10 bg-secondary/50 px-3 py-2 text-sm text-foreground"
                    value={circadianDisruption}
                    onChange={(event) =>
                      setCircadianDisruption(Number(event.target.value))
                    }
                  >
                    {circadianOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} hours / sol
                      </option>
                    ))}
                  </select>
                </div>
                <div className="rounded-xl border border-white/10 bg-secondary/40 p-4 text-xs text-muted-foreground">
                  Current misalignment: {circadianLabel} hours per sol
                </div>
              </div>
            </InputCard>
            <InputCard
              title="DNA Damage Marker"
              description="γ-H2AX biomarker normalized intensity"
              tooltip="γ-H2AX phosphorylation indicates DNA double-strand break repair activity. Values normalized 0 – 1."
            >
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Normalized value
                </label>
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={dnaMarker}
                  onChange={(event) => setDnaMarker(Number(event.target.value))}
                  className="w-full rounded-lg border border-white/10 bg-secondary/50 px-3 py-3 text-sm text-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  High γ-H2AX levels signal elevated DNA repair demand from
                  radiation-induced lesions.
                </p>
              </div>
            </InputCard>
          </div>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-card/70 p-6 text-center md:flex-row md:text-left">
            <div>
              <p className="font-orbitron text-xs uppercase tracking-[0.45em] text-muted-foreground">
                Telemetry Packet Preview
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {JSON.stringify(
                  {
                    radiation_dose: radiationDose.toFixed(2),
                    microgravity_days: Math.round(microgravityDays),
                    circadian_disruption: circadianDisruption,
                    dna_marker: dnaMarker.toFixed(2),
                  },
                  null,
                  0,
                )}
              </p>
            </div>
            <SpaceButton type="submit">Transmit to Core</SpaceButton>
          </div>
        </form>
      </motion.section>
    </>
  );
};

const persistResult = (result: PredictResponse) => {
  try {
    sessionStorage.setItem("bioriskai:last-result", JSON.stringify(result));
  } catch (error) {
    console.warn("Unable to persist result", error);
  }
};

export default Predict;
