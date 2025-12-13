'use client'

import { Server, HardDrive, Cpu, Activity, Users, Coins } from "lucide-react"
import { BracketCard, DotProgress } from "@/components/common"
import { Stagger, StaggerItem, ScaleOnHover } from "@/components/common"

interface NetworkPod {
  address: string
  last_seen_timestamp: number
  pubkey: string | null
  version: string
}

interface NetworkStatsProps {
  onlineCount: number
  totalCount: number
  totalStorage: number
  avgCpu: number
  avgRamPercent: number
  registryPods: NetworkPod[]
  formatBytes: (bytes: number) => string
  totalCredits?: number
}

export function NetworkStats({
  onlineCount,
  totalCount,
  totalStorage,
  avgCpu,
  avgRamPercent,
  registryPods,
  formatBytes,
  totalCredits = 0,
}: NetworkStatsProps) {
  return (
    <>
      <Stagger animateOnMount className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaggerItem>
          <ScaleOnHover>
            <BracketCard className="p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Nodes Online</span>
              </div>
              <p className="text-3xl font-light font-mono">
                {onlineCount}/{totalCount}
              </p>
              <DotProgress
                percent={totalCount > 0 ? (onlineCount / totalCount) * 100 : 0}
                className="mt-2"
              />
            </BracketCard>
          </ScaleOnHover>
        </StaggerItem>

        <StaggerItem>
          <ScaleOnHover>
            <BracketCard className="p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Total Storage</span>
              </div>
              <p className="text-3xl font-light font-mono">{formatBytes(totalStorage)}</p>
              <div className="mt-2 h-2" />
            </BracketCard>
          </ScaleOnHover>
        </StaggerItem>

        <StaggerItem>
          <ScaleOnHover>
            <BracketCard className="p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Avg CPU</span>
              </div>
              <p className="text-3xl font-light font-mono text-primary">{avgCpu.toFixed(2)}%</p>
              <DotProgress percent={avgCpu} className="mt-2" />
            </BracketCard>
          </ScaleOnHover>
        </StaggerItem>

        <StaggerItem>
          <ScaleOnHover>
            <BracketCard className="p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Avg RAM</span>
              </div>
              <p className="text-3xl font-light font-mono text-primary">{avgRamPercent.toFixed(1)}%</p>
              <DotProgress percent={avgRamPercent} className="mt-2" />
            </BracketCard>
          </ScaleOnHover>
        </StaggerItem>
      </Stagger>

      {/* Version Stats */}
      <Stagger animateOnMount className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <StaggerItem>
          <BracketCard className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Registered</span>
            </div>
            <p className="text-2xl font-light font-mono">{registryPods.length}</p>
          </BracketCard>
        </StaggerItem>

        <StaggerItem>
          <BracketCard className="p-4 bg-card">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">v0.6.0</span>
            <p className="text-2xl font-light font-mono mt-1">
              {registryPods.filter((p) => p.version === "0.6.0").length}
            </p>
          </BracketCard>
        </StaggerItem>

        <StaggerItem>
          <BracketCard className="p-4 bg-card">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">v0.5.1</span>
            <p className="text-2xl font-light font-mono mt-1">
              {registryPods.filter((p) => p.version === "0.5.1").length}
            </p>
          </BracketCard>
        </StaggerItem>

        <StaggerItem>
          <BracketCard className="p-4 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-success" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Total Credits</span>
            </div>
            <p className="text-2xl font-light font-mono text-success">
              {totalCredits.toLocaleString()}
            </p>
          </BracketCard>
        </StaggerItem>
      </Stagger>
    </>
  )
}
