# Apexora - Tech Consulting Agency Website

## Overview

Apexora is a modern, single-page tech consulting agency website built as a full-stack TypeScript application. The project showcases services, testimonials, and provides a contact form for client inquiries. It features a dark-themed UI with animated components, a testimonials carousel, and newsletter subscription functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router for single-page application)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: shadcn/ui component library (Radix primitives with custom styling)
- **Animations**: Framer Motion for page transitions, hover effects, and entrance animations
- **Carousel**: Embla Carousel with autoplay for testimonials section
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod validation schemas
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle's pgTable definitions
- **Tables**:
  - `inquiries`: Contact form submissions (name, email, subject, message)
  - `testimonials`: Client testimonials (name, title, company, quote, rating, projectType)
  - `subscribers`: Newsletter email subscriptions

### API Structure
- Routes defined in `shared/routes.ts` with type-safe request/response schemas
- Validation using Zod with drizzle-zod integration
- Endpoints:
  - `POST /api/inquiries` - Submit contact form
  - `GET /api/testimonials` - Fetch all testimonials
  - `POST /api/newsletter/subscribe` - Newsletter subscription

### Build System
- Development: `tsx` for TypeScript execution with hot reloading via Vite
- Production: Custom build script using esbuild for server bundling and Vite for client
- Output: `dist/` directory with `index.cjs` (server) and `public/` (static assets)

### Path Aliases
- `@/*` → `./client/src/*` (frontend components and utilities)
- `@shared/*` → `./shared/*` (shared types and schemas)
- `@assets` → `./attached_assets` (static media files)

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, configured via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations stored in `./migrations` directory

### UI Framework Dependencies
- **Radix UI**: Complete set of accessible component primitives (dialog, dropdown, toast, etc.)
- **Tailwind CSS**: Utility-first CSS with custom theme configuration
- **Lucide React**: Icon library
- **React Simple Icons**: Technology/brand icons for services section

### Animation & Interaction
- **Framer Motion**: Animation library for page transitions and micro-interactions
- **Embla Carousel**: Carousel functionality with autoplay plugin

### Form Handling
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Zod resolver for form validation
- **Zod**: Schema validation for forms and API requests

### Fonts
- **Google Fonts**: Inter and Montserrat font families loaded via CSS import