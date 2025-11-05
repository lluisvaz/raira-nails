# Nail Designer Course Landing Page

## Overview

This is a professional landing page for a Nail Designer course, built as a single-page application. The project aims to convert visitors into course enrollees through a premium, sophisticated design featuring a dark theme with luxurious gold accents. The landing page showcases course modules, testimonials, FAQs, and pricing information with a strong focus on conversion optimization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing (single route application)
- **TanStack Query (React Query)** for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom theme extensions
- **class-variance-authority** and **clsx** for component variant management
- Custom design system defined in `design_guidelines.md` with specific color palette, typography hierarchy, and gradient system

**Styling Approach**
- Dark theme foundation (#170F0B background) with gold gradient accents
- CSS variables for theme tokens defined in `client/src/index.css`
- Custom Tailwind configuration extending base colors, border radius, and adding gradient utilities
- Inter font family from Google Fonts with multiple weights (300, 400, 500, 700)
- Responsive design with mobile-first breakpoints

**Component Structure**
- Main application entry: `client/src/App.tsx` with QueryClient and routing setup
- Page components in `client/src/pages/` (home.tsx, not-found.tsx)
- Reusable UI components in `client/src/components/ui/` following shadcn conventions
- Path aliases configured (`@/`, `@shared/`, `@assets/`) for clean imports

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- Development mode with `tsx` for TypeScript execution
- Production build using `esbuild` for server bundling

**Application Structure**
- Modular route registration system (`server/routes.ts`)
- Custom middleware for logging, JSON parsing, and request tracking
- Vite integration in development mode with SSR-ready setup
- Static file serving for production builds

**Data Layer Design**
- Storage abstraction interface (`IStorage`) for database operations
- In-memory storage implementation (`MemStorage`) as default
- Ready for database migration with interface-based design
- CRUD operations for user management (extendable for course data)

### Data Storage Solutions

**Database Configuration**
- **Drizzle ORM** configured for PostgreSQL with type-safe queries
- **Neon Serverless** PostgreSQL driver for connection pooling
- Schema defined in `shared/schema.ts` using Drizzle's pgTable
- Migration system configured with `drizzle-kit` outputting to `/migrations`
- Environment-based database URL configuration
- Zod schema integration via `drizzle-zod` for runtime validation

**Current Schema**
- Users table with UUID primary keys, username, and password fields
- Shared type definitions between client and server via `@shared` alias
- Schema extensible for course content, enrollments, and testimonials

**Design Decision**: Storage layer uses interface pattern to allow switching between in-memory (development/testing) and PostgreSQL (production) without changing business logic. This provides flexibility for the code agent to add database connectivity later.

### External Dependencies

**UI & Component Libraries**
- Radix UI primitives (20+ components): Accessible, unstyled components for accordion, dialog, dropdown, popover, toast, etc.
- Embla Carousel for image/content carousels
- Lucide React for iconography
- React Hook Form with Zod resolvers for form validation
- date-fns for date manipulation

**Development & Build Tools**
- TypeScript for type safety across the stack
- PostCSS with Autoprefixer for CSS processing
- ESBuild for production server bundling
- Vite plugins: runtime error overlay, cartographer (Replit-specific), dev banner

**Session & Security**
- connect-pg-simple for PostgreSQL-backed session storage (configured but not yet implemented)
- Ready for authentication implementation with session management

**Hosting Considerations**
- Configured for Replit deployment with specific Vite plugins
- Environment variable-based configuration (DATABASE_URL)
- Separate development and production build processes