/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { 
  Ship, 
  Anchor, 
  Cpu, 
  Layers, 
  FileText, 
  AlertTriangle, 
  Play, 
  RotateCcw, 
  Clock, 
  Compass, 
  Calendar,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Sliders,
  ChevronRight,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VesselPreset {
  name: string;
  workload: string;
  cranes: number;
  notes: string;
}

const PRESETS: VesselPreset[] = [
  {
    name: "Antwerp Express",
    workload: "2450 TEU",
    cranes: 4,
    notes: "Requires fast turnaround for secondary port routing. Priority reefer containers in Bay 12."
  },
  {
    name: "Pacific Horizon",
    workload: "1800 TEU",
    cranes: 3,
    notes: "Arrival window coincides with expected tidal draft constraints. Berth 4 requested."
  },
  {
    name: "MSC Victoria",
    workload: "3100 TEU",
    cranes: 5,
    notes: "Heavy volume. Outbound train transfer scheduled for 18:00 tomorrow. Strict discharge sequencing."
  }
];

export default function App() {
  // Input states
  const [vesselName, setVesselName] = useState<string>("Antwerp Express");
  const [estimatedWorkload, setEstimatedWorkload] = useState<string>("2450");
  const [availableCranes, setAvailableCranes] = useState<number>(4);
  const [operationalNotes, setOperationalNotes] = useState<string>(
    "Requires fast turnaround for secondary port routing. Priority reefer containers in Bay 12."
  );

  interface VesselAnalysis {
    name: string;
    workload: number;
    cranes: number;
    notes: string;
    classification: string;
    netHours: number;
    bufferHours: number;
    totalHours: number;
    considerations: string[];
    reason: string;

    // Card 2: Quay Crane Allocation
    recommendedAllocation: string;
    resourceAvailability: string;
    allocationReason: string;

    // Card 3: Risk Assessment
    riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
    keyBottlenecks: string[];
    mitigations: string[];

    // Card 4: Decision Support
    recommendedAction: string;
    executiveSummary: string;
    nextStep: string;
  }

  // Simulation / Interactive States
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [isPlanGenerated, setIsPlanGenerated] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<VesselAnalysis | null>(null);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    "System initialized. Core UI module loaded.",
    "Ready for planning inputs."
  ]);
  const [activeTab, setActiveTab] = useState<'editor' | 'presets'>('editor');

  // Real-time clock state for visual fidelity
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleApplyPreset = (preset: VesselPreset) => {
    setVesselName(preset.name);
    setEstimatedWorkload(preset.workload.replace(" TEU", ""));
    setAvailableCranes(preset.cranes);
    setOperationalNotes(preset.notes);
    addLog(`Applied vessel preset: ${preset.name}`);
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString().substring(11, 19);
    setSystemLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 8)]);
  };

  const handleGeneratePlan = (e?: any) => {
    try {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation();
      }
      if (!vesselName || !vesselName.trim()) {
        alert("Please enter a Vessel Name");
        return;
      }

      addLog(`Initiating operational plan generation for ${vesselName}...`);
      addLog("Analyzing berth availability and scheduling conflicts...");
      addLog(`Evaluating quay crane dispatch models for ${availableCranes} crane(s)...`);
      addLog("Performing risk matrix and dwell-time simulation...");

      // Parse estimated workload safely
      const workloadNum = parseInt(String(estimatedWorkload || "1500").replace(/[^0-9]/g, "")) || 1500;
      
      // Low / Moderate / High workload assessment based on guidelines
      let classification = "Moderate Workload";
      if (workloadNum > 2000) {
        classification = "High Workload";
      } else if (workloadNum < 1000) {
        classification = "Low Workload";
      }

      // Estimate operation duration using Estimated Workload divided by Available Quay Cranes divided by 25 TEUs per crane-hour.
      const calculatedDuration = Math.round((workloadNum / (availableCranes * 25)) * 10) / 10;
      const net = calculatedDuration;
      const buffer = 1.5;
      const total = Math.round((net + buffer) * 10) / 10;

      const considerations: string[] = [];
      const notesLower = String(operationalNotes || "").toLowerCase();
      
      if (notesLower.includes("reefer")) {
        considerations.push("Priority reefer power connection required at berth sector.");
      }
      if (notesLower.includes("rail") || notesLower.includes("train")) {
        considerations.push("Sync discharge sequencing with terminal railway timetable.");
      }
      if (notesLower.includes("tide") || notesLower.includes("draft") || notesLower.includes("depth")) {
        considerations.push("Constrained tidal window alert. Maintain real-time depth monitoring.");
      }
      if (notesLower.includes("hazardous") || notesLower.includes("danger") || notesLower.includes("dg")) {
        considerations.push("Secure Class 9 hazardous area clearance protocols before unloading.");
      }
      if (availableCranes >= 6) {
        considerations.push("High density crane usage: verify anti-collision limits between booms.");
      }
      
      // Fallback considerations if we need more or have none
      if (considerations.length < 2) {
        considerations.push("Enforce minimum crane clearance interval of 3 bays to optimize gantries.");
        considerations.push("Pre-stage yard slots in block C-4 for immediate crane discharge flow.");
      }
      if (considerations.length < 3) {
        considerations.push("Verify lashers and deck crew standby schedule 30 minutes before first lift.");
      }

      const reason = `This recommendation is generated for ${vesselName} based on the input workload of ${workloadNum} TEUs and ${availableCranes} active crane(s). The allocation achieves an optimal discharge rate while safeguarding terminal gantry resources, adjusting berth dwell times to fit specified operational notes.`;

      // Card 2: Quay Crane Allocation
      const recommendedAllocation = `Allocate ${availableCranes} Quay Crane(s) to ${vesselName}`;
      const resourceAvailability = `Utilizing ${availableCranes} of 8 available terminal gantries. Remaining pool is sufficient for concurrent berthings.`;
      const allocationReason = `Optimizes moves-per-hour to target the ${total}-hour turnaround window without overloading berth logistics.`;

      // Card 3: Risk Assessment
      let riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk' = 'Low Risk';
      const keyBottlenecks: string[] = [];
      const mitigations: string[] = [];

      if (availableCranes < 4) {
        riskLevel = 'Medium Risk';
        keyBottlenecks.push("Crane Shortage: Low crane count increases risk of demurrage delay.");
        mitigations.push("Request standby gantry operator team to enable continuous shifts.");
      }

      const mentionsRiskKeywords = ["priority", "reefer", "delay", "congestion", "fast turnaround"].some(keyword => notesLower.includes(keyword));

      if (mentionsRiskKeywords) {
        riskLevel = availableCranes < 4 ? 'High Risk' : 'Medium Risk';
        if (notesLower.includes("reefer")) {
          keyBottlenecks.push("Reefer Power Demands: Active reefers require immediate plug-in yards.");
          mitigations.push("Pre-cool active reefer stacks in Block B and verify slot availability.");
        }
        if (notesLower.includes("delay") || notesLower.includes("congestion") || notesLower.includes("fast turnaround") || notesLower.includes("priority")) {
          keyBottlenecks.push("Berth Turnaround Pressure: High priority discharge timeline.");
          mitigations.push("Prioritize high-stack deck bays first to optimize gantry flow.");
        }
      }

      if (keyBottlenecks.length === 0) {
        keyBottlenecks.push("No major bottlenecks identified. Normal operational conditions apply.");
        mitigations.push("Monitor real-time gantry move rates via standard terminal telemetry logs.");
      }

      // Card 4: Decision Support
      const recommendedAction = `Approve Berthing Plan & Dispatch ${availableCranes} Gantry Cranes`;
      const executiveSummary = `Discharge and load ${workloadNum} TEUs for ${vesselName} using ${availableCranes} cranes. Target completion time is ${total} hours.`;
      const nextStep = `Transmit digital work sequence manifests to Gantry Cranes 1-${availableCranes} command deck.`;

      const result: VesselAnalysis = {
        name: vesselName,
        workload: workloadNum,
        cranes: availableCranes,
        notes: operationalNotes,
        classification,
        netHours: net,
        bufferHours: buffer,
        totalHours: total,
        considerations,
        reason,
        recommendedAllocation,
        resourceAvailability,
        allocationReason,
        riskLevel,
        keyBottlenecks,
        mitigations,
        recommendedAction,
        executiveSummary,
        nextStep
      };

      setIsAnalyzing(false);
      setProgress(100);
      setHasRun(true);
      setIsPlanGenerated(true);
      setAnalysisResult(result);
      addLog("Plan generation complete. Vessel planning model compiled successfully.");
    } catch (err) {
      console.error("Error generating plan:", err);
      addLog(`Error during plan generation: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleReset = () => {
    setVesselName("");
    setEstimatedWorkload("");
    setAvailableCranes(3);
    setOperationalNotes("");
    setHasRun(false);
    setProgress(0);
    setAnalysisResult(null);
    setIsPlanGenerated(false);
    addLog("Form and outputs reset to empty standby.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white" id="main-container">
      {/* Top Banner indicating Prototype Context */}
      <div className="bg-sky-950 text-sky-200 px-4 py-2 text-xs font-mono flex flex-wrap justify-between items-center border-b border-sky-900" id="prototype-banner">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>SYSTEM PROTOTYPE</span>
          <span className="text-sky-400">|</span>
          <span>UI ITERATION PHASE</span>
        </div>
        <div className="flex items-center gap-4">
          <span>BERTH 4 & 5 ACTIVE</span>
          <span className="hidden sm:inline text-sky-400">•</span>
          <span className="hidden sm:inline">CRANE POWER GRID: STABLE</span>
        </div>
      </div>

      {/* Header section */}
      <header className="bg-white border-b border-slate-200/80 px-6 py-5 sticky top-0 z-10 shadow-xs" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-sky-50 rounded-xl text-sky-600 border border-sky-100" id="header-logo-container">
              <Anchor className="w-8 h-8" id="header-logo-icon" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-display text-slate-950" id="app-title">
                Container Terminal Decision Support System
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl" id="app-description">
                Interactive terminal planning simulator. Configure inbound vessels and crane allocations to model dispatch flows and assess dockside performance.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1 font-mono text-xs text-slate-500 bg-slate-100/80 p-3 rounded-lg border border-slate-200" id="clock-container">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>{time || "Loading terminal clock..."}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Berth Scheduler Sync Status: OK</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8" id="app-main-content">
        
        {/* Visual Terminal Overview / Stats Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" id="quick-stats-section">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="p-2.5 bg-sky-50 rounded-lg text-sky-600">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Active Queue</div>
              <div className="text-lg font-bold font-display text-slate-900">3 Vessels Scheduled</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Quay Cranes</div>
              <div className="text-lg font-bold font-display text-slate-900">8 Gantry Units</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Berth Efficiency</div>
              <div className="text-lg font-bold font-display text-slate-900">94.2% Peak</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Wind & Tide Status</div>
              <div className="text-lg font-bold font-display text-slate-900">Normal / Favorable</div>
            </div>
          </div>
        </section>

        {/* Core Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="workspace-grid">
          
          {/* Left Column: Input Panel */}
          <section className="lg:col-span-5 space-y-6" id="input-section">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Card Header with tabs for quick fill vs custom */}
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-sky-600" />
                  <h2 className="font-semibold text-slate-900 font-display">Operational Inputs</h2>
                </div>
                <div className="flex bg-slate-200 p-0.5 rounded-lg text-xs font-medium">
                  <button 
                    onClick={() => setActiveTab('editor')}
                    className={`px-3 py-1 rounded-md transition-colors ${activeTab === 'editor' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Custom Form
                  </button>
                  <button 
                    onClick={() => setActiveTab('presets')}
                    className={`px-3 py-1 rounded-md transition-colors ${activeTab === 'presets' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Vessel Presets
                  </button>
                </div>
              </div>

              <div className="p-5">
                {activeTab === 'presets' ? (
                  <div className="space-y-4" id="presets-container">
                    <p className="text-xs text-slate-500 mb-2">
                      Select a predefined vessel manifest to quickly populate the planning inputs form.
                    </p>
                    <div className="space-y-3">
                      {PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleApplyPreset(p);
                            setActiveTab('editor');
                          }}
                          className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/40 transition-all flex justify-between items-start group"
                        >
                          <div className="space-y-1">
                            <div className="font-semibold text-slate-950 flex items-center gap-1.5 text-sm">
                              <Ship className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                              {p.name}
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                              Workload: {p.workload} | Cranes: {p.cranes}
                            </div>
                            <div className="text-xs text-slate-400 line-clamp-1 italic">
                              "{p.notes}"
                            </div>
                          </div>
                          <div className="p-1 rounded bg-slate-100 group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors text-slate-400">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleGeneratePlan} className="space-y-5" id="planning-form">
                    
                    {/* Vessel Name Input */}
                    <div className="space-y-2">
                      <label htmlFor="vessel-name-input" className="block text-sm font-semibold text-slate-700">
                        Vessel Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Ship className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="vessel-name-input"
                          required
                          value={vesselName}
                          onChange={(e) => setVesselName(e.target.value)}
                          placeholder="e.g. Antwerp Express"
                          className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all"
                        />
                      </div>
                    </div>

                    {/* Estimated Workload Input */}
                    <div className="space-y-2">
                      <label htmlFor="workload-input" className="block text-sm font-semibold text-slate-700">
                        Estimated Workload (TEUs)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Layers className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="workload-input"
                          required
                          value={estimatedWorkload}
                          onChange={(e) => setEstimatedWorkload(e.target.value)}
                          placeholder="e.g. 1500"
                          className="block w-full pl-10 pr-16 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-mono"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-slate-400 font-semibold uppercase">
                          TEUs
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400">Twenty-Foot Equivalent Units (volume estimate for crane discharge/loading)</p>
                    </div>

                    {/* Available Quay Cranes Gantry Selection */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label htmlFor="cranes-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                          Available Quay Cranes
                        </label>
                        <span className="font-mono text-sm font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100">
                          {availableCranes} Units
                        </span>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="range"
                          id="cranes-slider"
                          min="1"
                          max="8"
                          value={availableCranes}
                          onChange={(e) => setAvailableCranes(Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600 focus:outline-hidden focus:ring-2 focus:ring-sky-100"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono px-0.5">
                          <span>1 Crane (Min)</span>
                          <span>4 Cranes</span>
                          <span>8 Cranes (Max)</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational Notes */}
                    <div className="space-y-2">
                      <label htmlFor="notes-input" className="block text-sm font-semibold text-slate-700">
                        Operational Notes
                      </label>
                      <div className="relative">
                        <div className="absolute top-3.5 left-3.5 text-slate-400 pointer-events-none">
                          <FileText className="w-4 h-4" />
                        </div>
                        <textarea
                          id="notes-input"
                          rows={4}
                          value={operationalNotes}
                          onChange={(e) => setOperationalNotes(e.target.value)}
                          placeholder="Include weather warnings, priority bays, dangerous goods, connection details or yard limits..."
                          className="block w-full pl-10 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all resize-y"
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit / Reset Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        onClick={handleGeneratePlan}
                        disabled={isAnalyzing}
                        className={`flex-1 relative flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white transition-all shadow-sm ${
                          isAnalyzing 
                            ? 'bg-sky-800/80 cursor-not-allowed' 
                            : 'bg-sky-600 hover:bg-sky-700 active:scale-[0.98]'
                        }`}
                        id="generate-button"
                      >
                        {isAnalyzing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Processing... {progress}%</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-white" />
                            <span>Generate Operational Plan</span>
                          </>
                        )}
                      </button>

                      {(vesselName || estimatedWorkload || operationalNotes) && (
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-4 py-3 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-1.5"
                          title="Reset form"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span className="sm:hidden lg:inline">Reset</span>
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Simulated Live Terminal Telemetry Output Logs */}
            <div className="bg-slate-900 text-slate-300 rounded-xl p-5 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">Terminal Log Stream</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">STATUS: CONNECTED</div>
              </div>
              <div className="font-mono text-[11px] leading-relaxed h-[130px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800" id="terminal-logs">
                {systemLogs.map((log, index) => (
                  <div key={index} className={index === 0 ? "text-emerald-300" : "text-slate-400"}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Column: Required Output Cards (2x2 Grid) */}
          <section className="lg:col-span-7 space-y-6" id="outputs-section">
            
            {/* Banner detailing prototype status */}
            <AnimatePresence mode="wait">
              {hasRun ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-sky-50 border border-sky-200/80 rounded-xl p-4 flex items-start gap-3.5"
                  id="analysis-notice"
                >
                  <CheckCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-sky-950 font-display">Simulated Event Captured</h3>
                    <p className="text-xs text-sky-800 mt-1 leading-relaxed">
                      Inputs for <strong className="font-semibold">{vesselName}</strong> ({estimatedWorkload} TEUs / {availableCranes} Cranes) have been logged. The AI operational planner and decision models are offline in this prototype interface block and will be wired up during the next integration iteration.
                    </p>
                  </div>
                </motion.div>
              ) : isAnalyzing ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3.5"
                >
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-amber-400 opacity-75"></div>
                    <div className="relative rounded-full h-3.5 w-3.5 bg-amber-500"></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-950">Generating Operational Solution...</h3>
                    <div className="w-full bg-amber-200/50 h-1.5 rounded-full overflow-hidden mt-1.5 max-w-sm">
                      <div className="bg-amber-600 h-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex items-start gap-3.5"
                  id="standby-notice"
                >
                  <HelpCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Operational Decision Workspace</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Fill in the inbound vessel details on the left, then click <strong className="font-semibold">Generate Operational Plan</strong>. The decision support system will model and mock the simulation space while displaying standby statuses.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skill Execution Summary Panel & Informational Banner */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4" id="skill-execution-summary-panel">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">Skill Execution Summary</h4>
                <div className="mt-3">
                  {isPlanGenerated ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg py-2 px-3">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>Vessel Planning</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg py-2 px-3">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>Quay Crane Allocation</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg py-2 px-3">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>Risk Assessment</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg py-2 px-3">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>Decision Support</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg py-2.5 px-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-slate-400 animate-pulse"></span>
                      <span>Waiting for operational analysis...</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Informational Banner */}
              <div className="pt-3 flex items-start gap-2.5 text-xs text-slate-600 bg-amber-50/50 -mx-5 -mb-5 p-4 rounded-b-xl border-t border-slate-200/80">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  AI-generated operational recommendations must be reviewed by a human planner before execution.
                </p>
              </div>
            </div>

            {/* Grid for the 4 Mandatory Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="dss-outputs-grid">
              
              {/* Card 1: Vessel Planning */}
              <div 
                className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                  isAnalyzing 
                    ? 'border-amber-300 ring-2 ring-amber-50' 
                    : isPlanGenerated 
                    ? 'border-sky-300 ring-2 ring-sky-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                id="vessel-planning-card"
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-0.5">
                      <Ship className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm tracking-tight font-display">Vessel Planning Skill</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Analyses vessel workload and berth occupancy.</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isAnalyzing ? 'bg-amber-100 text-amber-700' : isPlanGenerated ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isAnalyzing ? "Status: ANALYZING" : isPlanGenerated ? "Status: COMPLETED" : "Status: STANDBY"}
                  </span>
                </div>
                
                {isPlanGenerated && analysisResult ? (
                  <div className="space-y-4 text-left animate-fadeIn">
                    
                    {/* 1. Vessel Workload Assessment */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">1. Vessel Workload Assessment</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-semibold text-xs text-slate-800">{analysisResult.classification}</span>
                        <span className="text-[11px] font-mono bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">
                          {analysisResult.workload} TEUs
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Slot allocation and bay plan density require specialized gantry sequencing. Calculated berth occupancy profile is structured for high quay productivity.
                      </p>
                    </div>

                    {/* 2. Estimated Operation Duration */}
                    <div className="bg-sky-50/50 p-3.5 rounded-lg border border-sky-100/50">
                      <div className="text-[10px] font-bold text-sky-700 uppercase tracking-wider flex items-center justify-between">
                        <span>2. Estimated Operation Duration</span>
                        <span className="text-[10px] font-normal text-slate-400 font-mono">Rate: 28 moves/hr/crane</span>
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-extrabold font-display text-sky-950">{analysisResult.totalHours}</span>
                        <span className="text-xs font-semibold text-sky-800"> hours total</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-1 flex justify-between">
                        <span>Net discharge/load: {analysisResult.netHours} hrs</span>
                        <span>Safety buffer: {analysisResult.bufferHours} hrs</span>
                      </div>
                    </div>

                    {/* 3. Planning Considerations */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">3. Planning Considerations</div>
                      <ul className="space-y-1.5">
                        {analysisResult.considerations.map((item, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="text-sky-500 font-bold shrink-0 mt-0.5">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. Reason for Recommendation */}
                    <div className="border-t border-slate-100 pt-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">4. Reason for Recommendation</div>
                      <p className="text-[11px] text-slate-500 italic leading-relaxed">
                        "{analysisResult.reason}"
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="relative">
                      <div className={`p-4 rounded-full ${isAnalyzing ? 'bg-amber-50 text-amber-500 animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
                        <Ship className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-700 font-mono tracking-tight">
                        "Waiting for analysis..."
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                        Awaiting vessel parameters submission to calculate optimal berth time window.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 2: Quay Crane Allocation */}
              <div 
                className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                  isAnalyzing 
                    ? 'border-amber-300 ring-2 ring-amber-50' 
                    : isPlanGenerated 
                    ? 'border-sky-300 ring-2 ring-sky-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                id="crane-allocation-card"
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg mt-0.5">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm tracking-tight font-display">Quay Crane Allocation Skill</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Optimises quay crane allocation.</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isAnalyzing ? 'bg-amber-100 text-amber-700' : isPlanGenerated ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isAnalyzing ? "Status: ANALYZING" : isPlanGenerated ? "Status: COMPLETED" : "Status: STANDBY"}
                  </span>
                </div>
                
                {isPlanGenerated && analysisResult ? (
                  <div className="space-y-4 text-left animate-fadeIn">
                    {/* Recommended Crane Allocation */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended Crane Allocation</div>
                      <div className="font-semibold text-xs text-slate-800 mt-1">
                        {analysisResult.recommendedAllocation}
                      </div>
                    </div>

                    {/* Resource Availability */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resource Availability</div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {analysisResult.resourceAvailability}
                      </p>
                    </div>

                    {/* Allocation Reason */}
                    <div className="border-t border-slate-100 pt-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Allocation Reason</div>
                      <p className="text-[11px] text-slate-500 italic leading-relaxed">
                        "{analysisResult.allocationReason}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="relative">
                      <div className="p-4 rounded-full bg-slate-50 text-slate-400">
                        <Cpu className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-700 font-mono tracking-tight">
                        "Waiting for analysis..."
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                        Awaiting crane availability input to generate work schedules and bay priorities.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 3: Risk Assessment */}
              <div 
                className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                  isAnalyzing 
                    ? 'border-amber-300 ring-2 ring-amber-50' 
                    : isPlanGenerated 
                    ? 'border-sky-300 ring-2 ring-sky-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                id="risk-assessment-card"
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-rose-50 text-rose-600 rounded-lg mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm tracking-tight font-display">Risk Assessment Skill</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Evaluates operational risks.</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isAnalyzing ? 'bg-amber-100 text-amber-700' : isPlanGenerated ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isAnalyzing ? "Status: ANALYZING" : isPlanGenerated ? "Status: COMPLETED" : "Status: STANDBY"}
                  </span>
                </div>
                
                {isPlanGenerated && analysisResult ? (
                  <div className="space-y-4 text-left animate-fadeIn">
                    {/* Risk Level */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Risk Level</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                          analysisResult.riskLevel === 'High Risk' ? 'bg-rose-500 animate-pulse' : analysisResult.riskLevel === 'Medium Risk' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></span>
                        <span className={`font-bold text-xs ${
                          analysisResult.riskLevel === 'High Risk' ? 'text-rose-700' : analysisResult.riskLevel === 'Medium Risk' ? 'text-amber-700' : 'text-emerald-700'
                        }`}>
                          {analysisResult.riskLevel}
                        </span>
                      </div>
                    </div>

                    {/* Key Bottlenecks */}
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Key Bottlenecks</div>
                      <ul className="space-y-1">
                        {analysisResult.keyBottlenecks.map((b, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mitigation Suggestions */}
                    <div className="border-t border-slate-100 pt-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mitigation Suggestions</div>
                      <ul className="space-y-1">
                        {analysisResult.mitigations.map((m, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="relative">
                      <div className="p-4 rounded-full bg-slate-50 text-slate-400">
                        <AlertTriangle className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-700 font-mono tracking-tight">
                        "Waiting for analysis..."
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                        Evaluates potential scheduling clash, tidal risks, and wind load thresholds.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 4: Decision Support */}
              <div 
                className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                  isAnalyzing 
                    ? 'border-amber-300 ring-2 ring-amber-50' 
                    : isPlanGenerated 
                    ? 'border-sky-300 ring-2 ring-sky-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                id="decision-support-card"
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mt-0.5">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm tracking-tight font-display">Decision Support Skill</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Generates operational recommendations.</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isAnalyzing ? 'bg-amber-100 text-amber-700' : isPlanGenerated ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isAnalyzing ? "Status: ANALYZING" : isPlanGenerated ? "Status: COMPLETED" : "Status: STANDBY"}
                  </span>
                </div>
                
                {isPlanGenerated && analysisResult ? (
                  <div className="space-y-4 text-left animate-fadeIn">
                    {/* Recommended Action */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended Action</div>
                      <div className="font-semibold text-xs text-indigo-800 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{analysisResult.recommendedAction}</span>
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Executive Summary</div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {analysisResult.executiveSummary}
                      </p>
                    </div>

                    {/* Next Step */}
                    <div className="border-t border-slate-100 pt-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Next Step</div>
                      <p className="text-[11px] text-slate-700 font-mono leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                        {analysisResult.nextStep}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="relative">
                      <div className="p-4 rounded-full bg-slate-50 text-slate-400">
                        <Database className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-700 font-mono tracking-tight">
                        "Waiting for analysis..."
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                        Consolidates operational sequence models and recommends action plans.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Quick Reference Guide or Instruction Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Model Logic Reference Guide</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-800">Crane Allocation Principle</span>
                  <p className="leading-relaxed">Work discharge rate averages 25-30 TEUs per crane-hour. Allocation should prevent berth delays.</p>
                </div>
                <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-800">Critical Turnaround Metrics</span>
                  <p className="leading-relaxed">Optimal port turnaround maintains strict 24-hour limits to ensure continuous ocean liner schedules.</p>
                </div>
              </div>
            </div>

          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 px-6 text-center text-xs text-slate-400" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 font-mono">
            <Anchor className="w-3.5 h-3.5 text-sky-600" />
            <span>CONTAINER-TERMINAL-DSS-MOCK-V1</span>
          </div>
          <div className="text-slate-500">
            Operational Decision Support Prototype • Ready for future AI model integration
          </div>
        </div>
      </footer>
    </div>
  );
}
