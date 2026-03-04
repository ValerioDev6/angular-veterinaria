# AGENTS.md - Angular Veterinaria Project

## Overview

This is an Angular 19 veterinary clinic management application using Ng-Zorro Ant Design, TailwindCSS, Signals, and RxJS.

---

## Commands

### Development
```bash
pnpm start          # Start dev server (ng serve)
pnpm run watch      # Build with watch mode
```

### Build
```bash
pnpm build          # Production build (ng build)
```

### Testing
```bash
pnpm test           # Run all tests (Karma)
```

To run a **single test file**, use:
```bash
pnpm test -- --include="**/staff.service.spec.ts"
```

To run tests in watch mode:
```bash
pnpm test -- --watch
```

### Linting & Formatting
```bash
pnpm lint           # Run Biome linter
pnpm format         # Format code with Biome (write changes)
pnpm check          # Biome check with auto-fix
```

---

## Code Style Guidelines

### General
- **Strict TypeScript** is enabled - no implicit any, no implicit returns
- **Angular 19** with standalone components and signals
- Use `inject()` function for dependency injection instead of constructor injection when possible

### Formatting (Biome)
- **2-space indentation**
- **Line width**: 120 characters
- **Quotes**: single quotes `''`
- **Semicolons**: always
- **Trailing commas**: all

### Naming Conventions
- **Components**: `kebab-case` for file names (e.g., `staff-page.component.ts`)
- **Classes**: `PascalCase` (e.g., `StaffService`)
- **Interfaces**: `PascalCase` with `I` prefix (e.g., `IStaffResponse`)
- **Services**: `PascalCase` with `.service` suffix (e.g., `StaffService`)
- **Signals/variables**: `camelCase` (e.g., `page`, `staffList`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `API_BASE`)

### Imports
- Group imports in this order:
  1. Angular core (@angular/*)
  2. Third-party libraries
  3. Local application imports (relative paths)
- Use path aliases where possible
- Example:
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IStaffResponse } from '../interfaces/staff.interface';
```

### Types
- Always define return types for functions
- Use interfaces for API responses and data models
- Use `any` sparingly - prefer explicit types
- Enable strict templates in Angular

### State Management
- Use Angular **Signals** for local component state
- Use `computed()` for derived state
- Use `rxResource` or `httpResource` for async data fetching

### Error Handling
- Use RxJS `catchError` with proper error transformation
- Return `Observable<never>` from error handlers
- Provide user-friendly error messages (in Spanish, as per project locale)
- Example pattern:
```typescript
private handleError(error: HttpErrorResponse): Observable<never> {
  let message = 'Error de operación';
  if (error.status === 404) {
    message = 'Recurso no encontrado';
  }
  return throwError(() => new Error(message));
}
```

### Components
- Use **standalone components** (default in Angular 19)
- Use lazy loading for routes
- Prefix components with `app` (configured in angular.json)
- Follow feature-based directory structure:
```
src/app/features/<feature>/
├── pages/
├── components/
├── services/
└── interfaces/
```

### UI Components
- Use **Ng-Zorro Ant Design** (ng-zorro-antd) for UI components
- Use **TailwindCSS** for custom styling
- SCSS for component-specific styles

### Best Practices
- Use `readonly` for immutable properties
- Avoid `any` type - use proper interfaces
- Use `?.` and `??` for null safety
- Use `const` for values that won't be reassigned

---

## Project Structure

```
src/
├── app/
│   ├── core/           # Core modules (auth, guards, interceptors)
│   ├── features/       # Feature modules (staff, etc.)
│, mascotas, citas   ├── shared/         # Shared components, pipes, utils
│   └── app.routes.ts   # Main routing
├── environments/       # Environment configs
└── styles.scss         # Global styles
```

---

## Dependencies

- Angular 19
- Ng-Zorro Ant Design 19
- TailwindCSS 4
- RxJS 7
- Biome (linting/formatting)
- Karma + Jasmine (testing)
