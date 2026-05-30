# Addon.ai Enterprise — Landing Page

Landing page corporativa de **Addon.ai Enterprise**, el puente hacia la eficiencia inteligente. Arquitectura de software empresarial combinada con IA aplicada para optimizar procesos desde la raíz.

## Stack

| Categoría | Tecnología |
|---|---|
| Bundler | [Vite](https://vitejs.dev/) |
| Lenguaje | TypeScript (`strict: true`) |
| UI | React 18 |
| Estado servidor | TanStack Query |
| Estado UI | Zustand |
| Enrutador | React Router v6 |
| Estilos | CSS Modules + tokens |

## Arquitectura

```
src/
├── domain/           # Capa de dominio pura (sin React)
├── infrastructure/   # Implementaciones concretas (API, storage)
├── features/         # Verticales de negocio
│   └── landing/      #   → sección principal
├── common/           # Atomic Design: atoms, molecules, organisms
├── providers/        # Composition Root
├── router/           # Rutas
└── styles/           # Tokens, globales, animaciones
```

## Secciones

- Hero — con logo, blobs animados y badges de eficiencia
- Desafíos del Mercado — imagen de fondo con parallax (cambia según theme)
- Ventaja Operativa Sostenible
- Pilares de Especialización (Software, Data, AI)
- Quick Wins
- Paquetes de Servicios
- Soluciones por Sector (Finanzas, Salud, Comercial)
- Casos de Éxito
- Comparativa Addon AI vs Big Four
- Planes (Surgical Strike, PLG Híbrido, Managed Partner)
- Compromiso e Impacto (ODS)
- Modelo de Trabajo (Discovery → Desarrollo → Managed → Transferencia)
- Contacto — formulario con envío por mailto

## Efectos visuales

- **Neural Canvas** — cuadrícula interactiva con nodos que huyen del cursor, dots que brillan al hacer hover y líneas animadas desde el punto de la grilla más cercano
- **Hero Blobs** — 4 formas orgánicas verdes/teal que orbitan detrás del logo
- **Scroll reveal** — animación de entrada al hacer scroll
- **Refraction + Glow** — efecto de vidrio que sigue al mouse en todas las cards
- **Dark/Light theme** — con persistencia en localStorage

## Desarrollo

```bash
# Instalar dependencias
npm install

# Dev server (http://localhost:5173)
npm run dev

# Build producción
npm run build

# Type check
npx tsc --noEmit
```
