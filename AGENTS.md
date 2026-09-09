# AGENTS.md

## Commands

```bash
pnpm start              # Dev server (ng serve, port 4200)
pnpm build              # Production build
pnpm test               # All tests (Karma + Jasmine)
pnpm test -- --include="**/staff.service.spec.ts"   # Single test file
pnpm test -- --watch    # Tests in watch mode
pnpm lint               # Biome lint
pnpm format             # Biome format (writes)
pnpm check              # Biome check + auto-fix
```

Use `pnpm`, not npm. The Angular CLI (`angular.json`) is configured with `"packageManager": "pnpm"`.

## Project Structure

```
src/app/
├── core/                          # Auth, guards, interceptors, layout, constants
│   ├── auth/                      # guard/, interceptors/, services/, interfaces/
│   ├── constants/                 # Role/permission constants
│   ├── directive/                 # Custom directives (permission)
│   └── layout/                    # Main layout + ADMIN_ROUTES
├── features/                      # One directory per domain feature
│   ├── auth/  home/  roles/  staff/  veterinario/
│   ├── mascotas/  citas-medicas/  calendario/
│   ├── pagos/  vacunas/  historial-medico/
│   └── procedimientos-quirurjicos/
├── shared/
│   ├── nz-modules/                # Shared Ng-Zorro module barrel
│   ├── pipes/
│   └── utils/
└── app.routes.ts                  # Top-level routing
```

### Feature directory layout (inconsistent — check before adding)

Most features follow `pages/`, `interfaces/`, `services/`, but **not all**:

- `service/` (singular): staff, home, pagos
- `services/` (plural): mascotas, citas-medicas, veterinario, vacunas, calendario, roles
- `interface/` (singular): pagos
- `interfaces/` (plural): everything else

Route file naming is also inconsistent: `*.route.ts` vs `*.routes.ts`. Match the existing file in the same feature.

### Routing

- All feature routes are lazy-loaded via `loadChildren` in `src/app/core/layout/layout.route.ts`
- Guarded by `loginGuard` (auth) and `roleGuard` + `permissionGuard` (RBAC)
- `src/app/app.routes.ts` has two top-level branches: `/auth` (login) and `/admin` (all features)

## Code Conventions

### Formatting (Biome — verified in `biome.json`)

- 2-space indent, 120 char line width
- Single quotes, semicolons always, trailing commas all
- Import organization enabled

### Biome lint — notable disabled rules

`noExplicitAny` is **off** — `any` appears in the codebase. `noDoubleEquals` is also off. Other disabled: `noNonNullAssertion`, `noInferrableTypes`, `useOptionalChain`, `useImportType`.

### TypeScript (verified in `tsconfig.json`)

- `strict: true`, `noImplicitReturns: true`, `strictTemplates: true`
- `moduleResolution: "bundler"`, target ES2022

### Angular patterns

- **Standalone components** (default in Angular 19, no NgModules for components)
- **Functional guards**: `CanActivateFn` pattern with `inject()` (not class-based)
- **Signals + computed** for component state
- **`httpResource`** and **`rxResource`** for data fetching (Angular 19 APIs)
- **`inject()`** for DI (not constructor injection)
- Component prefix: `app` (configured in `angular.json`)
- Components use SCSS (`angular.json` schematics)
- `provideExperimentalZonelessChangeDetection` is **not** used — standard Zone.js

### Naming

- Component files: `kebab-case` (e.g., `staff-page.component.ts`)
- Interfaces: `I` prefix (e.g., `IStaffResponse`)
- Error messages: **Spanish** (e.g., `'Error de operación'`, `'Recurso no encontrado'`)

### Environment

- `src/environments/environment.ts` (production) and `environment.development.ts`
- Both currently point to the same Render API: `https://node-veterinaria.onrender.com/v1/api`
- No `.env` files — environment is swapped via Angular CLI `fileReplacements`

## Dependencies

Angular 19, Ng-Zorro Ant Design 19, TailwindCSS 4, RxJS 7, Biome 1.9.4, Karma + Jasmine, TypeScript 5.7
