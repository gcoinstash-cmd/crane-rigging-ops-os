import React, { useState } from 'react';
import { 
  Shield, Award, ArrowRight, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Thermometer, Compass, Fuel, Gauge,
  Clock, Truck, Box, FileText, CheckSquare, Wrench, AlertTriangle, UserCheck
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface CranePackage {
  id: string;
  name: string;
  capacityTons: number;
  maxBoomLength: string;
  maxTipHeight: string;
  counterweight: string;
  outriggerBase: string;
  certNumber: string;
  specs: {
    engine: string;
    linePull: string;
    jibLength: string;
    groundPressure: string;
  };
  liftChecklist: {
    task: string;
    verified: boolean;
  }[];
  img: string;
}

const CRANES: CranePackage[] = [
  {
    id: "CRANE-500",
    name: "Liebherr LTM 1500-8.1 (500-Ton All-Terrain)",
    capacityTons: 500,
    maxBoomLength: "84 Meters (276 ft)",
    maxTipHeight: "142 Meters (466 ft with Luffing Jib)",
    counterweight: "165 Metric Tons",
    outriggerBase: "10.0m x 9.6m Heavy Mat Footprint",
    certNumber: "OSHA-NCCCO-2026-8819",
    specs: {
      engine: "Liebherr 8-Cylinder Turbo Diesel (680 HP)",
      linePull: "126 kN High-Torque Hoist Winch",
      jibLength: "91m Lattice Extension",
      groundPressure: "4.8 Tons/m² with Steel Spreader Mats"
    },
    liftChecklist: [
      { task: "Geotechnical Ground Bearing Capacity Survey Verified (> 50 PSI)", verified: true },
      { task: "Overhead Powerline De-energization Permit on File", verified: true },
      { task: "Rigging Hardware Magnetic Particle NDT Certificate Valid", verified: true },
      { task: "FAA Obstruction Evaluation Light Beacon Active", verified: true },
      { task: "Certified Rigging Master Level II Onsite Signoff", verified: true }
    ],
    img: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7"
  },
  {
    id: "CRANE-300",
    name: "Grove GMK6300L-1 (350-Ton All-Terrain)",
    capacityTons: 350,
    maxBoomLength: "80 Meters (262 ft Main Boom)",
    maxTipHeight: "120 Meters (394 ft)",
    counterweight: "92.5 Metric Tons",
    outriggerBase: "8.7m x 8.5m Outrigger Spread",
    certNumber: "OSHA-NCCCO-2026-4402",
    specs: {
      engine: "Mercedes-Benz OM473LA (580 HP)",
      linePull: "110 kN Line Pull",
      jibLength: "37m Hydraulic Luffing Jib",
      groundPressure: "3.9 Tons/m² on Timber Mats"
    },
    liftChecklist: [
      { task: "Wind Velocity Telemetry < 20 Knots at Tip Height", verified: true },
      { task: "Tandem Lift Equalizer Beam Load Test Complete", verified: true },
      { task: "NCCCO Operator Physical & Licensure Cross-Checked", verified: true },
      { task: "Emergency Stop System Functional Test Passed", verified: true }
    ],
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12"
  }
];

export default function App() {
  const [selectedCrane, setSelectedCrane] = useState<CranePackage>(CRANES[0]);
  const [checklist, setChecklist] = useState(selectedCrane.liftChecklist);
  const [liftWeightInput, setLiftWeightInput] = useState(140);
  const [liftRadiusInput, setLiftRadiusInput] = useState(32);
  const [stampedSuccess, setStampedSuccess] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const toggleCheck = (idx: number) => {
    const updated = [...checklist];
    updated[idx].verified = !updated[idx].verified;
    setChecklist(updated);
  };

  const handleSelectCrane = (c: CranePackage) => {
    setSelectedCrane(c);
    setChecklist(c.liftChecklist);
    setStampedSuccess(false);
  };

  // Capacity calculation based on radius
  const maxAllowableCapacity = Math.round(selectedCrane.capacityTons * (1 - (liftRadiusInput / 100)));
  const loadPercentage = Math.round((liftWeightInput / maxAllowableCapacity) * 100);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0E0F14] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-bold tracking-wider text-amber-400 flex items-center gap-2 text-base">
            <Wrench size={18} /> TITAN RIGGING // CRANE LOAD CHART & LIFT PLAN SPEC PANEL
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 uppercase text-xs">ARCHETYPE E: SPLIT-SCREEN SPEC & PROOF PANEL</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Shield size={14} />
            <span>OSHA 1926.1400 CERTIFIED LIFT PLANNER VAULT</span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ MASTER RIGGER PASS ]
          </button>
        </div>
      </header>

      {/* Split-Screen Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Fixed Panel: Crane Visual Inspection & Load Radius */}
        <section className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-zinc-800 p-6 sm:p-8 bg-[#0D0E13] overflow-y-auto space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {CRANES.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCrane(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                    selectedCrane.id === c.id
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {c.id}
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-zinc-400">CERT: {selectedCrane.certNumber}</span>
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800">
            <img 
              src={selectedCrane.img} 
              alt={selectedCrane.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 font-mono text-xs">
              <span className="text-zinc-400 block text-[10px]">RATED LIFT CAPACITY</span>
              <span className="text-2xl font-black text-amber-400">{selectedCrane.capacityTons} TONS</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{selectedCrane.name}</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Engineered for extreme structural heavy lifts, bridge girder placement, and high-altitude refinery vessels.
            </p>
          </div>

          {/* Interactive Load Radius Calculator */}
          <div className="bg-[#12141C] border border-zinc-800 p-5 rounded-2xl space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center text-sm font-bold text-white">
              <span>Load Chart Simulation</span>
              <span className={loadPercentage > 85 ? 'text-rose-400' : 'text-emerald-400'}>
                {loadPercentage}% CRANE UTILIZATION
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Working Lift Radius (Meters)</span>
                <span className="text-amber-400 font-bold">{liftRadiusInput} Meters</span>
              </div>
              <input 
                type="range"
                min="10"
                max="75"
                value={liftRadiusInput}
                onChange={e => setLiftRadiusInput(Number(e.target.value))}
                className="w-full accent-amber-500" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Planned Pick Weight (Tons)</span>
                <span className="text-amber-400 font-bold">{liftWeightInput} Tons</span>
              </div>
              <input 
                type="range"
                min="20"
                max={maxAllowableCapacity}
                value={liftWeightInput}
                onChange={e => setLiftWeightInput(Number(e.target.value))}
                className="w-full accent-amber-500" 
              />
            </div>

            <div className="p-3 bg-black border border-zinc-800 rounded-xl flex justify-between items-center">
              <span className="text-zinc-400">Allowable Load @ {liftRadiusInput}m:</span>
              <span className="text-lg font-black text-white">{maxAllowableCapacity} Tons</span>
            </div>
          </div>
        </section>

        {/* Right Scrollable Panel: Rigging Specs, OSHA Safety Gate & Certified Lift Plan */}
        <section className="w-full lg:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#0A0A0C]">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="text-amber-400" /> Engineering Specifications & Proof Vault
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Verified dimensional parameters, outrigger bearing footprint, and crane hoist specifications.
            </p>
          </div>

          {/* Technical Specs Table */}
          <div className="bg-[#12141C] border border-zinc-800 rounded-xl overflow-hidden font-mono text-xs">
            <div className="p-3 bg-zinc-900/80 border-b border-zinc-800 text-zinc-300 font-bold uppercase tracking-wider">
              Heavy Lift Configuration Matrix
            </div>
            <div className="divide-y divide-zinc-800 text-xs">
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Main Telescopic Boom</span><span className="text-white font-bold">{selectedCrane.maxBoomLength}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Maximum Tip Height</span><span className="text-white font-bold">{selectedCrane.maxTipHeight}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Counterweight Slabs</span><span className="text-amber-400 font-bold">{selectedCrane.counterweight}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Outrigger Base Mat Area</span><span className="text-white font-bold">{selectedCrane.outriggerBase}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Ground Bearing Pressure</span><span className="text-emerald-400 font-bold">{selectedCrane.specs.groundPressure}</span></div>
              <div className="flex justify-between p-3.5"><span className="text-zinc-400">Auxiliary Hoist Winch</span><span className="text-white font-bold">{selectedCrane.specs.linePull}</span></div>
            </div>
          </div>

          {/* OSHA Safety Signoff Checklist */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckSquare size={16} className="text-emerald-400" /> Critical Lift Safety Verification Gate
              </span>
              <span className="text-emerald-400 font-bold">
                {checklist.filter(c => c.verified).length} / {checklist.length} Passed
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map((item, idx) => (
                <div 
                  key={item.task}
                  onClick={() => toggleCheck(idx)}
                  className="flex items-center gap-3 p-3 bg-[#12141C] border border-zinc-800 rounded-xl cursor-pointer hover:border-amber-400/40 transition-all"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                    item.verified 
                      ? 'bg-emerald-500 border-emerald-400 text-black' 
                      : 'border-zinc-700 bg-black'
                  }`}>
                    {item.verified && <Check size={12} className="stroke-[3]" />}
                  </div>
                  <span className={`text-xs ${item.verified ? 'text-zinc-200' : 'text-zinc-500'}`}>{item.task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stamped Lift Plan Dispatch Action */}
          <div className="pt-4 border-t border-zinc-800 space-y-3 font-mono">
            {stampedSuccess ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl text-center text-xs font-bold space-y-1">
                <div>✓ CERTIFIED LIFT PLAN STAMPED & ARCHIVED</div>
                <div className="text-[11px] text-zinc-300">Digital PE stamp affixed (PE Lic #90214-CA). Dispatch authorized.</div>
              </div>
            ) : (
              <button
                onClick={() => setStampedSuccess(true)}
                disabled={checklist.some(c => !c.verified) || loadPercentage > 100}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-black text-sm rounded-xl transition-all shadow-xl shadow-amber-500/20 cursor-pointer min-h-[44px]"
              >
                {loadPercentage > 100 ? 'OVER CAPACITY: ADJUST RADIUS' : 'AFFIX DIGITAL PE STAMP & DISPATCH RIG'}
              </button>
            )}
          </div>
        </section>
      </div>

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
