# Minimal Data-Brutalism Design System

A design system for building clean, technical, data-focused interfaces with subtle brutalist accents. This style is ideal for blockchain explorers, trading platforms, dashboards, and data-heavy applications.

---

## Design Philosophy

This system prioritizes clarity, precision, and restraint. Every element serves a functional purpose. Decoration is minimal and intentional. Data is the hero.

### Core Principles

1. **Minimal Chrome** — Reduce visual noise. No shadows, minimal borders. Let data breathe.
2. **Technical Precision** — Monospace for data, consistent spacing, grid-aligned layouts.
3. **Subtle Brutalism** — Corner brackets in accent color, stark typography, functional aesthetics.
4. **Flat Design** — No gradients, no shadows, no depth effects. Everything exists on a single plane.
5. **Single Accent** — One accent color used sparingly against white. Never multiple accent colors.

---

## Color Palette

### Primary Colors

| Name            | Hex       | Usage                                                           |
| --------------- | --------- | --------------------------------------------------------------- |
| Primary (Coral) | `#E8533C` | Buttons, active states, links, accent elements, corner brackets |
| Primary Hover   | `#D64A35` | Button hover states                                             |
| Background      | `#FFFFFF` | Page background                                                 |
| Surface         | `#FAFAFA` | Card backgrounds, alternating rows                              |

### Neutral Colors

| Name           | Hex       | Usage                                      |
| -------------- | --------- | ------------------------------------------ |
| Border         | `#E5E5E5` | Dividers, inactive borders, table lines    |
| Text Primary   | `#1A1A1A` | Headlines, important data, primary content |
| Text Secondary | `#6B6B6B` | Body text, descriptions                    |
| Text Muted     | `#9CA3AF` | Labels, captions, placeholder text         |

### Semantic Colors

| Name             | Hex       | Usage                                       |
| ---------------- | --------- | ------------------------------------------- |
| Success/Positive | `#22C55E` | Positive percentages, success states, gains |
| Error/Negative   | `#EF4444` | Negative percentages, error states, losses  |

### Color Rules

