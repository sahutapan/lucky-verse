# LuckyVerse Premium Casino Lobby - UI Design Specification

**Version:** 2.0  
**Date:** 2025-11-30  
**Design Philosophy:** Luxury Casino Lobby

---

## 🎨 Visual Identity

### Color Palette: **Luxe Casino**

```css
/* Primary Backgrounds */
--bg-void: #000000;           /* Pure black base */
--bg-charcoal: #0A0A0B;       /* Main background */
--bg-slate: #141416;          /* Cards, containers */
--bg-elevated: #1A1A1D;       /* Elevated surfaces */

/* Premium Accents */
--gold-primary: #D4AF37;      /* Pure gold */
--gold-light: #F4D03F;        /* Bright gold highlights */
--gold-dark: #B8941F;         /* Deep gold shadows */
--gold-glow: rgba(212, 175, 55, 0.3);

/* Emerald Accent */
--emerald: #10B981;           /* Success, live, premium */
--emerald-glow: rgba(16, 185, 129, 0.25);

/* Neon Highlights */
--neon-cyan: #00F0FF;         /* Hot games, jackpots */
--neon-pink: #FF1694;         /* New games, trending */
--neon-purple: #9D4EDD;       /* Special offers */

/* Surfaces & Borders */
--surface-glass: rgba(255, 255, 255, 0.02);
--border-dim: rgba(255, 255, 255, 0.08);
--border-bright: rgba(212, 175, 55, 0.3);
--border-neon: rgba(0, 240, 255, 0.4);

/* Text Hierarchy */
--text-white: #FFFFFF;
--text-gold: #D4AF37;
--text-dim: rgba(255, 255, 255, 0.65);
--text-muted: rgba(255, 255, 255, 0.45);

/* Gradients */
--gradient-gold: linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%);
--gradient-dark: linear-gradient(180deg, #000000 0%, #0A0A0B 100%);
--gradient-shimmer: linear-gradient(90deg, 
  transparent 0%, 
  rgba(212, 175, 55, 0.1) 50%, 
  transparent 100%);
```

---

## 📝 Typography

### Font Stack
```css
--font-display: 'Playfair Display', 'Georgia', serif;  /* Luxury headers */
--font-primary: 'Inter', 'SF Pro Display', sans-serif; /* UI text */
--font-mono: 'JetBrains Mono', monospace;              /* Numbers, RTP */
```

### Type Scale
```css
/* Display */
--text-hero: clamp(2.5rem, 5vw, 4rem);      /* Hero titles */
--text-display: clamp(2rem, 4vw, 3rem);     /* Section headers */

/* Headings */
--text-h1: 2rem;                             /* 32px */
--text-h2: 1.5rem;                           /* 24px */
--text-h3: 1.25rem;                          /* 20px */
--text-h4: 1.125rem;                         /* 18px */

/* Body */
--text-body: 0.9375rem;                      /* 15px */
--text-small: 0.875rem;                      /* 14px */
--text-tiny: 0.75rem;                        /* 12px */

/* Weights */
--weight-light: 300;
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-black: 900;
```

---

## 🏗️ Layout Architecture

### Grid System
- **Max Width**: 1600px (wider for immersive feel)
- **Container Padding**: 24px mobile, 40px desktop
- **Section Spacing**: 64px desktop, 40px mobile
- **Grid Columns**: 12-column responsive grid

### Breakpoints
```css
--mobile: 360px
--tablet: 768px
--desktop: 1024px
--wide: 1440px
--ultra: 1920px
```

---

## 🎯 Component Specifications

### 1. Top Navigation Bar

**Height:** 72px  
**Background:** `bg-charcoal` with `backdrop-blur-xl`  
**Border:** Bottom 1px `border-dim`  
**Position:** Sticky

**Layout:**
```
[Logo] ────────── [Balance Badge] [Notifications] [Profile Avatar]
```

**Elements:**
- **Logo**: Gold gradient text + icon, 180px width
- **Balance Display**: 
  - Background: `surface-glass` + gold border
  - Padding: 8px 16px
  - Border radius: 24px (pill)
  - Format: "₹ 12,345.00" with coin icon
  - Glow effect on hover
- **Notifications**: 
  - Icon with red badge count
  - Dropdown on click
- **Profile Avatar**: 
  - 40px circle
  - Gold border (2px)
  - Dropdown menu

---

### 2. Hero Banner Section

**Height:** 400px desktop, 300px mobile  
**Background:** Gradient + animated particles/light streaks

**Structure:**
```
┌─────────────────────────────────────────────┐
│                                             │
│  Welcome, [Username] 👋                     │
│  Ready for the ultimate casino experience?  │
│                                             │
│  [Rotating Promotional Banner]             │
│  - Jackpot: ₹50,000                        │
│  - New Games                               │
│  - Bonus Offers                            │
│                                             │
│  [Play Now CTA]                            │
└─────────────────────────────────────────────┘
```

