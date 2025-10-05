import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface ContributionDatum {
  feature: string;
  contribution: number;
}

interface ShapChartProps {
  data: ContributionDatum[];
}

const renderTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) {
    return null;
  }
  const { feature, contribution } = payload[0].payload as ContributionDatum;
  const polarity = contribution >= 0 ? "Increases" : "Reduces";
  return (
    <div className="rounded-xl border border-white/10 bg-secondary/80 px-4 py-3 text-sm text-secondary-foreground shadow-xl backdrop-blur">
      <p className="font-semibold text-foreground">{feature}</p>
      <p className="text-xs text-muted-foreground">
        {polarity} predicted risk by {Math.abs(contribution).toFixed(2)}
      </p>
    </div>
  );
};

const ShapChart = ({ data }: ShapChartProps) => {
  return (
    <div className="rounded-3xl border border-white/5 bg-card/80 p-6 shadow-[0_0_35px_rgba(6,182,212,0.15)] backdrop-blur-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-orbitron text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Feature Attribution
          </p>
          <h3 className="mt-2 font-orbitron text-2xl text-foreground">
            SHAP Contribution Analysis
          </h3>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          Positive values increase predicted risk
          <br /> Negative values reduce predicted risk
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={18}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148, 163, 184, 0.25)"
            />
            <XAxis
              type="number"
              stroke="rgba(148, 163, 184, 0.6)"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="feature"
              type="category"
              stroke="rgba(148, 163, 184, 0.6)"
              tickLine={false}
              axisLine={false}
              width={180}
            />
            <Tooltip
              content={renderTooltip}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            />
            <Bar dataKey="contribution" radius={6}>
              {data.map((entry) => (
                <Cell
                  key={entry.feature}
                  fill={
                    entry.contribution >= 0
                      ? "hsl(var(--danger))"
                      : "hsl(var(--accent))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShapChart;
