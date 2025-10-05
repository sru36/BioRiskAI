interface ResultCardProps {
  riskLevel: "Low" | "Moderate" | "High";
  confidence: number;
  summary?: string;
}

const riskStyles: Record<ResultCardProps["riskLevel"], string> = {
  Low: "border-success/60 bg-success/10 text-success",
  Moderate: "border-warning/60 bg-warning/10 text-warning",
  High: "border-danger/60 bg-danger/10 text-danger",
};

const ResultCard = ({ riskLevel, confidence, summary }: ResultCardProps) => {
  return (
    <section className="rounded-3xl border border-white/5 bg-card/80 p-8 shadow-[0_0_45px_rgba(30,58,138,0.35)] backdrop-blur-3xl">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="font-orbitron text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Prediction Result
          </p>
          <h2 className="mt-2 font-orbitron text-3xl font-semibold text-foreground">
            BioRisk Assessment
          </h2>
        </div>
        <div
          className={`rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-widest ${riskStyles[riskLevel]}`}
        >
          {riskLevel} Risk
        </div>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-secondary/60 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Confidence Score
          </p>
          <p className="mt-4 font-orbitron text-4xl text-accent">
            {confidence}%
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-muted-foreground">
            {summary ??
              "Model synthesizes radiation, microgravity exposure, circadian disruption, and DNA damage markers to estimate astronaut genomic resilience."}
          </p>
          <ul className="mt-4 grid gap-2 text-xs text-muted-foreground/80 md:grid-cols-2">
            <li>
              • Continuous monitoring recommended prior to long-duration
              missions.
            </li>
            <li>
              • Consider circadian synchronization countermeasures to mitigate
              risk.
            </li>
            <li>
              • Update biomarker readings after each EVA cycle for improved
              accuracy.
            </li>
            <li>
              • Integrate shielding analytics for adaptive habitat planning.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ResultCard;
