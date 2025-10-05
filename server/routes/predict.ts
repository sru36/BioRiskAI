import type { RequestHandler } from "express";
import type {
  FeatureContribution,
  PredictRequest,
  PredictResponse,
  RiskLevel,
} from "@shared/api";

const calculateRisk = (payload: PredictRequest): PredictResponse => {
  const radWeight = 0.4;
  const microWeight = 0.25;
  const circadianWeight = 0.2;
  const dnaWeight = 0.15;

  const normalizedRadiation = Math.min(payload.radiation_dose / 10, 1);
  const normalizedMicrogravity = Math.min(payload.microgravity_days / 365, 1);
  const normalizedCircadian = Math.min(payload.circadian_disruption / 10, 1);
  const normalizedDna = Math.min(payload.dna_marker, 1);

  const riskScore =
    normalizedRadiation * radWeight +
    normalizedMicrogravity * microWeight +
    normalizedCircadian * circadianWeight +
    normalizedDna * dnaWeight;

  const confidence = Math.round(70 + riskScore * 30);

  let riskLevel: RiskLevel = "Moderate";
  if (riskScore < 0.33) {
    riskLevel = "Low";
  } else if (riskScore > 0.66) {
    riskLevel = "High";
  }

  const contributions: FeatureContribution[] = [
    {
      feature: "Radiation Dose",
      contribution: Number(
        ((normalizedRadiation * radWeight - 0.15) * 2).toFixed(3),
      ),
    },
    {
      feature: "Microgravity Duration",
      contribution: Number(
        ((normalizedMicrogravity * microWeight - 0.1) * 2).toFixed(3),
      ),
    },
    {
      feature: "Circadian Disruption",
      contribution: Number(
        ((normalizedCircadian * circadianWeight - 0.08) * 2).toFixed(3),
      ),
    },
    {
      feature: "DNA Damage Marker",
      contribution: Number(((normalizedDna * dnaWeight - 0.05) * 2).toFixed(3)),
    },
  ];

  const summaryMap: Record<RiskLevel, string> = {
    Low: "Mission biomarker telemetry indicates strong genomic resilience under current exposure parameters. Maintain monitoring cadence and shielding protocols.",
    Moderate:
      "Current exposure profile suggests moderate genomic stress. Consider circadian realignment strategies and adaptive shielding during high-radiation windows.",
    High: "Telemetry indicates elevated DNA repair burden. Recommend immediate countermeasures: adjust microgravity schedule, enhance radiation shielding, and review biomarker trends closely.",
  };

  return {
    riskLevel,
    confidence,
    summary: summaryMap[riskLevel],
    contributions,
  };
};

export const handlePredict: RequestHandler = (req, res) => {
  const payload = req.body as PredictRequest;

  if (
    typeof payload?.radiation_dose !== "number" ||
    typeof payload?.microgravity_days !== "number" ||
    typeof payload?.circadian_disruption !== "number" ||
    typeof payload?.dna_marker !== "number"
  ) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const result = calculateRisk(payload);

  return res.json(result);
};
