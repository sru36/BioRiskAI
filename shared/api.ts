/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export type RiskLevel = "Low" | "Moderate" | "High";

export interface PredictRequest {
  radiation_dose: number;
  microgravity_days: number;
  circadian_disruption: number;
  dna_marker: number;
}

export interface FeatureContribution {
  feature: string;
  contribution: number;
}

export interface PredictResponse {
  riskLevel: RiskLevel;
  confidence: number;
  summary: string;
  contributions: FeatureContribution[];
}
