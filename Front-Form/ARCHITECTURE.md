# Arquitectura Front-Form

Este documento define el orden de carpetas, el flujo de imports y el porqué de la estructura actual.

## Objetivo

- Separar implementación por dominio (`features/*`) de los puntos de entrada de navegación (`pages/*`).
- Mantener imports del router estables mientras se mueve código internamente.
- Reducir acoplamiento entre `routes` y la estructura interna de cada feature.

## Estructura base

```txt
src/
  routes/                    # Definición de rutas (React Router)
  pages/                     # Entry points de páginas para rutas
  features/
    <feature>/
      pages/                 # Implementación real de páginas de la feature
      components/            # UI específica de la feature
      services/              # Lógica de datos/API de la feature
      model/                 # Modelo de dominio de la feature
      view-model/            # Modelo de presentación por pantalla/componente
      api/                   # DTOs y contratos HTTP de la feature (opcional)
  shared/
    models/                  # Modelos reutilizables entre features
  components/                # Design system / componentes compartidos
  layouts/                   # Layouts compartidos
  styles/                    # Tokens, temas y guías visuales
```

## Regla principal: `pages` vs `features`

- `src/features/<feature>/pages/*` contiene la implementación real de la página.
- `src/pages/*` expone un wrapper liviano (re-export) para consumo del router.

Ejemplo actual:

- `src/features/dashboard/pages/DashboardPage.jsx` -> implementación.
- `src/pages/DashboardPage.jsx` -> `export { default } from '../features/dashboard/pages/DashboardPage'`.

## Por qué existen dos `DashboardPage.jsx`

Existen dos archivos por diseño de desacople:

- El archivo en `features` es el origen funcional.
- El archivo en `pages` es un puente de importación.

Esto permite:

- Cambiar estructura interna de `features` sin tocar `routes` en cada refactor.
- Mantener un punto único y simple para imports de páginas.
- Migrar progresivamente desde una arquitectura plana a feature-first.

## Flujo recomendado de imports

1. `routes/AppRoutes.jsx` importa desde `src/pages/*`.
2. `src/pages/*` re-exporta desde `src/features/*/pages/*`.
3. La lógica y UI viven en `features`.

Regla: `routes` no debe importar directo desde `features`, salvo excepción justificada.

## Convención de naming

- Usar carpetas en minúsculas y kebab-case.
- Estandarizar nombres por capa:
  - `model` (no `Models`)
  - `view-model` (no `ViewModels`)
  - `shared/models` para modelos globales (en vez de `GlobalModels`)

## Flujo de datos recomendado

- Flujo base: `DTO/API -> model -> view-model -> UI`.
- El `model` representa estado de dominio de la feature.
- El `view-model` adapta datos para una pantalla o componente concreto.
- Evitar acoplar componentes directamente a contratos de API cuando la UI tenga transformación propia.

## Cuándo mantener el puente y cuándo eliminarlo

Mantener `src/pages/*` si:

- El proyecto sigue migrando estructura.
- Se busca API de imports estable.
- Hay múltiples consumidores que ya dependen de ese path.

Eliminar `src/pages/*` si:

- La migración terminó y el equipo decide importar directo desde `features`.
- Se actualizan todos los imports de forma controlada en un solo PR.
- Se documenta y aplica una única convención final.

## Convenciones operativas

- Una ruta = una página exportada desde `src/pages`.
- Cada page en `src/pages` debe ser mínima (idealmente solo re-export).
- Evitar lógica de negocio en `src/pages`.
- La lógica de negocio y estado de dominio vive en `features`.
- Reutilizable global va a `src/components` o `src/layouts`.
- Modelos compartidos entre features van en `src/shared/models`.

## Checklist para nuevas páginas

1. Crear implementación en `src/features/<feature>/pages/<Name>Page.jsx`.
2. Crear re-export en `src/pages/<Name>Page.jsx`.
3. Registrar ruta en `src/routes/AppRoutes.jsx`.
4. Si aplica, exportar desde `src/pages/index.js`.

## Decisión actual del proyecto

La convención vigente es:

- **Feature-first para implementación**.
- **`src/pages` como capa de entrada para routing**.

Mientras no se acuerde lo contrario, esta es la forma correcta de organizar nuevas páginas.