- The accent color (#E8533C) should appear sparingly. Overuse diminishes impact.
- Use semantic colors only for data that represents positive/negative values.
- Never use gradients except for progress bars (gradient from success to primary is acceptable).
- Charts and graphs should use the primary coral color or muted versions of it.

---

## Typography

### Font Stack

```css
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "SF Mono", "Fira Code", "Consolas", monospace;
```

### Type Scale

| Element        | Style                                             | Example                   |
| -------------- | ------------------------------------------------- | ------------------------- |
| Page Title     | `text-2xl tracking-widest uppercase font-normal`  | STAKE WITH US             |
| Section Header | `text-sm tracking-widest uppercase text-gray-400` | RECENT BLOCKS             |
| Body Text      | `text-base text-gray-600`                         | Earn yield on your SOL... |
| Data/Numbers   | `font-mono text-sm`                               | 14.55M SOL                |
| Addresses      | `font-mono text-sm text-gray-500`                 | Fd7btg...2v69Nk           |
| Labels         | `text-xs uppercase tracking-wide text-gray-500`   | Estimated APY             |
| Small Data     | `text-xs font-mono`                               | 0.804.30008               |

### Typography Rules

- Headers are ALWAYS uppercase with wide letter-spacing (tracking-widest).
- Use monospace font for all numerical data, addresses, hashes, and technical values.
- Body text uses the system sans-serif font.
- Never use bold for emphasis in headers. Use letter-spacing and size instead.
- Truncate long addresses with ellipsis in the middle: `Fd7btg...2v69Nk`

---

## Spacing System

Use a consistent 4px base unit. Common spacing values:

| Token | Value | Usage                      |
| ----- | ----- | -------------------------- |
| xs    | 4px   | Tight gaps, inline spacing |
| sm    | 8px   | Related element spacing    |
| md    | 12px  | Component internal padding |
| base  | 16px  | Standard padding, gaps     |
| lg    | 24px  | Card padding, section gaps |
| xl    | 32px  | Major section separation   |
| 2xl   | 48px  | Page-level spacing         |

### Spacing Rules

- Generous whitespace is essential. When in doubt, add more space.
- Cards should have 24px padding minimum.
- Table rows should have 16px vertical padding.
- Maintain consistent gaps within component groups.

---

## Signature Elements

### Decorative Patterns

This design system uses subtle dot-based decorations to add technical texture without visual heaviness.

#### Dot Grid Background

A subtle grid of dots used as background texture on sections or cards. Creates a "graph paper" or "technical blueprint" feel.

**CSS Implementation:**

```css
.dot-grid-bg {
  background-image: radial-gradient(circle, #e5e5e5 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Subtle version */
.dot-grid-bg-subtle {
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.07) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}

/* Accent colored dots (use sparingly) */
.dot-grid-bg-accent {
  background-image: radial-gradient(
    circle,
    rgba(232, 83, 60, 0.15) 1px,
    transparent 1px
  );
  background-size: 16px 16px;
}
```

**Tailwind + Emotion:**

```tsx
import styled from '@emotion/styled'

const DotGridSection = styled.section`
  background-image: radial-gradient(circle, #E5E5E5 1px, transparent 1px);
  background-size: 16px 16px;
`

// Usage
<DotGridSection className="p-8">
  {content}
</DotGridSection>
```

**When to use:**

- Hero sections or featured areas
- Empty states
- Behind stats or metrics
- Card backgrounds for emphasis

---

#### Double Dot-Line Divider

Two parallel horizontal lines made of closely spaced dots, creating a distinctive technical divider.

**CSS Implementation:**

```css
.dot-divider {
  height: 6px;
  background-image: radial-gradient(circle, #e8533c 1.5px, transparent 1.5px),
    radial-gradient(circle, #e8533c 1.5px, transparent 1.5px);
  background-size: 8px 3px;
  background-position: 0 0, 0 3px;
  background-repeat: repeat-x;
}

/* Muted version */
.dot-divider-muted {
  height: 6px;
  background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px),
    radial-gradient(circle, #d1d5db 1px, transparent 1px);
  background-size: 6px 3px;
  background-position: 0 0, 0 3px;
  background-repeat: repeat-x;
}
```

**Emotion Component:**

```tsx
import styled from '@emotion/styled'

interface DotDividerProps {
  color?: string
  dotSize?: number
  spacing?: number
}

const DotDivider = styled.div<DotDividerProps>`
  height: 6px;
  width: 100%;
  background-image:
    radial-gradient(circle, ${p => p.color || '#E8533C'} ${p => p.dotSize || 1.5}px, transparent ${p => p.dotSize || 1.5}px),
    radial-gradient(circle, ${p => p.color || '#E8533C'} ${p => p.dotSize || 1.5}px, transparent ${p => p.dotSize || 1.5}px);
  background-size: ${p => p.spacing || 8}px 3px;
  background-position: 0 0, 0 3px;
  background-repeat: repeat-x;
`

// Usage
<DotDivider />
<DotDivider color="#D1D5DB" dotSize={1} spacing={6} />
```

**When to use:**

- Below headers/titles
- Section separators
- Progress indicators (as track background)
- Above footers

---

#### Single Dot-Line

A single row of dots, useful for lighter separation.

```css
.dot-line {
  height: 2px;
  background-image: radial-gradient(circle, #e8533c 1px, transparent 1px);
  background-size: 6px 2px;
  background-repeat: repeat-x;
}
```

---

#### Dot-Based Progress Bar

Progress bar with dot texture in the track.

```tsx
const DotProgressTrack = styled.div`
  height: 8px;
  background-image:
    radial-gradient(circle, #E5E5E5 1.5px, transparent 1.5px),
    radial-gradient(circle, #E5E5E5 1.5px, transparent 1.5px);
  background-size: 8px 4px;
  background-position: 0 0, 4px 4px;
  border-radius: 4px;
  overflow: hidden;
`

const DotProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${p => p.percent}%;
  background: linear-gradient(90deg, #22C55E, #E8533C);
  border-radius: 4px;
`

// Usage
<DotProgressTrack>
  <DotProgressFill percent={73.4} />
</DotProgressTrack>
```

---

#### Pattern Usage Guidelines

| Pattern                 | Use Case                                    | Color                       |
| ----------------------- | ------------------------------------------- | --------------------------- |
| Dot grid background     | Hero sections, featured cards, empty states | Muted gray or subtle accent |
| Double dot-line divider | Below titles, section breaks                | Primary accent (#E8533C)    |
| Single dot-line         | Light separation, inline dividers           | Muted or accent             |
| Dot progress track      | Progress bars, loading states               | Gray dots with colored fill |

**Rules:**

- Don't overuse — these are accent patterns, not defaults
- Dot grid works best on larger areas, not small cards
- Double dot-line dividers should be full-width or contained within padding
- Maintain consistent dot sizes (1px-2px) and spacing (6px-16px)

---

#### Chamfered Corner Cards

Cards with diagonal cut-off corners, typically on the top-left and/or top-right. Adds a technical, sci-fi aesthetic.

**CSS Implementation using clip-path:**

```css
/* Top corners chamfered */
.card-chamfered {
  clip-path: polygon(
    12px 0,
    /* top-left corner start */ calc(100% - 12px) 0,
    /* top-right corner start */ 100% 12px,
    /* top-right corner end */ 100% 100%,
    /* bottom-right */ 0 100%,
    /* bottom-left */ 0 12px /* top-left corner end */
  );
}

/* Only top-left chamfered */
.card-chamfered-tl {
  clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px);
}

/* Only top-right chamfered */
.card-chamfered-tr {
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
}

/* All four corners chamfered */
.card-chamfered-all {
  clip-path: polygon(
    12px 0,
    calc(100% - 12px) 0,
    100% 12px,
    100% calc(100% - 12px),
    calc(100% - 12px) 100%,
    12px 100%,
    0 calc(100% - 12px),
    0 12px
  );
}
```

**Emotion Component:**

```tsx
import styled from '@emotion/styled'

type ChamferPosition = 'top' | 'top-left' | 'top-right' | 'all'

interface ChamferedCardProps {
  chamfer?: ChamferPosition
  size?: number
}

const chamferPaths = {
  'top': (s: number) => `polygon(
    ${s}px 0, calc(100% - ${s}px) 0, 100% ${s}px,
    100% 100%, 0 100%, 0 ${s}px
  )`,
  'top-left': (s: number) => `polygon(
    ${s}px 0, 100% 0, 100% 100%, 0 100%, 0 ${s}px
  )`,
  'top-right': (s: number) => `polygon(
    0 0, calc(100% - ${s}px) 0, 100% ${s}px,
    100% 100%, 0 100%
  )`,
  'all': (s: number) => `polygon(
    ${s}px 0, calc(100% - ${s}px) 0, 100% ${s}px,
    100% calc(100% - ${s}px), calc(100% - ${s}px) 100%,
    ${s}px 100%, 0 calc(100% - ${s}px), 0 ${s}px
  )`,
}

const ChamferedCard = styled.div<ChamferedCardProps>`
  background: white;
  padding: 24px;
  clip-path: ${p => chamferPaths[p.chamfer || 'top'](p.size || 12)};
`

// Usage
<ChamferedCard chamfer="top" size={16} className="border border-gray-200">
  {content}
</ChamferedCard>
```

**With visible border on chamfered edges:**

Since `clip-path` cuts off borders, use an SVG background or pseudo-element for visible edges:

```tsx
const ChamferedCardWithBorder = styled.div<{ size?: number }>`
  --chamfer: ${(p) => p.size || 12}px;
  position: relative;
  background: white;
  padding: 24px;
  clip-path: polygon(
    var(--chamfer) 0,
    calc(100% - var(--chamfer)) 0,
    100% var(--chamfer),
    100% 100%,
    0 100%,
    0 var(--chamfer)
  );

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        135deg,
        #e8533c var(--chamfer),
        transparent var(--chamfer)
      ), linear-gradient(-135deg, #e8533c var(--chamfer), transparent var(--chamfer));
    background-size: 100% 2px;
    background-repeat: no-repeat;
    background-position: top left, top right;
    pointer-events: none;
  }
`;
```

**Alternative: Border with corner notch effect**

```css
.card-notched {
  position: relative;
  background: white;
  border: 1px solid #e5e5e5;
}

.card-notched::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  width: 16px;
  height: 16px;
  background: white;
  border-bottom: 1px solid #e5e5e5;
  transform: rotate(45deg);
  transform-origin: bottom right;
}
```

**When to use:**

- Featured cards or highlighted content
- Navigation cards or menu items
- Stats blocks for visual interest
- Headers or hero sections

**Chamfer sizes:**

- Small: 8px — subtle, for smaller cards
- Medium: 12px — default, balanced look
- Large: 16-20px — prominent, for hero elements

---

### Corner Brackets

The corner bracket decoration is a signature element of this design system. It adds a subtle brutalist touch to containers.

### Implementation

```css
.bracket-card {
  position: relative;
  padding: 24px;
}

.bracket-card::before,
.bracket-card::after,
.bracket-card > .bracket-tl,
.bracket-card > .bracket-br {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: #e8533c; /* Primary accent color */
  border-style: solid;
  border-width: 2px;
}

/* Top-left bracket */
.bracket-card::before {
  content: "";
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

/* Bottom-right bracket */
.bracket-card::after {
  content: "";
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}
```

For all four corners, add pseudo-elements or additional divs for top-right and bottom-left.

### When to Use Brackets

- Primary content cards (staking forms, main data displays)
- Hero sections or featured content
- Modal dialogs
- Do NOT use on every card — reserve for important containers

---

## Components

### Buttons

**Primary Button (CTA)**

- Background: `#E8533C`
- Text: White
- Padding: `12px 32px`
- No border-radius or minimal (2px max)
- Hover: `#D64A35`
- Full-width in forms/cards

**Secondary Button**

- Background: White
- Border: `1px solid #E5E5E5`
- Text: `#1A1A1A`
- Padding: `8px 16px`
- Hover: Border darkens to `#D1D5DB`

**Toggle Button Group**

- Container: `border border-gray-200`
- Active: `bg-gray-100`
- Inactive: `bg-white`
- Separator: `border-l border-gray-200`

**Pill Buttons (Amount selectors)**

- Border: `1px solid #E5E5E5`
- Padding: `4px 12px`
- Text: `text-sm`
- Arranged horizontally with small gap

### Cards

- Background: White or `#FAFAFA`
- Border: None or `1px solid #E5E5E5`
- Border-radius: None or `4px` maximum
- Shadow: NEVER use shadows
- Padding: 24px

### Tables

- Header row: `text-xs uppercase tracking-wide text-gray-400`
- Data cells: `font-mono` for numbers, regular for text
- Row hover: `bg-gray-50`
- Dividers: `border-b border-gray-100`
- No outer border on tables
- Vertical alignment: center

### Input Fields

- Border: `1px solid #E5E5E5`
- Focus border: `#9CA3AF` (no colored focus ring)
- Padding: `12px 16px`
- Placeholder: `text-gray-400`
- No border-radius or 2px maximum
- No shadows or glows

### Tabs/Navigation

- Active tab: Primary color text, optional underline in primary color
- Inactive: `text-gray-400`
- Hover: `text-gray-600`
- Spacing: `gap-6` between tabs
- Style: Text only, no background pills

### Stats/Metrics Display

- Label: `text-xs uppercase tracking-widest text-gray-400`
- Value: `text-3xl font-light` or `text-2xl`
- Use primary color for highlighted metrics
- Contained in bordered cards or standalone

### Progress Bars

- Track: `bg-gray-100`
- Fill: Solid primary color or gradient from `#22C55E` to `#E8533C`
- Height: 8px
- Border-radius: Full (rounded-full)

---

## Icons

### Icon Library

Use SVG icons from free libraries only:

- Lucide React (`lucide-react`)
- Heroicons (`@heroicons/react`)
- Tabler Icons (`@tabler/icons-react`)

### Icon Rules

- NEVER use emojis. Always use SVG icons.
- Icon size: 16px for inline, 20px for buttons, 24px for standalone
- Icon color: Match text color (gray-400 for muted, gray-600 for standard)
- Stroke width: 1.5px or 2px
- Use icons sparingly — only where they aid comprehension

### Common Icon Usage

| Context          | Icon                             | Library |
| ---------------- | -------------------------------- | ------- |
| Info tooltip     | `Info` or `HelpCircle`           | Lucide  |
| External link    | `ExternalLink` or `ArrowUpRight` | Lucide  |
| Copy             | `Copy` or `Clipboard`            | Lucide  |
| Settings         | `Settings` or `Cog`              | Lucide  |
| Search           | `Search`                         | Lucide  |
| Close            | `X`                              | Lucide  |
| Arrow indicators | `ChevronRight`, `ChevronDown`    | Lucide  |
| Trending         | `TrendingUp`, `TrendingDown`     | Lucide  |

---

## Charts and Data Visualization

### Sparklines

- Height: 32px
- Color: Primary coral for downtrend (or red), subtle green for uptrend
- No axes, no labels
- Line weight: 2px
- Area fill: 10% opacity of line color

### Bar Charts

- Bar color: Primary coral
- Background: None or very light gray
- No gridlines or minimal
- Labels below in muted text

### Donut/Pie Charts

- Use muted, desaturated colors
- Primary segments can use accent color
- No 3D effects
- Clean legends in small text

---

## Layout Patterns

### Page Structure

- Max content width: 1200px - 1400px
- Side padding: 32px on desktop, 16px on mobile
- Section spacing: 48px between major sections

### Grid

- Use CSS Grid or Flexbox
- Common patterns: 3-column for stats, 1-column for tables
- Gap: 24px between grid items

### Navigation

- Horizontal top navigation
- Logo left, nav items center or right
- Search bar with icon
- Settings/wallet connection on far right
- Subtle bottom border or no border

### Footer

- Minimal
- "Powered by" branding
- Social icons in a row
- Muted colors

---

## Interaction States

### Hover

- Buttons: Darken background slightly
- Rows: `bg-gray-50`
- Links: Underline or darken
- Cards: Subtle border color change

### Focus

- Use `outline-none` with custom border
- Focus border: `border-gray-400` or primary color
- No browser default focus rings

### Active/Selected

- Primary color text or background
- Bottom border for tabs
- Filled background for toggles

### Disabled

- Opacity: 50%
- Cursor: `not-allowed`
- No hover effects

---

## Do's and Don'ts

### DO

- Use ample whitespace
- Keep decorations minimal
- Use monospace for all numerical data
- Maintain flat, shadowless design
- Use corner brackets sparingly on important containers
- Truncate addresses with middle ellipsis
- Use uppercase headers with letter-spacing

### DON'T

- Add shadows or depth effects
- Use multiple accent colors
- Use emojis (use SVG icons instead)
- Apply heavy border-radius (keep sharp or minimal)
- Overcrowd layouts with elements
- Use gradients (except progress bars)
- Use decorative fonts
- Add animations beyond simple hover transitions

---

## Example Component Patterns

### Staking Card

```
[Corner brackets in #E8533C on all four corners]

STAKE WITH US                              [copy icon]

Earn yield on your SOL while helping protect
and improve Solana for everyone. Learn more

[═══════════════════════════════════════════]

AMOUNT                        [SOL] [HALF] [MAX]
┌─────────────────────────────────────────────┐
│ Enter amount to stake                       │
└─────────────────────────────────────────────┘

Estimated APY                           6.62%
Helius Fees                               0%
Validator                             Helius
Total staked                      14.55M SOL

[          Connect Wallet (primary button)        ]
```

### Data Table Row

```
[Token Icon] Token Name     $XXX.XX  [sparkline]  ±X.X%  $XXB  $XXM  [Buy]
             SYMBOL
```

### Stats Block

```
┌─────────────────┐
│ NETWORK TPS     │
│ 719             │
└─────────────────┘
```

---

## Tech Stack

### Core Technologies

| Technology      | Purpose                              | Documentation   |
| --------------- | ------------------------------------ | --------------- |
| **Next.js**     | React framework, routing, SSR        | nextjs.org      |
| **TailwindCSS** | Utility-first styling                | tailwindcss.com |
| **Emotion**     | CSS-in-JS for complex/dynamic styles | emotion.sh      |
| **Radix UI**    | Unstyled, accessible primitives      | radix-ui.com    |
| **shadcn/ui**   | Pre-built components on Radix        | ui.shadcn.com   |
| **Lucide**      | Icons and icon font                  | lucide.dev      |

### When to Use Each Styling Approach

**TailwindCSS (Primary)**

- Standard component styling
- Layout and spacing
- Typography utilities
- Responsive design
- Static styles

```tsx
<button className="bg-[#E8533C] text-white px-8 py-3 hover:bg-[#D64A35] transition-colors">
  Connect Wallet
</button>
```

**Emotion (Secondary)**

- Dynamic styles based on props/state
- Complex animations
- Styles that need runtime computation
- CSS-in-JS patterns when Tailwind is limiting

```tsx
import styled from "@emotion/styled";

const BracketCard = styled.div<{ accentColor?: string }>`
  position: relative;
  padding: 24px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-color: ${(props) => props.accentColor || "#E8533C"};
    border-style: solid;
    border-width: 2px;
  }

  &::before {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
  }

  &::after {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
  }
`;
```

**Combining Tailwind + Emotion**

```tsx
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Card = styled.div`
  ${props => props.hasBrackets && css`
    &::before { /* bracket styles */ }
  `}
`

// Usage with Tailwind classes
<Card className="p-6 bg-white" hasBrackets>
  {children}
</Card>
```

### Radix UI + shadcn/ui Setup

Use shadcn/ui components as base, then override styles to match this design system.

**Customizing shadcn/ui for this design system:**

```tsx
// components/ui/button.tsx - Override shadcn defaults
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#E8533C] text-white hover:bg-[#D64A35]",
        secondary: "border border-gray-200 bg-white hover:border-gray-400",
        ghost: "hover:bg-gray-50",
      },
      size: {
        default: "px-8 py-3",
        sm: "px-4 py-2 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

**Radix primitives to use:**

| Component    | Radix Primitive                 | Notes                               |
| ------------ | ------------------------------- | ----------------------------------- |
| Dropdown     | `@radix-ui/react-dropdown-menu` | Style with flat borders, no shadows |
| Dialog/Modal | `@radix-ui/react-dialog`        | Add corner brackets to content      |
| Tabs         | `@radix-ui/react-tabs`          | Underline style, not pills          |
| Tooltip      | `@radix-ui/react-tooltip`       | Minimal, dark background            |
| Select       | `@radix-ui/react-select`        | Match input field styling           |
| Toggle Group | `@radix-ui/react-toggle-group`  | For button groups like 1H/24H       |

### Lucide Icons Usage

```tsx
import { Search, Copy, ExternalLink, Settings, ChevronDown, TrendingUp, TrendingDown, Info, X } from 'lucide-react'

// Standard usage
<Search className="w-4 h-4 text-gray-400" />

// In buttons
<button className="flex items-center gap-2">
  <Copy className="w-4 h-4" />
  Copy Address
</button>

// Muted helper icons
<div className="flex items-center gap-1">
  <span className="text-xs uppercase tracking-widest text-gray-400">Network TPS</span>
  <Info className="w-3 h-3 text-gray-300" />
</div>
```

### Tailwind Config Extensions

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E8533C",
          hover: "#D64A35",
        },
        surface: "#FAFAFA",
      },
      fontFamily: {
        mono: ["SF Mono", "Fira Code", "Consolas", "monospace"],
      },
      letterSpacing: {
        widest: "0.15em",
      },
    },
  },
};
```

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── (routes)/
├── components/
│   ├── ui/                 # shadcn/ui overrides
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── common/             # Shared components
│   │   ├── BracketCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── StatBlock.tsx
│   │   └── ...
│   └── features/           # Feature-specific components
├── styles/
│   ├── globals.css         # Tailwind imports + base styles
│   └── theme.ts            # Emotion theme tokens
├── lib/
│   └── utils.ts            # cn() helper, etc.
└── types/
```

### Utility Helper

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Implementation Notes

When generating UI code:

1. **Prefer TailwindCSS** for all standard styling
2. **Use Emotion** only for dynamic styles, pseudo-elements (like brackets), or complex patterns
3. **Use shadcn/ui components** as base, override styles to remove shadows and match flat aesthetic
4. **Import icons from `lucide-react`** — never use emojis
5. Use `tracking-widest` for headers, `font-mono` for data
6. Use CSS pseudo-elements (via Emotion) for corner brackets
7. Keep component markup clean and semantic
8. Use the `cn()` utility to merge Tailwind classes conditionally

### Code Generation Patterns

**Basic Component:**

```tsx
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Component({ className, children }: Props) {
  return (
    <div className={cn("p-6 bg-white border border-gray-200", className)}>
      {children}
    </div>
  );
}
```

**Component with Brackets (Emotion):**

```tsx
import styled from "@emotion/styled";
import { cn } from "@/lib/utils";

const BracketWrapper = styled.div`
  position: relative;
  &::before,
  &::after {
    /* bracket styles */
  }
`;

export function BracketCard({ className, children }: Props) {
  return (
    <BracketWrapper className={cn("p-6", className)}>{children}</BracketWrapper>
  );
}
```

This design system emphasizes restraint. When in doubt, remove rather than add.
