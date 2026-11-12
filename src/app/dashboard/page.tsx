import { createClient } from '@supabase/supabase-js';
import { Activity, DollarSign, Database, ShieldAlert, Clock, TrendingUp } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 0;

interface RequestLog {
  id: string;
  created_at: string;
  model_routed: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_cost: number;
}

interface Project {
  id: string;
  name: string;
  current_spend: number;
  monthly_budget: number;
}

export default async function Dashboard() {
  const { data: projects } = await supabase.from('projects').select('*');
  const { data: logs } = await supabase
    .from('request_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10) as { data: RequestLog[] | null };

  const demoProject: Project = projects?.[0] || {
    id: 'default',
    name: 'No Project Found',
    current_spend: 0,
    monthly_budget: 100,
  };

  const totalSpend = demoProject.current_spend;
  const monthlyBudget = demoProject.monthly_budget;
  const spendPercent = monthlyBudget > 0 ? (totalSpend / monthlyBudget) * 100 : 0;

  return (
    <main className="min-h-screen bg-[#030303] text-slate-300 font-sans selection:bg-indigo-500/30 p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1 text-white">Control Center</h1>
            <p className="text-slate-500 text-sm">Live routing and infrastructure telemetry</p>
          </div>
          <div className="flex items-center gap-2 text-sm px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Proxy Active
          </div>
        </header>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Spend Card */}
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/[0.05] rounded-xl"><DollarSign size={20} className="text-slate-400" /></div>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">Current Spend</p>
            <div className="flex items-end gap-2">
              <h2 className="text-4xl font-bold text-white">${totalSpend.toFixed(4)}</h2>
              <span className="text-slate-500 mb-1">/ ${monthlyBudget}</span>
            </div>
            <div className="mt-3 h-2 bg-white/[0.05] rounded-full overflow-hidden">
              <div className={`h-full bg-emerald-500 rounded-full transition-all duration-700`} style={{ width: `${Math.min(spendPercent, 100)}%` }} />
            </div>
          </div>

          {/* Intercepts Card */}
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/[0.05] rounded-xl"><ShieldAlert size={20} className="text-slate-400" /></div>
              <Clock className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">Requests Intercepted</p>
            <h2 className="text-4xl font-bold text-white">{logs?.length || 0}</h2>
          </div>

          {/* Active Model Card */}
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/[0.05] rounded-xl"><Activity size={20} className="text-slate-400" /></div>
              <div className="w-5 h-5 bg-indigo-500/20 rounded flex items-center justify-center text-indigo-400">⚡</div>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">Primary Routing Model</p>
            <h2 className="text-4xl font-bold text-white">gpt-4o</h2>
          </div>
        </div>

        {/* Live Logs Table */}
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Database size={18} className="text-slate-400" /> Recent Intercepts
          </h3>
        </div>
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.05] border-b border-white/10 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Model Routed</th>
                <th className="px-6 py-4 font-medium">Tokens (In / Out)</th>
                <th className="px-6 py-4 font-medium">Cost Evaluated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs?.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-slate-300">{new Date(log.created_at).toLocaleTimeString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-slate-300">{log.model_routed}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{log.prompt_tokens} / {log.completion_tokens}</td>
                  <td className="px-6 py-4 text-emerald-400 font-mono">${log.total_cost.toFixed(6)}</td>
                </tr>
              ))}
              {(!logs || logs.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-600">Waiting for first API interception...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}