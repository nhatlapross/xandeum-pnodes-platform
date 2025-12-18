'use client'

import { useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'
import { NodeHistoryEntry, HistoryPeriod } from '@/lib/useHistoricalData'
import { cn } from '@/lib/utils'

interface NodeHistoryChartProps {
  data: NodeHistoryEntry[]
  isLoading?: boolean
  error?: string | null
  onPeriodChange?: (period: HistoryPeriod) => void
  currentPeriod?: HistoryPeriod
}

const PERIODS: { value: HistoryPeriod; label: string }[] = [
  { value: '1h', label: '1H' },
  { value: '6h', label: '6H' },
  { value: '24h', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
]

type ChartTab = 'resources' | 'storage' | 'activity'

export function NodeHistoryChart({
  data,
  isLoading,
  error,
  onPeriodChange,
  currentPeriod = '24h',
}: NodeHistoryChartProps) {
  const [activeTab, setActiveTab] = useState<ChartTab>('resources')

  const chartData = useMemo(() => {
    return data.map(d => ({
      ...d,
      time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date(d.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
      fullTime: new Date(d.timestamp),
      statusValue: d.status === 'online' ? 1 : 0,
      // Convert storage from bytes to GB for better readability
      storageGB: d.storage / (1024 * 1024 * 1024),
      // Convert uptime from seconds to hours
      uptimeHours: d.uptime / 3600,
    }))
  }, [data])

  // Calculate stats
  const stats = useMemo(() => {
    if (data.length === 0) return {
      avgCpu: 0, avgRam: 0, maxCpu: 0, maxRam: 0,
      avgStorage: 0, maxStorage: 0, avgUptime: 0,
      avgStreams: 0, avgPeers: 0
    }
    const avgCpu = data.reduce((sum, d) => sum + d.cpu, 0) / data.length
    const avgRam = data.reduce((sum, d) => sum + d.ram, 0) / data.length
    const maxCpu = Math.max(...data.map(d => d.cpu))
    const maxRam = Math.max(...data.map(d => d.ram))
    const avgStorage = data.reduce((sum, d) => sum + d.storage, 0) / data.length / (1024 * 1024 * 1024)
    const maxStorage = Math.max(...data.map(d => d.storage)) / (1024 * 1024 * 1024)
    const avgUptime = data.reduce((sum, d) => sum + d.uptime, 0) / data.length / 3600
    const avgStreams = data.reduce((sum, d) => sum + d.activeStreams, 0) / data.length
    const avgPeers = data.reduce((sum, d) => sum + d.peersCount, 0) / data.length
    return { avgCpu, avgRam, maxCpu, maxRam, avgStorage, maxStorage, avgUptime, avgStreams, avgPeers }
  }, [data])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload
      const date = d.fullTime

      return (
        <div className="bg-card/95 backdrop-blur border border-border rounded-lg p-3 shadow-xl">
          <p className="text-xs text-muted-foreground mb-2">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </p>
          {activeTab === 'resources' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-sm text-muted-foreground">CPU</span>
                </div>
                <span className={cn("font-mono text-sm", d.cpu > 80 ? 'text-red-400' : d.cpu > 60 ? 'text-yellow-400' : 'text-cyan-400')}>
                  {d.cpu.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-sm text-muted-foreground">RAM</span>
                </div>
                <span className={cn("font-mono text-sm", d.ram > 80 ? 'text-red-400' : d.ram > 60 ? 'text-yellow-400' : 'text-purple-400')}>
                  {d.ram.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
          {activeTab === 'storage' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-muted-foreground">Storage</span>
                </div>
                <span className="font-mono text-sm text-blue-400">
                  {d.storageGB.toFixed(2)} GB
                </span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-muted-foreground">Uptime</span>
                </div>
                <span className="font-mono text-sm text-amber-400">
                  {d.uptimeHours.toFixed(1)}h
                </span>
              </div>
            </div>
          )}
          {activeTab === 'activity' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground">Active Streams</span>
                </div>
                <span className="font-mono text-sm text-green-400">
                  {d.activeStreams}
                </span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-sm text-muted-foreground">Peers</span>
                </div>
                <span className="font-mono text-sm text-violet-400">
                  {d.peersCount}
                </span>
              </div>
            </div>
          )}
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-muted/50 animate-pulse rounded" />
          <div className="flex gap-1">
            {PERIODS.map((p) => (
              <div key={p.value} className="h-6 w-8 bg-muted/50 animate-pulse rounded" />
            ))}
          </div>
        </div>
        <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
          <div className="animate-pulse text-muted-foreground text-sm">Loading historical data...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Historical Data</div>
        <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg border border-border">
          <div className="text-muted-foreground text-sm text-center p-4">
            <p>Unable to load historical data</p>
            <p className="text-xs mt-1 text-red-400/60">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Historical Data</div>
          {onPeriodChange && (
            <div className="flex gap-1">
              {PERIODS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => onPeriodChange(p.value)}
                  className={cn(
                    "px-2 py-1 text-xs font-mono rounded transition-colors",
                    currentPeriod === p.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg border border-border">
          <div className="text-muted-foreground text-sm text-center p-4">
            <p>No historical data available yet</p>
            <p className="text-xs mt-1 opacity-60">Data will appear as it&apos;s collected</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with tabs and period selector */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('resources')}
            className={cn(
              "px-3 py-1.5 text-xs font-mono rounded transition-colors",
              activeTab === 'resources'
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={cn(
              "px-3 py-1.5 text-xs font-mono rounded transition-colors",
              activeTab === 'storage'
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            Storage
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={cn(
              "px-3 py-1.5 text-xs font-mono rounded transition-colors",
              activeTab === 'activity'
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            Activity
          </button>
        </div>

        {onPeriodChange && (
          <div className="flex gap-1">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => onPeriodChange(p.value)}
                className={cn(
                  "px-2 py-1 text-xs font-mono rounded transition-colors",
                  currentPeriod === p.value
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mini stats */}
      {activeTab === 'resources' && (
        <div className="flex gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avg CPU:</span>
            <span className="font-mono text-cyan-400">{stats.avgCpu.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avg RAM:</span>
            <span className="font-mono text-purple-400">{stats.avgRam.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Peak CPU:</span>
            <span className={cn("font-mono", stats.maxCpu > 80 ? 'text-red-400' : 'text-cyan-400')}>
              {stats.maxCpu.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {activeTab === 'storage' && (
        <div className="flex gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avg Storage:</span>
            <span className="font-mono text-blue-400">{stats.avgStorage.toFixed(2)} GB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Max Storage:</span>
            <span className="font-mono text-blue-400">{stats.maxStorage.toFixed(2)} GB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avg Uptime:</span>
            <span className="font-mono text-amber-400">{stats.avgUptime.toFixed(1)}h</span>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="flex gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avg Streams:</span>
            <span className="font-mono text-green-400">{stats.avgStreams.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avg Peers:</span>
            <span className="font-mono text-violet-400">{stats.avgPeers.toFixed(1)}</span>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'resources' ? (
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="nodeCpuGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <linearGradient id="nodeRamGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis
                dataKey="time"
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                width={30}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={({ payload }) => (
                  <div className="flex justify-center gap-4 pt-2">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-muted-foreground uppercase">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="5 5" strokeOpacity={0.5} />
              <Line
                type="monotone"
                dataKey="cpu"
                name="CPU"
                stroke="url(#nodeCpuGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: '#06b6d4' }}
              />
              <Line
                type="monotone"
                dataKey="ram"
                name="RAM"
                stroke="url(#nodeRamGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: '#a855f7' }}
              />
            </LineChart>
          ) : activeTab === 'storage' ? (
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="storageGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="uptimeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis
                dataKey="time"
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                interval="preserveStartEnd"
              />
              <YAxis
                yAxisId="storage"
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                width={40}
                tickFormatter={(v) => `${v.toFixed(1)}G`}
              />
              <YAxis
                yAxisId="uptime"
                orientation="right"
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                width={35}
                tickFormatter={(v) => `${v}h`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={({ payload }) => (
                  <div className="flex justify-center gap-4 pt-2">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-muted-foreground uppercase">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Line
                yAxisId="storage"
                type="monotone"
                dataKey="storageGB"
                name="Storage"
                stroke="url(#storageGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: '#3b82f6' }}
              />
              <Line
                yAxisId="uptime"
                type="monotone"
                dataKey="uptimeHours"
                name="Uptime"
                stroke="url(#uptimeGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: '#f59e0b' }}
              />
            </LineChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="streamsGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
                <linearGradient id="peersGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis
                dataKey="time"
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={({ payload }) => (
                  <div className="flex justify-center gap-4 pt-2">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-muted-foreground uppercase">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Line
                type="monotone"
                dataKey="activeStreams"
                name="Streams"
                stroke="url(#streamsGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: '#22c55e' }}
              />
              <Line
                type="monotone"
                dataKey="peersCount"
                name="Peers"
                stroke="url(#peersGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 3, fill: '#8b5cf6' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
