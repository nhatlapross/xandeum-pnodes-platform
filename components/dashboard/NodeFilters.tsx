'use client'

import { Filter, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NodeFiltersProps {
  statusFilter: "all" | "online" | "offline"
  setStatusFilter: (value: "all" | "online" | "offline") => void
  versionFilter: string
  setVersionFilter: (value: string) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  uniqueVersions: string[]
  viewMode: "card" | "table"
  setViewMode: (mode: "card" | "table") => void
}

export function NodeFilters({
  statusFilter,
  setStatusFilter,
  versionFilter,
  setVersionFilter,
  searchQuery,
  setSearchQuery,
  uniqueVersions,
  viewMode,
  setViewMode,
}: NodeFiltersProps) {
  const hasActiveFilters = statusFilter !== "all" || versionFilter !== "all" || searchQuery

  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div className="flex flex-wrap gap-2">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "online" | "offline")}
            className="px-3 py-1.5 text-sm font-mono border border-border bg-card"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Version Filter */}
        <select
          value={versionFilter}
          onChange={(e) => setVersionFilter(e.target.value)}
          className="px-3 py-1.5 text-sm font-mono border border-border bg-card"
        >
          <option value="all">All Versions</option>
          {uniqueVersions.map((version) => (
            <option key={version} value={version}>
              v{version}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 text-sm font-mono border border-border bg-card w-48"
        />

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter("all")
              setVersionFilter("all")
              setSearchQuery("")
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {/* View Mode Switcher */}
      <div className="flex items-center gap-1 border border-border">
        <button
          onClick={() => setViewMode("card")}
          className={cn(
            "px-3 py-1.5 text-sm font-mono flex items-center gap-2 transition-colors",
            viewMode === "card"
              ? "bg-primary text-primary-foreground"
              : "bg-card hover:bg-muted"
          )}
        >
          <LayoutGrid className="w-4 h-4" />
          Cards
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={cn(
            "px-3 py-1.5 text-sm font-mono flex items-center gap-2 transition-colors",
            viewMode === "table"
              ? "bg-primary text-primary-foreground"
              : "bg-card hover:bg-muted"
          )}
        >
          <List className="w-4 h-4" />
          Table
        </button>
      </div>
    </div>
  )
}
