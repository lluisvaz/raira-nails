# Design Guidelines: Nail Designer Course Landing Page

## Design Approach
**Professional Dark Theme with Luxurious Gold Accents** - A sophisticated, minimalist landing page that conveys premium quality and professionalism while maintaining high conversion focus.

## Core Design Elements

### Color Palette (Exact Specifications)
- **Primary Background**: #170F0B (deep dark brown-black)
- **Card/Section Background**: #1A1212 (slightly lighter for depth)
- **Primary Text**: #FFFFFF (white for headings)
- **Body Text**: #E0E0E0 (soft white to reduce harsh contrast)
- **Accent Text**: #FCE9B5 (light gold for H3 and highlights)
- **Border Subtle**: #332A2A (for card borders)
- **Border Hover**: #DBA86F (gold accent on interaction)

### Gradient System
**Primary Gradient (Text & Accents)**: Linear gradient from #DBA86F (bronze gold) to #FCE9B5 (champagne gold) - 90 degrees
- Apply to: H1, H2, and all major headline text as text-clip gradient

**CTA Button Gradient**: Linear gradient from #D19756 → #EFD5A7 → #F1EEE1
- Button text color: #000000 (black for maximum contrast)

### Typography Hierarchy
**Font Family**: Inter (weights: 300, 400, 500, 700) via Google Fonts
- Enable font smoothing/antialiasing for crisp rendering

**Scale & Styling**:
- **H1 (Hero Title)**: 3.2rem, weight 700, line-height 1.3, gradient text
- **H2 (Section Titles)**: 2.5rem, weight 700, center-aligned, 40px bottom margin, gradient text
- **H3 (Card Titles)**: 1.5rem, color #FCE9B5
- **Subtitle Class**: 1.2rem, color #F0F0F0
- **Paragraphs**: 1.1rem, color #E0E0E0, max-width 650px for optimal readability
- **Footer Text**: 0.9rem, color #888888

### Layout System
**Container**: Max-width 1100px, centered with generous lateral padding (2rem)
**Section Spacing**: 80px vertical padding for breathing room
**Mobile Responsive**: Typography scales down, grids convert to single column

### Component Library

#### CTA Button (Primary Conversion Element)
- Fully rounded corners (50px border-radius)
- Padding: 18px horizontal, 40px vertical
- Font: 1.1rem, weight 700, black text
- Background: Three-color gradient (gold spectrum)
- Hover: Scale to 105%, subtle gold glow shadow (rgba(239, 213, 167, 0.2))

#### Card Components (Modules, Testimonials, FAQ)
- Background: #1A1212
- Border: 1px solid #332A2A
- Padding: 30px
- Border-radius: 15px
- Hover State: Lift 5px upward, border color shifts to #DBA86F gold

#### Glow Effect (Applied to Hero, Modules, Offer sections)
- Subtle radial gradient positioned at top-center
- Dimensions: 500px width, 300px height
- Color: Radial gradient from rgba(219, 168, 111, 0.08) fading to transparent
- Positioned -150px above section, non-interactive overlay

### Section-Specific Design

#### 1. Hero Section
- Centered layout with glow effect
- Gradient H1 headline (primary value proposition)
- Subtitle in soft white
- **Video Placeholder**: Prominent position below subtitle, before CTA
- Primary CTA button linking to offer section
- Maximum visual impact with generous spacing

#### 2. Problem/Connection Section
- Centered content, conversational tone
- H2 gradient headline
- Body text max-width for readability

#### 3. Solution Section
- Mirrors problem section structure
- Emphasizes transformation and opportunity

#### 4. Modules Section (7 Cards)
- Glow effect background
- Gradient H2 section title
- Responsive grid: Auto-fit columns, minimum 300px width
- Each card contains:
  - H3 title in accent gold (#FCE9B5)
  - Descriptive paragraph
  - Hover interaction (lift + border accent)

**Module Content** (7 cards):
1. "Módulo 0: Comece por Aqui" - Welcome & mindset
2. "Módulo 1: A Base de Tudo" - Fundamentals & preparation
3. "Módulo 2: Domínio da Fibra de Vidro" - Most profitable technique
4. "Módulo 3: Versatilidade com Gel" - Portfolio expansion
5. "Módulo 4: Técnicas Avançadas" - Modern shapes & specialization
6. "Módulo 5: A Arte de Decorar" - Nail art techniques
7. "Módulo 6: O Negócio Nail Designer" - Business & marketing

#### 5. Bonus Section
- Centered layout
- Gradient H2 title
- 4 bonus items displayed as list with checkmark icons in #DBA86F gold
- Each item includes value proposition

#### 6. Social Proof (Testimonials)
- Gradient H2 section title
- 3-column grid (responsive to 1 column mobile)
- Each testimonial card with student quote and attribution
- Standard card styling with hover effects

#### 7. Offer & Guarantee Section
- Enhanced background: #1A1212 with 20px border-radius for prominence
- Glow effect applied
- Centered content with hierarchy:
  - Gradient H2 headline
  - Strikethrough anchor price (R$997 value)
  - Large installment price display
  - Cash price alternative
  - Primary CTA button (checkout link)
  - Guarantee badge with 7-day guarantee copy

#### 8. FAQ Section (Accordion)
- Gradient H2 section title
- 5 expandable questions using accordion pattern
- Question (summary) text: #FCE9B5
- Answer text: #CFCFCF
- Expand indicator: + symbol in #DBA86F that animates to - when open

**FAQ Topics**:
- Course access method
- Lifetime access confirmation
- Materials requirements
- Certificate provision
- Support availability

#### 9. Footer
- Simple, centered layout
- Copyright notice in muted gray (#888)
- Top border in #221A2A for subtle separation

## Animations & Interactions
- **Minimal Motion Philosophy**: Subtle, purposeful interactions only
- Card hovers: 5px vertical lift with border color transition
- Button hover: 5% scale increase with glow shadow
- Accordion: Smooth expand/collapse with icon rotation
- No distracting background animations or parallax effects

## Responsive Behavior
- Desktop: Full multi-column layouts, larger typography
- Tablet: 2-column grids where appropriate
- Mobile: Single column, scaled typography, maintained spacing ratios
- All grids use auto-fit for fluid responsiveness

## Images
**Hero Section**: Video placeholder component (prominent, above-the-fold positioning) - primary visual element for sales presentation

**No additional imagery specified** - Design relies on typography, gradients, and negative space for premium aesthetic