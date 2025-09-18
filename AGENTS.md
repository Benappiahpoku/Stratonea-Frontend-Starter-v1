# AGENTS.md - Stratonea Frontend Development Guide

## Dev Environment Setup

### Initial Setup

```bash
# Clone and setup the project
git clone https://github.com/Benappiahpoku/Stratonea-boilerplate-v3.git
cd stratonea-frontend-starter-v1

# Run the setup script to configure project name
node setup.js

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Setup Script

The `setup.js` script allows you to customize the project name across configuration files:

```bash
node setup.js
```

This will:

- Update the project name in `package.json`
- Update the project name in `src/config.ts`
- Prompt you to enter a new project name

### Key Development Tools

```text

### Development Scripts

- `npm run dev` - Start development server with hot reload and TypeScript checking
- `npm run build` - Build for production (includes icon generation)
- `npm run preview` - Preview production build locally
- `npm run test` - Run unit tests with Vitest
- `npm run coverage` - Generate test coverage report
- `npm run dev:slow` - Simulate slow network conditions for testing
- `npm run analyze` - Analyze bundle size and dependencies
- `npm run lighthouse` - Run Lighthouse performance audit
- `npm run size-check` - Check bundle size limits
- `npm run network-test` - Test network performance
- `npm run generate-icons` - Generate PWA icons

## Testing Instructions

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run coverage

# Run specific test file
npm run test -- src/components/base/AppButton.test.ts

# Run tests in watch mode
npm run test -- --watch
```

### Testing Guidelines

- Write tests for all new components and composables
- Focus on user interactions and component behavior
- Test mobile responsiveness and offline functionality
- Use Vue Testing Library for component testing
- Mock network requests and external dependencies
- Test error states and loading conditions
- Ensure tests pass on both desktop and mobile viewports

### Performance Testing

```bash
# Test with slow network simulation
npm run dev:slow

# Run Lighthouse audit
npm run lighthouse

# Analyze bundle size
npm run analyze
```

## PR Instructions

### Branch Naming

- `feature/[description]` - New features
- `fix/[description]` - Bug fixes
- `docs/[description]` - Documentation updates
- `refactor/[description]` - Code refactoring

### Commit Message Format

```bash
[Stratonea] <type>: <description>

