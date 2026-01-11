# LuckyVerse Design System

**Version:** 1.0.0  
**Last Updated:** 2025-11-30

---

## 🎨 Design Philosophy

LuckyVerse is a **premium, dark-mode gaming platform** that combines skill-based and chance-based games. The design embodies:

- **Mature & Premium**: Professional, high-end aesthetic
- **Game-Centric**: UI that enhances gameplay, not distracts
- **Clean & Minimal**: Zero clutter, maximum clarity
- **Consistent**: Every component follows the same visual language

---

## 🌈 Color Palette

### Theme: **Fire & Ember** (Orange/Amber accent)

```css
/* Background Hierarchy */
--bg-primary: #0A0A0A;      /* Main app background */
--bg-secondary: #111315;    /* Sections, containers */
--bg-tertiary: #151718;     /* Cards, elevated surfaces */

/* Surface Colors */
--surface-base: #1C1E1F;    /* Base surface */
--surface-elevated: #222425; /* Elevated cards, modals */
--surface-hover: #2A2C2D;   /* Hover states */

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-default: rgba(255, 255, 255, 0.10);
--border-strong: rgba(255, 255, 255, 0.18);

/* Text Hierarchy */
--text-primary: #FFFFFF;
--text-secondary: rgba(255, 255, 255, 0.72);
--text-tertiary: rgba(255, 255, 255, 0.56);
--text-disabled: rgba(255, 255, 255, 0.38);
--text-placeholder: rgba(255, 255, 255, 0.48);

/* Accent Color: Fire Orange */
--accent-primary: #FF6B35;    /* Primary CTA, highlights */
--accent-secondary: #FF8C42;  /* Secondary accents */
--accent-dark: #E85D2F;       /* Pressed states */
--accent-light: #FF9A5E;      /* Hover states */
--accent-glow: rgba(255, 107, 53, 0.24); /* Glow effects */

/* Semantic Colors */
--success: #10B981;           /* Emerald green */
--success-bg: rgba(16, 185, 129, 0.12);
--error: #EF4444;             /* Red */
--error-bg: rgba(239, 68, 68, 0.12);
--warning: #F59E0B;           /* Amber */
--warning-bg: rgba(245, 158, 11, 0.12);
--info: #06B6D4;              /* Cyan */
--info-bg: rgba(6, 182, 212, 0.12);

/* Game-specific */
--skill-color: #06B6D4;       /* Cyan for skill games */
--luck-color: #F59E0B;        /* Amber for luck games */
--live-indicator: #10B981;    /* Green for live status */
```

---

## 📝 Typography

### Font Stack

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Type Scale

```css
/* Display */
--text-display-xl: 4.5rem;   /* 72px - Hero text */
--text-display-lg: 3.75rem;  /* 60px */
--text-display-md: 3rem;     /* 48px */

/* Heading */
--text-h1: 2.25rem;          /* 36px */
--text-h2: 1.875rem;         /* 30px */
--text-h3: 1.5rem;           /* 24px */
--text-h4: 1.25rem;          /* 20px */
--text-h5: 1.125rem;         /* 18px */
--text-h6: 1rem;             /* 16px */

/* Body */
--text-body-lg: 1.125rem;    /* 18px */
--text-body: 1rem;           /* 16px */
--text-body-sm: 0.875rem;    /* 14px */
--text-body-xs: 0.75rem;     /* 12px */

/* Utility */
--text-caption: 0.75rem;     /* 12px */
--text-overline: 0.625rem;   /* 10px */

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;

/* Line Heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

---

## 📏 Spacing System

### 4/8 Point Grid System

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */

/* Page Structure */
--page-padding: var(--space-6);        /* 24px */
--section-padding-sm: var(--space-4);  /* 16px */
--section-padding-md: var(--space-6);  /* 24px */
--section-padding-lg: var(--space-8);  /* 32px */
```

---

## 🔲 Border Radius

```css
--radius-sm: 4px;      /* Small chips, badges */
--radius-md: 8px;      /* Buttons, inputs */
--radius-lg: 12px;     /* Cards */
--radius-xl: 16px;     /* Large cards, modals */
--radius-full: 9999px; /* Pills, avatars */
```

---

## 🌫️ Shadows & Elevation

```css
/* Subtle depth */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4),
             0 2px 4px -1px rgba(0, 0, 0, 0.2);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5),
             0 4px 6px -2px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6),
             0 10px 10px -5px rgba(0, 0, 0, 0.4);

/* Accent glows */
--glow-accent: 0 0 20px var(--accent-glow);
--glow-accent-strong: 0 0 30px var(--accent-glow),
                      0 0 60px rgba(255, 107, 53, 0.12);
```

---

