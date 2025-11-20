# Sahaj Shukla Portfolio - Branding & Style Guide

## Color Palette

### Primary Colors
```
Background: #0a0a0f (Deep near-black with blue tint)
Surface: #121218 (Slightly lighter surface)
Surface Elevated: rgba(25, 25, 35, 0.6) (Glassmorphism panels)
```

### Accent Colors
```
Cyan Primary: #00d9ff (Bright cyan for CTAs and highlights)
Cyan Glow: rgba(0, 217, 255, 0.15) (Glow effects)
Purple: #a855f7 (Secondary accent)
Purple Glow: rgba(168, 85, 247, 0.15)
Teal: #14b8a6 (Tertiary accent)
```

### Text Colors
```
Text Primary: #f0f0f5 (Near-white for main content)
Text Secondary: #a0a0b0 (Muted gray for supporting text)
Text Tertiary: #707080 (Subtle gray for metadata)
Text Accent: #00d9ff (Cyan for links and highlights)
```

### Status & Semantic Colors
```
Success: #10b981 (Green)
Warning: #f59e0b (Amber)
Error: #ef4444 (Red)
Info: #3b82f6 (Blue)
```

## Typography

### Font Stack
```css
Headings: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Code/Monospace: 'JetBrains Mono', 'Fira Code', monospace
```

### Type Scale
```
H1 (Hero): 3.5rem / 4.5rem (mobile / desktop), font-weight: 700, line-height: 1.1
H2 (Section): 2.5rem / 3rem, font-weight: 700, line-height: 1.2
H3 (Subsection): 1.75rem / 2rem, font-weight: 600, line-height: 1.3
H4 (Card Title): 1.25rem / 1.5rem, font-weight: 600, line-height: 1.4
Body Large: 1.125rem, font-weight: 400, line-height: 1.6
Body: 1rem, font-weight: 400, line-height: 1.6
Body Small: 0.875rem, font-weight: 400, line-height: 1.5
Caption: 0.75rem, font-weight: 500, line-height: 1.4, letter-spacing: 0.05em
```

## Spacing Scale
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
4xl: 6rem (96px)
5xl: 8rem (128px)
```

## Border Radius
```
sm: 0.375rem (6px)
md: 0.5rem (8px)
lg: 0.75rem (12px)
xl: 1rem (16px)
2xl: 1.5rem (24px)
full: 9999px (circular)
```

## Glassmorphism Style
```css
background: rgba(25, 25, 35, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
```

## Animation Philosophy

### Durations
```
Instant: 150ms (hover states, small interactions)
Fast: 300ms (card reveals, button states)
Normal: 500ms (section transitions, page loads)
Slow: 800ms (large movements, hero animations)
```

### Easings
```
Standard: cubic-bezier(0.4, 0, 0.2, 1) - Default for most transitions
Decelerate: cubic-bezier(0.0, 0, 0.2, 1) - Entering elements
Accelerate: cubic-bezier(0.4, 0, 1, 1) - Exiting elements
Spring: { type: "spring", stiffness: 100, damping: 15 } - Playful interactions
```

### Animation Principles
1. **Purposeful Motion**: Every animation should have a clear purpose (feedback, guidance, delight)
2. **Subtle by Default**: Prefer subtle, elegant transitions over flashy effects
3. **Performance First**: Use transform and opacity; avoid animating layout properties
4. **Respect Reduced Motion**: Check for prefers-reduced-motion and provide fallbacks
5. **Stagger Children**: Use stagger animations for lists and groups (50-100ms delay)

### Common Patterns
- **Fade In + Slide Up**: Entry animation for sections (y: 20 → 0, opacity: 0 → 1)
- **Scale on Hover**: Cards and interactive elements (scale: 1 → 1.02)
- **Glow on Hover**: CTAs and important buttons (box-shadow intensity increase)
- **Gradient Shift**: Background gradients that shift on scroll or hover
- **Parallax**: Subtle depth with different scroll speeds for layers

## Shadow System
```css
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.4)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5)
xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6)
glow-cyan: 0 0 20px rgba(0, 217, 255, 0.3)
glow-purple: 0 0 20px rgba(168, 85, 247, 0.3)
```

## Layout Grid
- **Container Max Width**: 1280px
- **Section Padding**: 4rem vertical (mobile), 6rem vertical (desktop)
- **Content Max Width**: 720px for text-heavy sections
- **Grid Columns**: 12-column system
- **Gutters**: 1.5rem (mobile), 2rem (desktop)

## Interactive States

### Buttons
- **Default**: Background with subtle gradient
- **Hover**: Scale 1.02, increased glow, brightness 110%
- **Active**: Scale 0.98
- **Focus**: Ring outline in accent color

### Cards
- **Default**: Glassmorphism background, subtle border
- **Hover**: Translate Y -4px, increased shadow, border glow
- **Active**: Translate Y -2px

### Links
- **Default**: Accent color with underline offset
- **Hover**: Brightness 120%, underline thickness increase
- **Active**: Brightness 90%

## Responsive Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Accessibility
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Focus indicators visible on all interactive elements
- Keyboard navigation support
- Screen reader friendly markup
- Reduced motion support via media queries
