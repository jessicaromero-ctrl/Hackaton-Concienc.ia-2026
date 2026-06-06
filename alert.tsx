import { Link, useRouterState } from "@tanstack/react-router";
import { Radio, LayoutDashboard, Network, ShieldAlert } from "lucide-react";
import { type ReactNode, useState } from "react";

const items = [
  { to: "/agente", label: "Agente 911", icon: Radio },
  { to: "/dashboard", label: "Dashboard Municipal", icon: LayoutDashboard },
  { to: "/coordinacion", label: "Coordinación Multi-Agente", icon: Network },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  if (pathname === "/") return <>{children}</>;

  return (
    <div className="min-h-screen flex" style={{ background: "#0B0B0D" }}>
      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 border-b"
        style={{ background: "#0B0B0D", borderColor: "#2A2D33" }}
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-[#D7263D]" size={20} />
          <span className="font-display font-bold text-[#F5F5F7]">MexNLP-911</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-[#F5F5F7] text-2xl">☰</button>
      </div>

      <aside
        className={`fixed md:static z-50 h-screen w-64 flex flex-col border-r transition-transform ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ background: "#0B0B0D", borderColor: "#2A2D33" }}
      >
        <div className="emergency-stripe" />
        <div className="p-5 border-b" style={{ borderColor: "#2A2D33" }}>
          <Link to="/" className="flex items-center gap-2">
            <ShieldAlert className="text-[#D7263D]" size={26} />
            <div>
              <div className="font-display font-bold text-[#F5F5F7] leading-tight">MexNLP-911</div>
              <div className="text-[10px] uppercase tracking-widest text-[#A0A4AB]">Command Center</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors"
                style={{
                  background: active ? "rgba(215,38,61,0.12)" : "transparent",
                  color: active ? "#F5F5F7" : "#A0A4AB",
                  borderLeft: active ? "3px solid #D7263D" : "3px solid transparent",
                }}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 text-[10px] text-[#6B7079] border-t" style={{ borderColor: "#2A2D33" }}>
          Hackathon Demo · CDMX
        </div>
      </aside>

      <main className="flex-1 min-w-0 pt-14 md:pt-0">{children}</main>
    </div>
  );
}
