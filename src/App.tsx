import React, { useState } from "react";
import { 
  Anchor, 
  Ship, 
  Container, 
  Wrench, 
  FileText, 
  CalendarDays, 
  LayoutGrid, 
  ShieldAlert, 
  TrendingUp,
  HelpCircle,
  Play
} from "lucide-react";

export default function App() {
  // Define local state for the form fields
  const [vesselName, setVesselName] = useState("");
  const [estimatedWorkload, setEstimatedWorkload] = useState("");
  const [availableCranes, setAvailableCranes] = useState("");
  const [operationalNotes, setOperationalNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No calculations or recommendations are generated, as per user requests.
    // This iteration focuses purely on the MVP user interface.
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col antialiased">
      {/* 1. Header */}
      <header id="app-header" className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-4">
          <div className="p-2.5 bg-sky-900 text-white rounded-lg shadow-sm">
            <Anchor id="header-logo" className="h-6 w-6" />
          </div>
          <div>
            <h1 id="app-title" className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Container Terminal Decision Support System
            </h1>
            <p id="app-subtitle" className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              AI-powered operational planning prototype for container terminals.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 2. Input Form Container */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
              <span className="text-sky-900 font-semibold text-lg font-display">Operational Inputs</span>
              <span className="text-xs bg-sky-50 text-sky-900 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ml-auto">
                MVP Config
              </span>
            </div>

            <form id="operational-plan-form" onSubmit={handleSubmit} className="space-y-5">
              {/* Vessel Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="vessel-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Vessel Name
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Ship className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    id="vessel-name"
                    value={vesselName}
                    onChange={(e) => setVesselName(e.target.value)}
                    placeholder="e.g., Ever Given"
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-950/25 focus:border-sky-900 focus:bg-white transition-all duration-150"
                  />
                </div>
              </div>

              {/* Estimated Workload Input */}
              <div className="space-y-1.5">
                <label htmlFor="estimated-workload" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Estimated Workload (TEUs)
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Container className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    id="estimated-workload"
                    value={estimatedWorkload}
                    onChange={(e) => setEstimatedWorkload(e.target.value)}
                    placeholder="e.g., 2400"
                    min="0"
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-950/25 focus:border-sky-900 focus:bg-white transition-all duration-150"
                  />
                </div>
              </div>

              {/* Available Quay Cranes Input */}
              <div className="space-y-1.5">
                <label htmlFor="available-cranes" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Available Quay Cranes
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    id="available-cranes"
                    value={availableCranes}
                    onChange={(e) => setAvailableCranes(e.target.value)}
                    placeholder="e.g., 4"
                    min="0"
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-950/25 focus:border-sky-900 focus:bg-white transition-all duration-150"
                  />
                </div>
              </div>

              {/* Operational Notes Input */}
              <div className="space-y-1.5">
                <label htmlFor="operational-notes" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Operational Notes
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-slate-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <textarea
                    id="operational-notes"
                    value={operationalNotes}
                    onChange={(e) => setOperationalNotes(e.target.value)}
                    placeholder="Enter weather conditions, tide details, priority containers, or cargo notes..."
                    rows={4}
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-950/25 focus:border-sky-900 focus:bg-white transition-all duration-150 resize-none"
                  />
                </div>
              </div>

              {/* 3. Generate Operational Plan Button */}
              <button
                type="submit"
                id="btn-generate-plan"
                className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-sky-900 hover:bg-sky-950 text-white font-medium rounded-lg shadow-sm text-sm transition-colors cursor-pointer"
              >
                <Play className="h-4 w-4 fill-white" />
                Generate Operational Plan
              </button>
            </form>
          </div>

          {/* 4. Output Area Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <span className="text-slate-900 font-semibold text-lg font-display">Decision Support Output</span>
              <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-sm ml-auto">
                Real-time Sync Disabled
              </span>
            </div>

            <div id="output-area-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Card 1: Vessel Planning */}
              <div 
                id="card-vessel-planning" 
                className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-sky-50 text-sky-950 rounded-lg">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 text-base">Vessel Planning</h3>
                  </div>
                  <div className="h-px bg-slate-100 w-full my-3"></div>
                </div>
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium max-w-[200px]">
                    Ready to generate operational analysis.
                  </p>
                </div>
              </div>

              {/* Card 2: Quay Crane Allocation */}
              <div 
                id="card-crane-allocation" 
                className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-emerald-50 text-emerald-950 rounded-lg">
                      <LayoutGrid className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 text-base">Quay Crane Allocation</h3>
                  </div>
                  <div className="h-px bg-slate-100 w-full my-3"></div>
                </div>
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium max-w-[200px]">
                    Ready to generate operational analysis.
                  </p>
                </div>
              </div>

              {/* Card 3: Risk Assessment */}
              <div 
                id="card-risk-assessment" 
                className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-amber-50 text-amber-950 rounded-lg">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 text-base">Risk Assessment</h3>
                  </div>
                  <div className="h-px bg-slate-100 w-full my-3"></div>
                </div>
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium max-w-[200px]">
                    Ready to generate operational analysis.
                  </p>
                </div>
              </div>

              {/* Card 4: Decision Support */}
              <div 
                id="card-decision-support" 
                className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-violet-50 text-violet-950 rounded-lg">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-900 text-base">Decision Support</h3>
                  </div>
                  <div className="h-px bg-slate-100 w-full my-3"></div>
                </div>
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium max-w-[200px]">
                    Ready to generate operational analysis.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer id="app-footer" className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
          <p>© 2026 Container Terminal Decision Support System • Capstone Operational Planning Prototype</p>
        </div>
      </footer>
    </div>
  );
}
