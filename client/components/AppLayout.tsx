import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RisingStars from "@/components/RisingStars";

const AppLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#000119]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[45vh] bg-gradient-to-b from-transparent via-[#050b3a] to-[#000119]">
          <RisingStars className="top-0 h-full" size={1024} />
          <RisingStars className="top-0 h-full" layer="overlay" size={768} />
        </div>
        <div className="absolute inset-x-0 bottom-[-20vh] h-[60vh] bg-gradient-to-t from-[#000119] via-transparent to-transparent">
          <RisingStars className="bottom-0 h-full" layer="overlay" size={640} />
        </div>
      </div>
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <footer className="relative z-10 border-t border-white/10 bg-background/80 py-6 text-center text-xs uppercase tracking-[0.45em] text-muted-foreground">
        BioRiskAI Mission Analytics • Orion Deep Space Health Lab
      </footer>
    </div>
  );
};

export default AppLayout;
