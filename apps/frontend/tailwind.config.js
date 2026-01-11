/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Base backgrounds (root level for bg-* utilities)
                void: '#0c0b09',        // Black-brown pirate void
                charcoal: '#111111',    // Pure charcoal
                slate: '#3a2b1c',       // Dark wood
                elevated: '#1a1a1d',    // Slightly lighter dark

                // Premium Pirate Theme Colors
                pirate: {
                    // Treasure Gold (weathered, aged)
                    'gold': '#d4af37',
                    'gold-dark': '#bf9b30',
                    'gold-light': '#e8c547',
                    'gold-glow': 'rgba(212, 175, 55, 0.4)',

                    // Ocean & Water
                    'ocean-deep': '#0d3536',
                    'ocean': '#1a5f5f',
                    'ocean-light': '#2a7f7f',

                    // Wood & Earth
                    'wood-dark': '#3a2b1c',
                    'wood': '#4a3b2c',
                    'wood-light': '#5a4b3c',

                    // Accents
                    'maroon': '#5b1a1a',      // Blood red
                    'rust': '#a65e2e',        // Burnt orange/rust
                    'parchment': '#d6c7a1',   // Old map paper

                    // Darks
                    'void': '#0c0b09',        // Deepest dark
                    'charcoal': '#111111',    // Pure black
                },

                // Navy Unified Theme (Seamless Design)
                navy: {
                    'void': '#1a1f2e',        // Main background - matches Wizard Casino reference
                    'primary': '#0f141f',     // Cards, elevated elements
                    'secondary': '#141824',   // Hover states
                    'elevated': '#1a1f2e',    // More prominent elements
                },

                // Legacy compatibility (keep for gradual migration)
                bg: {
                    void: '#0c0b09',
                    charcoal: '#111111',
                    slate: '#3a2b1c',
                    elevated: '#1a1a1d',
                    primary: '#0c0b09',
                    secondary: '#111315',
                    tertiary: '#151718',
                },
                // Premium Gold Accents
                gold: {
                    primary: '#D4AF37',
                    light: '#F4D03F',
                    dark: '#B8941F',
                    glow: 'rgba(212, 175, 55, 0.3)',
                },
                // Emerald
                emerald: {
                    DEFAULT: '#10B981',
                    glow: 'rgba(16, 185, 129, 0.25)',
                },
                // Neon Highlights
                neon: {
                    cyan: '#00F0FF',
                    pink: '#FF1694',
                    purple: '#9D4EDD',
                },
                // Surface colors
                surface: {
                    base: '#1C1E1F',
                    elevated: '#222425',
                    hover: '#2A2C2D',
                    glass: 'rgba(255, 255, 255, 0.02)',
                },
                // Border colors
                border: {
                    subtle: 'rgba(255, 255, 255, 0.06)',
                    DEFAULT: 'rgba(255, 255, 255, 0.10)',
                    dim: 'rgba(255, 255, 255, 0.08)',
                    bright: 'rgba(212, 175, 55, 0.3)',
                    neon: 'rgba(0, 240, 255, 0.4)',
                    strong: 'rgba(255, 255, 255, 0.18)',
                },
                // Text colors
                text: {
                    white: '#FFFFFF',
                    gold: '#D4AF37',
                    primary: '#FFFFFF',
                    secondary: 'rgba(255, 255, 255, 0.72)',
                    dim: 'rgba(255, 255, 255, 0.65)',
                    tertiary: 'rgba(255, 255, 255, 0.56)',
                    muted: 'rgba(255, 255, 255, 0.45)',
                    disabled: 'rgba(255, 255, 255, 0.38)',
                    placeholder: 'rgba(255, 255, 255, 0.48)',
                },
                // Keep existing accent for compatibility
                accent: {
                    primary: '#FF6B35',
                    secondary: '#FF8C42',
                    dark: '#E85D2F',
                    light: '#FF9A5E',
                    glow: 'rgba(255, 107, 53, 0.24)',
                },
                // Semantic colors
                success: {
                    DEFAULT: '#10B981',
                    bg: 'rgba(16, 185, 129, 0.12)',
                },
                error: {
                    DEFAULT: '#EF4444',
                    bg: 'rgba(239, 68, 68, 0.12)',
                },
                warning: {
                    DEFAULT: '#F59E0B',
                    bg: 'rgba(245, 158, 11, 0.12)',
                },
                info: {
                    DEFAULT: '#06B6D4',
                    bg: 'rgba(6, 182, 212, 0.12)',
                },
                // Game-specific
                skill: '#06B6D4',
                luck: '#F59E0B',
                live: '#10B981',
            },
            fontFamily: {
                display: ['Jolly Lodger', 'cursive'],  // Pirate treasure map font
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
            },
            fontSize: {
                // Display sizes
                'display-xl': ['4.5rem', { lineHeight: '1.2', fontWeight: '800' }],
                'display-lg': ['3.75rem', { lineHeight: '1.2', fontWeight: '800' }],
                'display-md': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
                'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.2', fontWeight: '800' }],
                // Headings
                'h1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
                'h2': ['1.875rem', { lineHeight: '1.2', fontWeight: '700' }],
                'h3': ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }],
                'h4': ['1.25rem', { lineHeight: '1.2', fontWeight: '600' }],
                'h5': ['1.125rem', { lineHeight: '1.2', fontWeight: '600' }],
                'h6': ['1rem', { lineHeight: '1.2', fontWeight: '600' }],
                // Body
                'body-lg': ['1.125rem', { lineHeight: '1.5' }],
                'body': ['1rem', { lineHeight: '1.5' }],
                'body-sm': ['0.875rem', { lineHeight: '1.5' }],
                'body-xs': ['0.75rem', { lineHeight: '1.5' }],
                // Utility
                'caption': ['0.75rem', { lineHeight: '1.2' }],
                'overline': ['0.625rem', { lineHeight: '1.2', textTransform: 'uppercase', letterSpacing: '0.05em' }],
                'tiny': ['0.75rem', { lineHeight: '1.2' }],
                'small': ['0.875rem', { lineHeight: '1.5' }],
            },
            spacing: {
                '0': '0',
                '1': '0.25rem',   // 4px
                '2': '0.5rem',    // 8px
                '3': '0.75rem',   // 12px
                '4': '1rem',      // 16px
                '5': '1.25rem',   // 20px
                '6': '1.5rem',    // 24px
                '8': '2rem',      // 32px
                '10': '2.5rem',   // 40px
                '12': '3rem',     // 48px
                '16': '4rem',     // 64px
                '20': '5rem',     // 80px
                '24': '6rem',     // 96px
                '72': '18rem',    // 288px - nav height
            },
            borderRadius: {
                'sm': '4px',
                'DEFAULT': '8px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
                '2xl': '24px',
                'full': '9999px',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
                'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                'glow-accent': '0 0 20px rgba(255, 107, 53, 0.24)',
                'glow-accent-strong': '0 0 30px rgba(255, 107, 53, 0.24), 0 0 60px rgba(255, 107, 53, 0.12)',
                'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3)',
                'glow-gold-strong': '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)',
                'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.3)',
                'glow-pink': '0 0 20px rgba(255, 22, 148, 0.3)',
                'card-hover': '0 20px 60px rgba(0, 0, 0, 0.6)',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' },
                },
                'shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'glow-pulse': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
                        opacity: '1'
                    },
                    '50%': {
                        boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)',
                        opacity: '0.8'
                    },
                },
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
            },
            transitionDuration: {
                'instant': '100ms',
                'fast': '150ms',
                'normal': '250ms',
                'slow': '350ms',
            },
            maxWidth: {
                'app': '1440px',
                'casino': '1600px',
                'content': '1200px',
                'prose': '65ch',
            },
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                '2xl': '24px',
            },
        },
    },
    plugins: [],
}