**Features:**
- Animated gold light streaks
- Rotating banners with slide transition
- Parallax effect on scroll (subtle)
- CTA button with gold gradient + glow

---

### 3. Game Categories Carousel

**Height:** 120px  
**Scroll:** Horizontal auto-scroll

**Category Pills:**
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ 🎰 Slots │  │ 🃏 Cards │  │ 🎲 Dice  │
└──────────┘  └──────────┘  └──────────┘
```

**Styling:**
- Pill shape (border-radius: 60px)
- Background: `surface-glass` → gold gradient on active
- Icon + label
- Smooth scroll snap
- Hover: Scale 1.05, gold glow

**Categories:**
- All Games
- Slots
- Live Casino
- Roulette
- Blackjack
- Teen Patti
- Andar Bahar
- Baccarat

---

### 4. Game Cards Grid

**Grid:** 
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns
- Ultra-wide: 5 columns

**Gap:** 24px

**Game Card Dimensions:**
- Aspect ratio: 3:4
- Min width: 200px
- Max width: 280px

**Game Card Anatomy:**

```
┌─────────────────────┐
│                     │ ← Thumbnail (gradient overlay)
│   [Game Cover]      │
│                     │
│  [HOT Badge]        │ ← Top-left tag
│                     │
├─────────────────────┤
│ Game Name           │ ← Title
│ ★★★★☆ • High Vol.  │ ← Rating + RTP
│ [Play Now]          │ ← CTA button
└─────────────────────┘
```

**Styling:**
- **Container**: 
  - Background: `bg-slate`
  - Border: 1px `border-dim`
  - Border-radius: 16px
  - Overflow: hidden
- **Hover State**:
  - Translate Y: -8px
  - Border: Gold/Cyan/Pink glow (based on tag)
  - Shadow: `0 20px 60px rgba(0,0,0,0.6)`
  - Scale: 1.02
- **Thumbnail**: 
  - Gradient overlay: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)`
  - Shimmer animation on hover
- **Tags** (Top-left badge):
  - "Hot" → Neon cyan glow
  - "New" → Neon pink glow
  - "Jackpot" → Gold glow
  - Padding: 4px 12px
  - Border-radius: 12px
  - Font: 11px, bold, uppercase

---

### 5. Additional Components

#### Load More Button
- Width: 200px centered
- Background: Gold gradient
- Text: "Load More Games"
- Icon: Chevron down
- Hover: Glow + scale

#### Section Headers
```
┌─────────────────────────────────────────┐
│ 🔥 Hot Games                      [→]  │
├─────────────────────────────────────────┤
```
- Title: `text-h2`, gold color
- Icon prefix
- "View All" link on right
- Divider line below

#### Filter & Sort Bar
- Sticky below nav on scroll
- Chips for: "All", "Popular", "New", "High RTP"
- Sort dropdown: "Newest", "Popular", "A-Z"

---

## 🎬 Animations & Micro-interactions

### Timings
```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Effects
1. **Card Hover**: 
   - Transform: translateY(-8px) scale(1.02)
   - Transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
   
2. **Button Hover**:
   - Background: Gradient shift
   - Glow pulse animation
   
3. **Banner Rotation**:
   - Slide transition every 5s
   - Fade in/out 500ms
   
4. **Category Pills**:
   - Active: Background gold gradient
   - Smooth scroll snap
   
5. **Shimmer Effect** (on cards):
   - Keyframes: Move gradient from -100% to 100%
   - Duration: 2s infinite

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- Nav: Hamburger menu
- Hero: 300px height
- Categories: Full-width scroll
- Game Grid: 2 columns
- Reduce spacing: 40px sections

### Tablet (768px - 1024px)
- Hero: 350px
- Game Grid: 3 columns
- Categories: Visible scroll

### Desktop (> 1024px)
- Full layout
- 4-5 columns
- Parallax effects enabled

---

## 🎯 Implementation Priority

1. **Phase 1**: Navigation + Hero Banner
2. **Phase 2**: Game Categories Carousel
3. **Phase 3**: Game Card Component
4. **Phase 4**: Grid Layout + Filters
5. **Phase 5**: Animations + Polish

---

## 🔍 Accessibility

- ✅ WCAG AA contrast ratios
- ✅ Keyboard navigation
- ✅ Screen reader labels
- ✅ Focus indicators (gold ring)
- ✅ Reduced motion support

---

## 🎨 Inspiration References

**Visual Style:**
- Stake.com - Clean, modern casino UI
- Betway - Premium card design
- Bet365 - Navigation simplicity
- BetMGM - Gold accents, luxury feel

**Key Differentiators:**
- More immersive hero section
- Better use of gold/emerald accents
- Smoother animations
- Cleaner card design

---

**End of Design Specification**
