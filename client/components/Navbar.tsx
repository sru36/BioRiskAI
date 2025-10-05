import { useLocation, useNavigate } from "react-router-dom";
import SpaceButton from "@/components/SpaceButton";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", path: "/" },
  { label: "Predict", path: "/predict" },
  { label: "Results", path: "/result" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/60 bg-accent/20 text-accent">
            🧬
          </div>
          <div>
            <p className="font-orbitron text-lg uppercase tracking-[0.35em] text-accent">
              BioRiskAI
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Deep Space Health Intelligence
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={cn(
                  "font-exo text-sm uppercase tracking-widest transition",
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        <SpaceButton type="button" onClick={() => navigate("/predict")}>
          Start
        </SpaceButton>
      </div>
    </header>
  );
};

export default Navbar;