Examples:
feat: add mobile-first navigation component
fix: resolve offline indicator positioning
docs: update component usage examples
```

### Pre-commit Checklist

- [ ] Run `npm run build` to ensure production build passes
- [ ] Run `npm run test` to ensure all tests pass
- [ ] Test on mobile devices and slow networks
- [ ] Verify PWA functionality and offline capabilities
- [ ] Check for TypeScript errors
- [ ] Validate responsive design across breakpoints
- [ ] Test contact forms and WhatsApp integration

### Code Review Requirements

- Mobile-first design principles followed
- Ghana-specific optimizations included
- Performance considerations addressed
- Accessibility standards met
- SEO best practices implemented
- Component reusability maintained

## Project-Specific Guidelines

### Mobile-First Development

- Design for mobile devices first (320px minimum width)
- Use responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Test on actual mobile devices, not just browser dev tools
- Consider touch interactions and gesture support
- Optimize for Ghana's mobile network conditions

### Component Development

- Use Vue 3 Composition API with `<script setup>`
- Follow the established component structure:

```bash
src/components/
├── analytics/       # Performance monitoring components
├── base/           # Basic UI components (buttons, inputs, etc.)
├── donation/       # Donation-related components
├── enhanced/       # Advanced components with complex logic
├── layout/         # Layout components (header, footer, navigation)
├── network/        # Network-aware components
├── payment/        # Payment processing components
├── pwa tools/      # PWA-related utilities
└── system/         # System-level components (error boundaries, etc.)
```

- Implement proper TypeScript interfaces
- Add loading states and error handling
- Include offline fallbacks where appropriate

### Available Components

The project includes several pre-built components organized by category:

**Base Components (`src/components/base/`):**

- `AppButton.vue` - Primary button component
- `AppForm.vue` - Form wrapper component
- `AppInput.vue` - Input field component
- `Divider.vue` - Visual separator component
- `FloatingAddButton.vue` - Floating action button
- `LoadingSpinner.vue` - Loading indicator
- `OfflineIndicator.vue` - Network status indicator
- `StratoneaLogo.vue` - Brand logo component

**Analytics Components (`src/components/analytics/`):**

- `WebVitalsMonitor.vue` - Performance monitoring

**Donation Components (`src/components/donation/`):**

- `Donation.vue` - Donation form and processing

**Layout Components (`src/components/layout/`):**

- `ActionHub.vue` - Main action center
- `AppSwitcher.vue` - Application switcher
- `Footer.vue` - Site footer
- `Navigation.vue` - Main navigation

**Network Components (`src/components/network/`):**

- `DataUsageWarning.vue` - Data usage notifications
- `NetworkAwareImage.vue` - Images that adapt to network conditions
- `NetworkSpeedGauge.vue` - Network speed indicator
- `RetryMechanism.vue` - Automatic retry functionality

**Payment Components (`src/components/payment/`):**

- `MobileMoneyPaymentForm.vue` - Mobile money payment integration

**PWA Components (`src/components/pwa tools/`):**

- `OptimizedLoading.vue` - Optimized loading states
- `PWAUpdateNotification.vue` - PWA update notifications

**System Components (`src/components/system/`):**

- `ErrorBoundary.vue` - Error boundary component

### Layout System

The project uses a layout-based routing system with the following structure:

```bash
src/layouts/
├── default.vue      # Main application layout with navigation
├── AuthLayout.vue   # Authentication pages layout
└── ErrorLayout.vue  # Error pages layout (404, etc.)
```

- All main routes are defined as children of layout components in `src/router/index.ts`
- Each layout must include a `<router-view />` to display active page content
- Layouts provide consistent structure across different page types
- Use layouts for shared UI elements like headers, footers, and navigation

### State Management

The project uses Pinia for centralized state management:

```bash
src/stores/
└── root.ts    # Main store with persistence
```

- State is automatically persisted using `pinia-plugin-persistedstate`
- Stores handle global application state and business logic
- Use composables for component-specific state management
- Implement proper TypeScript interfaces for store state

### Plugins

The project includes several Vue plugins for enhanced functionality:

```bash
src/plugins/
├── fontawesome.ts    # FontAwesome icon configuration
└── toast.ts         # Toast notification setup
```

- **FontAwesome**: Pre-configured icon library with Vue integration
- **Toast**: Vue Toastification for user notifications
- Plugins are registered in `src/main.ts`
- Follow plugin-specific configuration patterns

### Services

Core services handle external integrations and complex business logic:

```bash
src/services/
└── WebVitalsService.ts    # Performance monitoring service
```

- **WebVitalsService**: Tracks Core Web Vitals and performance metrics
- Services are used for API calls, external integrations, and complex operations
- Implement proper error handling and retry logic
- Use TypeScript interfaces for service method signatures

### Type Definitions

TypeScript type definitions ensure type safety across the application:

```bash
src/types/
├── html2pdf.js.d.ts    # HTML2PDF library type definitions
└── virtual.d.ts        # Virtual module type definitions
```

- Define interfaces for component props, API responses, and store state
- Use type definitions for external library integrations
- Maintain consistent naming conventions for types
- Export types from a central index file when appropriate

### Ghana-Specific Optimizations

- Optimize for intermittent connectivity
- Include offline indicators and fallbacks
- Support mobile money payment flows
- Consider local hosting and CDN options
- Use appropriate currency formatting (GHS)
- Include local contact methods (WhatsApp, local phone numbers)

### SEO and Performance

- Implement proper meta tags and Open Graph data
- Optimize images for mobile networks
- Use lazy loading for images and components
- Minimize bundle size and loading times
- Include structured data for local business
- Generate and maintain sitemap.xml and robots.txt

### Business Logic

- Business phone: `+233594093926`
- WhatsApp integration for contact forms
- Email: `bappiahpoku@gmail.com`
- Support Ghanaian businesses and local market
- Maintain pricing in GHS currency
- Focus on fast delivery (2-5 day turnaround)

### File Organization

- Keep components modular and reusable
- Use composables for shared logic (`src/composables/`)
- Store business configuration in `src/config.ts`
- Maintain consistent naming conventions
- Document component props and usage
- Use layouts for consistent page structure (`src/layouts/`)
- Implement Pinia stores for state management (`src/stores/`)
- Define TypeScript types in `src/types/`
- Use services for external API calls (`src/services/`)
- Configure plugins in `src/plugins/`

### Deployment

- Deploy to Netlify for optimal performance
- Configure proper build settings
- Set up custom domain handling
- Enable PWA service worker
- Configure proper caching strategies
- Monitor Core Web Vitals

## Common Issues & Solutions

### Network-Related Issues

- Test with `npm run dev:slow` to simulate poor connections
- Implement proper loading states
- Use offline storage for critical data
- Handle network errors gracefully

### Mobile Testing

- Use browser dev tools device emulation
- Test on actual mobile devices when possible
- Verify touch interactions work correctly
- Check font sizes and button sizes for mobile

### Build Issues

- Clear node_modules and reinstall if build fails
- Check TypeScript errors with `npm run dev:typecheck`
- Verify all imports are correct
- Ensure Tailwind classes are properly configured

## Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [PRD Document](./prd/prd.md) - Project requirements and specifications