## ⚡ Animation & Transitions

```css
/* Durations */
--duration-instant: 100ms;
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;

/* Easing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Common Transitions */
--transition-fast: all var(--duration-fast) var(--ease-in-out);
--transition-normal: all var(--duration-normal) var(--ease-in-out);
--transition-slow: all var(--duration-slow) var(--ease-in-out);
```

---

## 📱 Breakpoints

```css
--breakpoint-xs: 360px;   /* Mobile small */
--breakpoint-sm: 640px;   /* Mobile */
--breakpoint-md: 768px;   /* Tablet */--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1440px; /* Max app width */
```

---

## 🎯 Layout Constraints

```css
--max-width-app: 1440px;      /* Maximum app width */
--max-width-content: 1200px;  /* Maximum content width */
--max-width-prose: 65ch;      /* Max width for text blocks */

--header-height: 64px;
--footer-height: 80px;
--sidebar-width: 280px;
--sidebar-collapsed: 72px;
```

---

## 🧩 Component Specifications

### Buttons

```
Primary Button:
- Background: var(--accent-primary)
- Text: #FFFFFF
- Height: 40px (md), 36px (sm), 48px (lg)
- Padding: 16px 24px (md)
- Border Radius: var(--radius-md)
- Font Weight: 600
- Hover: var(--accent-light) + var(--glow-accent)
- Active: var(--accent-dark)
- Transition: var(--transition-fast)

Secondary Button:
- Background: var(--surface-elevated)
- Border: 1px solid var(--border-default)
- Text: var(--text-primary)
- Hover: var(--surface-hover)

Ghost Button:
- Background: transparent
- Text: var(--text-secondary)
- Hover: var(--surface-base)
```

### Cards

```
Base Card:
- Background: var(--surface-base)
- Border: 1px solid var(--border-subtle)
- Border Radius: var(--radius-lg)
- Padding: var(--space-6)
- Shadow: var(--shadow-sm)
- Hover: translate-y -2px, shadow-md
- Transition: var(--transition-normal)

Game Card:
- Same as Base Card
- Add top accent border: 3px solid var(--accent-primary)
- Hover glow: var(--glow-accent)
```

### Inputs

```
Text Input:
- Background: var(--surface-base)
- Border: 1px solid var(--border-default)
- Border Radius: var(--radius-md)
- Height: 40px
- Padding: 0 16px
- Font Size: var(--text-body)
- Text Color: var(--text-primary)
- Placeholder: var(--text-placeholder)
- Focus: Border color var(--accent-primary), glow var(--glow-accent)
```

---

## 🎮 Game-Specific Components

### Live Match Indicator

```
- Size: 8px circle
- Color: var(--live-indicator)
- Animation: pulse 2s infinite
- Glow: 0 0 8px var(--live-indicator)
```

### Wallet Display

```
- Background: var(--surface-elevated)
- Border: 1px solid var(--border-subtle)
- Padding: var(--space-4) var(--space-6)
- Border Radius: var(--radius-lg)
- Font Weight: 700
- Color: var(--accent-primary)
```

---

## ♿ Accessibility

### Contrast Ratios (WCAG AA)

- Primary text on background: 15:1 ✓
- Secondary text on background: 7:1 ✓
- Accent on background: 4.5:1 ✓

### Focus States

```css
--focus-ring: 0 0 0 3px var(--accent-glow);
--focus-outline: 2px solid var(--accent-primary);
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📂 Component Hierarchy

```
/src/components/
  /ui/              # Core design system components
    /button/
    /card/
    /input/
    /badge/
    /modal/
    /dropdown/
    /avatar/
    /tabs/
    /toast/
  /game/            # Game-specific components
    /game-card/
    /live-indicator/
    /match-card/
    /leaderboard-item/
  /layout/          # Layout components
    /header/
    /sidebar/
    /footer/
    /container/
```

---

## 🎨 Usage Examples

### Hero Section

```tsx
<Box className="hero">
  <H1 className="display-lg">Welcome to LuckyVerse</H1>
  <Text className="body-lg secondary">
    Premium skill & luck gaming platform
  </Text>
  <Button size="lg" variant="primary">
    Start Playing
  </Button>
</Box>
```

### Game Tile

```tsx
<Card className="game-card" accent="fire">
  <CardHeader>
    <Badge variant="skill">Skill</Badge>
    <LiveIndicator active={true} />
  </CardHeader>
  <CardBody>
    <H4>Tic-Tac-Toe</H4>
    <Text className="secondary">
      Outsmart your opponent
    </Text>
  </CardBody>
  <CardFooter>
    <Button fullWidth>Play Now</Button>
  </CardFooter>
</Card>
```

---

**End of Design System Documentation**
