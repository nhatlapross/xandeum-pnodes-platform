'use client'

import { useState, useEffect } from 'react'
import { Copy, ExternalLink, Info, Search, Settings, TrendingUp, TrendingDown, ChevronRight, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BracketCard,
  ChamferedCard,
  ChamferedCardWithBorder,
  DotGrid,
  DotDivider,
  DotLine,
  DotProgress,
} from '@/components/common'

// Section wrapper component
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">{title}</h2>
      <DotDivider className="mb-8" />
      {children}
    </section>
  )
}

// Color swatch component
function ColorSwatch({ name, variable, fallback }: { name: string; variable: string; fallback: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-20 border border-border"
        style={{ backgroundColor: `var(${variable}, ${fallback})` }}
      />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs font-mono text-muted-foreground">{variable}</p>
      </div>
    </div>
  )
}

export default function StyleguidePage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl tracking-widest uppercase font-normal">Design System</h1>
            <p className="text-muted-foreground mt-1">Minimal Data-Brutalism Component Library</p>
          </div>
          <Button variant="outline" size="icon" onClick={toggleDarkMode}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* ============================================= */}
        {/* COLOR PALETTE */}
        {/* ============================================= */}
        <Section title="Color Palette">
          <div className="space-y-8">
            <div className="p-4 bg-card border border-border mb-4">
              <p className="text-sm">
                <span className="font-medium">Theme:</span>{' '}
                <span className="font-mono">{isDark ? 'Dark (Green accent)' : 'Light (Orange/Yellow accent)'}</span>
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ColorSwatch name="Primary" variable="--primary" fallback="#F59E0B" />
                <ColorSwatch name="Primary Hover" variable="--primary-hover" fallback="#D97706" />
                <ColorSwatch name="Background" variable="--background" fallback="#FFFFFF" />
                <ColorSwatch name="Surface" variable="--surface" fallback="#F5F5F0" />
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Card & Surfaces</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ColorSwatch name="Card" variable="--card" fallback="#FAFAF7" />
                <ColorSwatch name="Popover" variable="--popover" fallback="#FFFFFF" />
                <ColorSwatch name="Accent" variable="--accent" fallback="#FEF3C7" />
                <ColorSwatch name="Muted" variable="--muted" fallback="#F5F5F0" />
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Neutral Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ColorSwatch name="Border" variable="--border" fallback="#E5E5E5" />
                <ColorSwatch name="Foreground" variable="--foreground" fallback="#1A1A1A" />
                <ColorSwatch name="Muted Foreground" variable="--muted-foreground" fallback="#9CA3AF" />
                <ColorSwatch name="Ring" variable="--ring" fallback="#9CA3AF" />
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Semantic Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ColorSwatch name="Success" variable="--success" fallback="#22C55E" />
                <ColorSwatch name="Destructive" variable="--destructive" fallback="#EF4444" />
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================= */}
        {/* TYPOGRAPHY */}
        {/* ============================================= */}
        <Section title="Typography">
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Page Title</p>
              <p className="text-2xl tracking-widest uppercase font-normal">STAKE WITH US</p>
            </div>

            <div className="p-4 bg-card border border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Section Header</p>
              <p className="text-sm tracking-widest uppercase text-muted-foreground">RECENT BLOCKS</p>
            </div>

            <div className="p-4 bg-card border border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Body Text</p>
              <p className="text-base text-secondary-foreground">Earn yield on your SOL while helping protect and improve Solana for everyone.</p>
            </div>

            <div className="p-4 bg-card border border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Data / Numbers (Share Tech Mono)</p>
              <p className="font-mono text-2xl">14.55M SOL</p>
              <p className="font-mono text-sm mt-2">0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D</p>
            </div>

            <div className="p-4 bg-card border border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Addresses (Truncated)</p>
              <p className="font-mono text-sm text-muted-foreground">Fd7btg...2v69Nk</p>
            </div>

            <div className="p-4 bg-card border border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Labels</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Estimated APY</p>
            </div>
          </div>
        </Section>

        {/* ============================================= */}
        {/* SIGNATURE ELEMENTS - BRACKETS */}
        {/* ============================================= */}
        <Section title="Signature Elements — Corner Brackets">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Two Corners (Default)</p>
              <BracketCard>
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">STAKE WITH US</h3>
                <p className="text-secondary-foreground">Earn yield on your SOL while helping protect and improve Solana.</p>
              </BracketCard>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Four Corners</p>
              <BracketCard allCorners>
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">FEATURED CONTENT</h3>
                <p className="text-secondary-foreground">Important container with all four corner brackets.</p>
              </BracketCard>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Custom Color</p>
              <BracketCard accentColor="var(--success)">
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">SUCCESS STATE</h3>
                <p className="text-secondary-foreground">Brackets can use semantic colors for different states.</p>
              </BracketCard>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">With Card Background</p>
              <BracketCard className="bg-card">
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">CARD BACKGROUND</h3>
                <p className="text-secondary-foreground">Using the card color for subtle differentiation.</p>
              </BracketCard>
            </div>
          </div>
        </Section>

        {/* ============================================= */}
        {/* SIGNATURE ELEMENTS - CHAMFERED */}
        {/* ============================================= */}
        <Section title="Signature Elements — Chamfered Corners">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Top Corners (Default)</p>
              <ChamferedCard className="bg-card">
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">CHAMFERED TOP</h3>
                <p className="text-secondary-foreground">Diagonal cut on both top corners.</p>
              </ChamferedCard>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Top-Left Only</p>
              <ChamferedCard chamfer="top-left" className="bg-card">
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">TOP-LEFT CUT</h3>
                <p className="text-secondary-foreground">Single corner chamfer for asymmetric look.</p>
              </ChamferedCard>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">All Corners</p>
              <ChamferedCard chamfer="all" size={16} className="bg-card">
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">ALL CORNERS</h3>
                <p className="text-secondary-foreground">Octagonal shape with larger chamfer size.</p>
              </ChamferedCard>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">With Accent Border</p>
              <ChamferedCardWithBorder size={16} accentColor="var(--primary)">
                <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">ACCENT BORDER</h3>
                <p className="text-secondary-foreground">Visible accent color on chamfered edges.</p>
              </ChamferedCardWithBorder>
            </div>
          </div>
        </Section>

        {/* ============================================= */}
        {/* DECORATIVE PATTERNS */}
        {/* ============================================= */}
        <Section title="Decorative Patterns">
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Dot Grid Backgrounds</p>
              <div className="grid md:grid-cols-3 gap-4">
                <DotGrid variant="default" className="p-8 border border-border bg-background">
                  <p className="text-sm font-medium">Default Grid</p>
                  <p className="text-xs text-muted-foreground">Gray dots</p>
                </DotGrid>
                <DotGrid variant="subtle" className="p-8 border border-border bg-background">
                  <p className="text-sm font-medium">Subtle Grid</p>
                  <p className="text-xs text-muted-foreground">Very light dots</p>
                </DotGrid>
                <DotGrid variant="accent" className="p-8 border border-border bg-background">
                  <p className="text-sm font-medium">Accent Grid</p>
                  <p className="text-xs text-muted-foreground">Tinted dots</p>
                </DotGrid>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Dot Dividers</p>
              <div className="space-y-6 p-6 bg-card border border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Triple Dot Line (Accent)</p>
                  <DotDivider lines={3} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Double Dot Line (Accent)</p>
                  <DotDivider />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Double Dot Line (Muted)</p>
                  <DotDivider muted />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Single Dot Line</p>
                  <DotLine />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Single Dot Line (Muted)</p>
                  <DotLine color="var(--muted-foreground)" />
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Dot Progress Bars</p>
              <div className="space-y-4 p-6 bg-card border border-border">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress (Solid - Default)</span>
                    <span>73.4%</span>
                  </div>
                  <DotProgress percent={73.4} />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress (Gradient - Optional)</span>
                    <span>45%</span>
                  </div>
                  <DotProgress percent={45} gradient />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress (Low)</span>
                    <span>12%</span>
                  </div>
                  <DotProgress percent={12} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================= */}
        {/* BUTTONS */}
        {/* ============================================= */}
        <Section title="Buttons">
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Button Variants</p>
              <div className="flex flex-wrap gap-4">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Button Sizes</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg">Large</Button>
                <Button size="default">Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon"><Settings className="w-4 h-4" /></Button>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">With Icons</p>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Address
                </Button>
                <Button variant="secondary">
                  View Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Full Width (CTA Style)</p>
              <div className="max-w-md">
                <Button className="w-full">Connect Wallet</Button>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Disabled State</p>
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled Primary</Button>
                <Button variant="secondary" disabled>Disabled Secondary</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================= */}
        {/* INPUTS */}
        {/* ============================================= */}
        <Section title="Input Fields">
          <div className="max-w-md space-y-6">
            <div>
              <label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">Default Input</label>
              <Input placeholder="Enter amount to stake" />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">With Search Icon</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search tokens..." className="pl-10" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">Disabled</label>
              <Input placeholder="Disabled input" disabled />
            </div>
          </div>
        </Section>

        {/* ============================================= */}
        {/* CARDS */}
        {/* ============================================= */}
        <Section title="Cards">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm tracking-widest uppercase font-normal">Basic Card</CardTitle>
                <CardDescription>Standard card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground">Card content goes here. Cards have subtle backgrounds, no shadows.</p>
              </CardContent>
            </Card>

            <Card className="bg-surface">
              <CardHeader>
                <CardTitle className="text-sm tracking-widest uppercase font-normal">Surface Card</CardTitle>
                <CardDescription>Using surface background color</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground">Subtle differentiation with surface background.</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ============================================= */}
        {/* BADGES */}
        {/* ============================================= */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-[var(--success)] hover:bg-[var(--success)]/90 text-white">Success</Badge>
          </div>
        </Section>

        {/* ============================================= */}
        {/* TABS */}
        {/* ============================================= */}
        <Section title="Tabs">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 border border-border bg-card mt-4">
              <p className="text-secondary-foreground">Overview content appears here.</p>
            </TabsContent>
            <TabsContent value="transactions" className="p-4 border border-border bg-card mt-4">
              <p className="text-secondary-foreground">Transactions list would go here.</p>
            </TabsContent>
            <TabsContent value="analytics" className="p-4 border border-border bg-card mt-4">
              <p className="text-secondary-foreground">Analytics and charts would appear here.</p>
            </TabsContent>
          </Tabs>
        </Section>

        {/* ============================================= */}
        {/* STATS / METRICS */}
        {/* ============================================= */}
        <Section title="Stats & Metrics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 border border-border bg-card">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Network TPS</p>
              <p className="text-3xl font-light font-mono">719</p>
            </div>

            <div className="p-4 border border-border bg-card">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Staked</p>
              <p className="text-3xl font-light font-mono">14.55M</p>
              <p className="text-xs text-muted-foreground">SOL</p>
            </div>

            <div className="p-4 border border-border bg-card">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">APY</p>
              <p className="text-3xl font-light font-mono text-primary">6.62%</p>
            </div>

            <div className="p-4 border border-border bg-card">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">24h Change</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--success)]" />
                <p className="text-3xl font-light font-mono text-[var(--success)]">+2.4%</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-4">Stats with Brackets</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <BracketCard className="p-4 bg-card">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Validators</p>
                <p className="text-2xl font-light font-mono">1,847</p>
              </BracketCard>

              <BracketCard className="p-4 bg-card">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Epoch</p>
                <p className="text-2xl font-light font-mono">584</p>
              </BracketCard>

              <BracketCard className="p-4 bg-card">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Block Height</p>
                <p className="text-2xl font-light font-mono">251.2M</p>
              </BracketCard>
            </div>
          </div>
        </Section>

        {/* ============================================= */}
        {/* TABLE EXAMPLE */}
        {/* ============================================= */}
        <Section title="Data Table">
          <div className="border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground font-normal">Token</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground font-normal">Price</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground font-normal">24h</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground font-normal">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">Solana</p>
                      <p className="text-xs text-muted-foreground font-mono">SOL</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-sm">$142.50</td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-[var(--success)] font-mono text-sm flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +5.2%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-sm">$65.2B</td>
                </tr>
                <tr className="border-b border-border hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">Ethereum</p>
                      <p className="text-xs text-muted-foreground font-mono">ETH</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-sm">$2,340.00</td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-destructive font-mono text-sm flex items-center justify-end gap-1">
                      <TrendingDown className="w-3 h-3" />
                      -1.8%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-sm">$281.5B</td>
                </tr>
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">Bitcoin</p>
                      <p className="text-xs text-muted-foreground font-mono">BTC</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-sm">$43,250.00</td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-[var(--success)] font-mono text-sm flex items-center justify-end gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +2.1%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-sm">$847.3B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* ============================================= */}
        {/* ICONS */}
        {/* ============================================= */}
        <Section title="Icons (Lucide)">
          <div className="flex flex-wrap gap-6">
            {[
              { icon: Search, name: 'Search' },
              { icon: Copy, name: 'Copy' },
              { icon: ExternalLink, name: 'ExternalLink' },
              { icon: Settings, name: 'Settings' },
              { icon: Info, name: 'Info' },
              { icon: TrendingUp, name: 'TrendingUp' },
              { icon: TrendingDown, name: 'TrendingDown' },
              { icon: ChevronRight, name: 'ChevronRight' },
              { icon: Moon, name: 'Moon' },
              { icon: Sun, name: 'Sun' },
            ].map(({ icon: Icon, name }) => (
              <div key={name} className="flex flex-col items-center gap-2 p-4 border border-border bg-card">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ============================================= */}
        {/* COMPLETE EXAMPLE */}
        {/* ============================================= */}
        <Section title="Complete Example — Staking Card">
          <div className="max-w-lg">
            <BracketCard allCorners className="p-0 bg-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm tracking-widest uppercase">STAKE WITH US</h3>
                  <button className="p-1 hover:bg-surface rounded transition-colors">
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <p className="text-secondary-foreground text-sm mb-6">
                  Earn yield on your SOL while helping protect and improve Solana for everyone.{' '}
                  <a href="#" className="text-primary hover:underline">Learn more</a>
                </p>

                <DotDivider className="mb-6" />

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wide text-muted-foreground">Amount</label>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs border border-border hover:border-muted-foreground transition-colors">SOL</button>
                      <button className="px-3 py-1 text-xs border border-border hover:border-muted-foreground transition-colors">HALF</button>
                      <button className="px-3 py-1 text-xs border border-border hover:border-muted-foreground transition-colors">MAX</button>
                    </div>
                  </div>
                  <Input placeholder="Enter amount to stake" className="font-mono" />
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated APY</span>
                    <span className="font-mono text-primary">6.62%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Helius Fees</span>
                    <span className="font-mono">0%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Validator</span>
                    <span className="font-mono">Helius</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total staked</span>
                    <span className="font-mono">14.55M SOL</span>
                  </div>
                </div>

                <Button className="w-full">Connect Wallet</Button>
              </div>
            </BracketCard>
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <p className="text-xs text-muted-foreground">Minimal Data-Brutalism Design System — Xandeum pNodes Platform</p>
        </div>
      </footer>
    </div>
  )
}
