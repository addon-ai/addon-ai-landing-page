# CLAUDE.md — Guía de Desarrollo Frontend (React + TypeScript)

Este documento define la arquitectura, principios y convenciones que rigen todo el código frontend del repositorio. Cualquier contribución debe cumplir íntegramente con lo descrito aquí.

---

## Stack Tecnológico

| Categoría | Herramienta |
|---|---|
| Bundler | Vite |
| Lenguaje | TypeScript (`strict: true`) |
| UI Library | React 18+ |
| Estado de servidor | TanStack Query |
| Estado de UI | Zustand (o Redux Toolkit) |
| Enrutador | TanStack Router (o React Router v6) |
| Tests unitarios | Vitest + Testing Library |
| Tests E2E | Playwright |
| Estilos | CSS Modules (`.module.css`) |
| Calidad / CI | Husky + lint-staged + ESLint + Prettier |

---

## Arquitectura: Feature-Driven + Dominio Independiente

El proyecto se organiza en tres zonas principales: una capa de **dominio puro** (sin dependencias de framework), las **features** (verticales de negocio autocontenidas) y los componentes **comunes** (Atomic Design acotado).

```
src/
├── domain/                     # Capa de dominio pura — CERO dependencias de React o infraestructura
│   ├── models/                 # Entidades y Value Objects
│   │   ├── Order.ts
│   │   └── Money.ts
│   ├── ports/                  # Interfaces (contratos) que el dominio expone
│   │   ├── OrderRepository.ts
│   │   ├── PaymentGateway.ts
│   │   └── NotificationService.ts
│   ├── services/               # Lógica de negocio pura (funciones/clases sin side-effects de framework)
│   │   └── PricingService.ts
│   └── errors/                 # Excepciones de dominio tipadas
│       └── DomainError.ts
│
├── infrastructure/             # Implementaciones concretas de los puertos del dominio
│   ├── api/                    # Clientes HTTP (axios/fetch wrappers)
│   │   └── HttpOrderRepository.ts
│   ├── storage/                # localStorage, sessionStorage, IndexedDB
│   ├── analytics/              # Integraciones de tracking
│   └── config/                 # Variables de entorno tipadas, feature flags
│       └── env.ts
│
├── features/                   # Verticales de negocio (Feature-Driven)
│   ├── orders/
│   │   ├── api/                # Hooks de TanStack Query para esta feature
│   │   │   ├── useOrders.ts
│   │   │   └── queries.ts      # queryKey factories + queryFn
│   │   ├── components/         # Componentes exclusivos de esta feature
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderList.module.css
│   │   │   ├── OrderCard.tsx
│   │   │   └── OrderCard.module.css
│   │   ├── hooks/              # Hooks de lógica local de la feature
│   │   ├── store/              # Slice de Zustand/RTK solo si hay estado UI local
│   │   ├── pages/              # Páginas/rutas de la feature
│   │   │   └── OrdersPage.tsx
│   │   ├── utils/              # Helpers acotados a la feature
│   │   └── index.ts            # Barrel — API pública de la feature
│   │
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── pages/
│   │   └── index.ts
│   │
│   └── dashboard/
│       └── ...
│
├── common/                     # Atomic Design acotado a componentes compartidos
│   ├── atoms/                  # Botones, Inputs, Labels, Icons, Badges
│   │   └── Button/
│   │       ├── Button.tsx
│   │       └── Button.module.css
│   ├── molecules/              # SearchBar, FormField, Card, DropdownMenu
│   ├── organisms/              # Navbar, Sidebar, DataTable, Modal
│   ├── templates/              # Layouts de página (MainLayout, AuthLayout)
│   └── hooks/                  # Hooks reutilizables transversales
│       ├── useDebounce.ts
│       └── useMediaQuery.ts
│
├── providers/                  # Composition Root — donde se ensamblan las dependencias
│   ├── AppProviders.tsx        # QueryClientProvider, StoreProvider, RouterProvider
│   └── container.ts            # Instanciación de concreciones e inyección
│
├── router/                     # Configuración centralizada de rutas
│   └── index.ts
│
├── styles/                     # Tokens de diseño y reset base — NO estilos de componente
│   ├── tokens.css              # Variables CSS (colores, espaciado, tipografía, radios)
│   └── reset.css               # Normalización mínima del navegador
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

### Regla de dependencia

```
pages/components → features/api,hooks,store → domain
                                                ↑
                         infrastructure ────────┘  (implementa los puertos)
```

- `domain/` no importa nada de React, infraestructura ni features.
- `features/` importan de `domain/` y de `common/`, jamás de `infrastructure/` directamente.
- `infrastructure/` implementa las interfaces definidas en `domain/ports/`.
- `providers/container.ts` es el único lugar donde se instancian concreciones y se inyectan.

---

## Principios SOLID en Frontend

### S — Single Responsibility Principle

Cada componente, hook y servicio tiene una única razón para cambiar.

```tsx
// ✅ Correcto: responsabilidades separadas
function useOrders(filters: OrderFilters) {
  return useQuery({ queryKey: orderKeys.list(filters), queryFn: () => orderRepo.findAll(filters) });
}

function OrderList({ filters }: Props) {
  const { data, isLoading } = useOrders(filters);
  if (isLoading) return <Skeleton />;
  return <ul>{data?.map(order => <OrderCard key={order.id} order={order} />)}</ul>;
}

function OrderCard({ order }: { order: Order }) {
  return <Card title={order.reference} subtitle={order.total.format()} />;
}

// ❌ Incorrecto: componente que fetchea, filtra, formatea y renderiza todo junto
function OrderPage() {
  const [data, setData] = useState([]);
  useEffect(() => { fetch('/api/orders').then(r => r.json()).then(setData); }, []);
  const filtered = data.filter(o => o.status === 'active');
  return <div>{filtered.map(o => <div>{o.name} - ${o.total.toFixed(2)}</div>)}</div>;
}
```

Reglas:
- Un componente renderiza UI. No fetchea datos ni contiene lógica de negocio.
- Un hook encapsula un solo comportamiento (fetching, mutación, suscripción).
- Un servicio de dominio ejecuta una sola regla de negocio.
- Un archivo no supera las 150 líneas. Si crece, dividir.

### O — Open/Closed Principle

Los componentes y servicios se extienden sin modificar su código fuente, usando composición, props de renderizado y polimorfismo.

```tsx
// ✅ Correcto: componente abierto a extensión vía composición
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  renderRow?: (item: T) => ReactNode;   // extensión sin modificar DataTable
  emptyState?: ReactNode;
}

function DataTable<T>({ data, columns, renderRow, emptyState }: DataTableProps<T>) {
  if (data.length === 0) return emptyState ?? <DefaultEmpty />;
  return (
    <table>
      <thead>{/* headers desde columns */}</thead>
      <tbody>
        {data.map((item, i) => renderRow ? renderRow(item) : <DefaultRow key={i} item={item} columns={columns} />)}
      </tbody>
    </table>
  );
}

// ❌ Incorrecto: modificar DataTable cada vez que se necesita un layout distinto
function DataTable({ data, variant }: { data: any[]; variant: 'compact' | 'full' | 'cards' | 'timeline' }) {
  if (variant === 'compact') return /* ... */;
  if (variant === 'full') return /* ... */;
  if (variant === 'cards') return /* ... */;
  // cada nuevo variant obliga a editar este archivo
}
```

### L — Liskov Substitution Principle

Toda implementación de una interfaz del dominio puede sustituir a otra sin romper el comportamiento esperado.

```ts
// domain/ports/OrderRepository.ts
export interface OrderRepository {
  findAll(filters: OrderFilters): Promise<Order[]>;
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

// infrastructure/api/HttpOrderRepository.ts — producción
export class HttpOrderRepository implements OrderRepository {
  async findAll(filters: OrderFilters): Promise<Order[]> { /* fetch real */ }
  async findById(id: OrderId): Promise<Order | null> { /* fetch real */ }
  async save(order: Order): Promise<void> { /* POST real */ }
}

// tests/fakes/InMemoryOrderRepository.ts — tests
export class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[] = [];
  async findAll(filters: OrderFilters): Promise<Order[]> { /* filtrado en memoria */ }
  async findById(id: OrderId): Promise<Order | null> { /* búsqueda en array */ }
  async save(order: Order): Promise<void> { this.orders.push(order); }
}

// ✅ Ambas implementaciones son intercambiables sin que el caso de uso cambie.

// ❌ Incorrecto: implementación que rompe el contrato
export class CachedOrderRepository implements OrderRepository {
  async save(order: Order): Promise<void> {
    throw new Error("Cache is read-only"); // viola Liskov
  }
}
```

### I — Interface Segregation Principle

Los consumidores dependen solo de los métodos que necesitan. Las interfaces deben ser pequeñas y cohesivas.

```ts
// ✅ Correcto: interfaces segregadas
export interface OrderReader {
  findAll(filters: OrderFilters): Promise<Order[]>;
  findById(id: OrderId): Promise<Order | null>;
}

export interface OrderWriter {
  save(order: Order): Promise<void>;
  delete(id: OrderId): Promise<void>;
}

// El hook de listado solo necesita leer
function useOrders(filters: OrderFilters, reader: OrderReader) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: () => reader.findAll(filters),
  });
}

// El hook de creación solo necesita escribir
function useCreateOrder(writer: OrderWriter) {
  return useMutation({ mutationFn: (order: Order) => writer.save(order) });
}

// ❌ Incorrecto: un solo contrato gigante que obliga a implementar todo
export interface OrderService {
  findAll(filters: OrderFilters): Promise<Order[]>;
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
  delete(id: OrderId): Promise<void>;
  archive(id: OrderId): Promise<void>;
  duplicate(id: OrderId): Promise<Order>;
  export(format: string): Promise<Blob>;
}
```

### D — Dependency Inversion Principle

Los componentes y hooks de alto nivel no dependen de concreciones (axios, fetch, localStorage). Dependen de abstracciones definidas en `domain/ports/`. Las concreciones se inyectan desde `providers/container.ts`.

```ts
// domain/ports/OrderRepository.ts — abstracción
export interface OrderRepository {
  findAll(filters: OrderFilters): Promise<Order[]>;
}

// infrastructure/api/HttpOrderRepository.ts — concreción
import type { OrderRepository } from '@/domain/ports/OrderRepository';

export class HttpOrderRepository implements OrderRepository {
  constructor(private readonly http: HttpClient) {}
  async findAll(filters: OrderFilters): Promise<Order[]> {
    const response = await this.http.get('/orders', { params: filters });
    return response.data.map(OrderMapper.toDomain);
  }
}

// providers/container.ts — Composition Root
import { HttpOrderRepository } from '@/infrastructure/api/HttpOrderRepository';
import type { OrderRepository } from '@/domain/ports/OrderRepository';

export const orderRepository: OrderRepository = new HttpOrderRepository(httpClient);

// features/orders/api/useOrders.ts — consume la abstracción
import { orderRepository } from '@/providers/container';

export function useOrders(filters: OrderFilters) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: () => orderRepository.findAll(filters),
  });
}
```

**Regla fundamental**: si un archivo dentro de `features/` o `domain/` importa directamente de `infrastructure/`, es un error. Solo `providers/container.ts` conoce las concreciones.

```ts
// ❌ PROHIBIDO dentro de una feature
import { HttpOrderRepository } from '@/infrastructure/api/HttpOrderRepository';

// ✅ Correcto: importar desde el container o recibir por prop/contexto
import { orderRepository } from '@/providers/container';
```

---

## Conexión entre Capas: Solo a través de Abstracciones

1. Los puertos (interfaces) viven en `domain/ports/`. Definen qué necesita el dominio del mundo exterior.
2. Las implementaciones viven en `infrastructure/`. Cumplen los contratos de los puertos.
3. El ensamblaje ocurre en `providers/container.ts` — único punto donde se instancian concreciones.
4. Las features consumen las abstracciones, nunca las concreciones.

```
domain/ports/OrderRepository.ts        ← interfaz (contrato)
         ▲
         │ implements
         │
infrastructure/api/HttpOrderRepository.ts  ← concreción
         │
         │ se instancia en
         ▼
providers/container.ts                 ← Composition Root
         │
         │ se consume en
         ▼
features/orders/api/useOrders.ts       ← solo conoce la interfaz
```

Para facilitar la inyección se puede usar React Context como mecanismo de entrega:

```tsx
// providers/RepositoryContext.tsx
interface Repositories {
  orderRepo: OrderRepository;
  userRepo: UserRepository;
}

const RepositoryContext = createContext<Repositories | null>(null);

export function RepositoryProvider({ children }: PropsWithChildren) {
  const repos: Repositories = {
    orderRepo: new HttpOrderRepository(httpClient),
    userRepo: new HttpUserRepository(httpClient),
  };
  return <RepositoryContext.Provider value={repos}>{children}</RepositoryContext.Provider>;
}

export function useRepositories(): Repositories {
  const ctx = useContext(RepositoryContext);
  if (!ctx) throw new Error('RepositoryProvider is missing');
  return ctx;
}
```

---

## Gestión de Estado

### Estado de Servidor — TanStack Query

Todo dato que vive en el backend se gestiona exclusivamente con TanStack Query. Nunca se duplica en stores de UI.

```ts
// features/orders/api/queries.ts
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: OrderFilters) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

// features/orders/api/useOrders.ts
export function useOrders(filters: OrderFilters) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: () => orderRepository.findAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cmd: CreateOrderCommand) => orderRepository.save(Order.create(cmd)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.lists() }),
  });
}
```

Reglas:
- Cada feature define su propia query key factory en `api/queries.ts`.
- `staleTime` y `gcTime` se configuran explícitamente; no depender de los defaults.
- Las mutaciones invalidan las queries afectadas en `onSuccess`.

### Estado de UI — Zustand

El estado puramente de interfaz (modales, filtros seleccionados, sidebar abierto) se gestiona con Zustand. Nunca duplicar aquí lo que ya está en TanStack Query.

```ts
// features/orders/store/useOrderUIStore.ts
interface OrderUIState {
  selectedIds: Set<string>;
  isFilterPanelOpen: boolean;
  toggleSelection: (id: string) => void;
  openFilterPanel: () => void;
  closeFilterPanel: () => void;
}

export const useOrderUIStore = create<OrderUIState>((set) => ({
  selectedIds: new Set(),
  isFilterPanelOpen: false,
  toggleSelection: (id) =>
    set((state) => {
      const next = new Set(state.selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      return { selectedIds: next };
    }),
  openFilterPanel: () => set({ isFilterPanelOpen: true }),
  closeFilterPanel: () => set({ isFilterPanelOpen: false }),
}));
```

---

## Estilos: CSS Modules

El proyecto usa **CSS Modules** como única estrategia de estilos por componente. No se permite escribir estilos globales de componente en `styles/global.css` ni clases utilitarias ad-hoc.

### Reglas fundamentales

- Cada componente (en `common/` o en `features/`) tiene su propio archivo `.module.css` colocado **junto** al `.tsx`.
- Los módulos CSS se importan con el alias `styles` y se aplican como `styles.nombreDeClase`.
- Los nombres de clase usan `camelCase` dentro del módulo.
- Nunca se usan selectores de tag (`div`, `span`) como selectores principales; siempre clases.
- Las composiciones entre clases del mismo módulo usan `composes`.
- Las variables de diseño (colores, espaciado, tipografía, radios) se definen en `styles/tokens.css` como custom properties de `:root` e importadas **una sola vez** en `main.tsx`.
- `styles/reset.css` también se importa solo en `main.tsx`.

### Estructura de archivo por componente

```
common/atoms/Button/
├── Button.tsx
├── Button.module.css
└── index.ts          ← re-exporta Button y ButtonProps
```

```
features/orders/components/
├── OrderCard.tsx
├── OrderCard.module.css
├── OrderList.tsx
└── OrderList.module.css
```

### `styles/tokens.css` — única fuente de tokens

```css
/* src/styles/tokens.css */
:root {
  /* Colores */
  --color-primary:        #2563eb;
  --color-on-primary:     #ffffff;
  --color-surface:        #f8fafc;
  --color-border:         #e2e8f0;
  --color-danger:         #dc2626;
  --color-on-danger:      #ffffff;

  /* Espaciado (escala de 4 px) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;

  /* Tipografía */
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;

  /* Radios */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

```tsx
// src/main.tsx
import './styles/reset.css';
import './styles/tokens.css';
// ← estas son las únicas importaciones de CSS globales permitidas
```

### Ejemplo completo — componente de feature

```tsx
// features/orders/components/OrderCard.tsx
import styles from './OrderCard.module.css';
import type { Order } from '@/domain/models/Order';

interface OrderCardProps {
  order: Order;
  isSelected?: boolean;
}

export function OrderCard({ order, isSelected = false }: OrderCardProps) {
  return (
    <article className={[styles.card, isSelected ? styles.selected : ''].filter(Boolean).join(' ')}>
      <h3 className={styles.reference}>{order.reference}</h3>
      <span className={styles.total}>{order.total.format()}</span>
    </article>
  );
}
```

```css
/* features/orders/components/OrderCard.module.css */
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition: box-shadow 0.15s ease;
}

.card:hover {
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
}

.selected {
  composes: card;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.reference {
  font-size: var(--text-md);
  font-weight: 600;
}

.total {
  font-size: var(--text-sm);
  color: var(--color-primary);
}
```

### Composición de clases — patrón recomendado

Preferir `composes` de CSS nativo sobre concatenación manual de strings cuando se extiende una clase base dentro del mismo módulo.

```css
/* ✅ Correcto: composes en el mismo archivo */
.buttonBase { padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); }
.primary    { composes: buttonBase; background: var(--color-primary); }

/* ✅ Aceptable: composes desde tokens si se necesita reutilizar en otro módulo */
.card { composes: surfaceBase from '@/styles/shared.module.css'; }

/* ❌ Prohibido: clases de componente globales fuera de un .module.css */
/* global.css */
.orderCard { ... }  /* ← no permitido */
```

### Lo que NO se permite

- Importar un `.module.css` de otro componente para reutilizar sus clases.
- Escribir estilos de componente en `styles/tokens.css` o `styles/reset.css`.
- Usar `style={{ ... }}` inline para valores estáticos (solo para valores dinámicos calculados en runtime).
- Agregar clases con nombres genéricos que colisionen entre módulos (`styles.wrapper`, `styles.container` sin contexto son aceptables ya que el módulo los encapsula, pero evitar abuso).

---

## Atomic Design (Acotado a `common/`)

Atomic Design aplica únicamente dentro de `common/` para componentes reutilizables transversales. Los componentes específicos de una feature viven dentro de esa feature, sin clasificación atómica.

| Nivel | Contenido | Ejemplo |
|---|---|---|
| `atoms/` | Elementos indivisibles sin lógica de negocio | `Button`, `Input`, `Badge`, `Icon`, `Spinner` |
| `molecules/` | Composición de átomos con comportamiento acotado | `SearchBar`, `FormField`, `Tooltip`, `DropdownMenu` |
| `organisms/` | Bloques complejos reutilizables | `Navbar`, `Sidebar`, `DataTable`, `Modal`, `Pagination` |
| `templates/` | Layouts estructurales de página | `MainLayout`, `AuthLayout`, `DashboardLayout` |

Reglas:
- Los átomos no importan de moléculas ni organismos.
- Cada componente de `common/` es agnóstico al dominio; no conoce entidades como `Order` o `User`.
- Si un componente se usa solo en una feature, no va en `common/`.
- Cada componente exporta su interfaz de props explícita.
- Cada componente tiene su propio archivo `.module.css` colocado junto a él.

```tsx
// common/atoms/Button/Button.tsx
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({ variant, size = 'md', isLoading, children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={[styles.base, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
}
```

```css
/* common/atoms/Button/Button.module.css */
/* Las variables vienen de styles/tokens.css, importado una sola vez en main.tsx */
.base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.primary  { background: var(--color-primary); color: var(--color-on-primary); }
.secondary { background: var(--color-surface); border: 1px solid var(--color-border); }
.ghost    { background: transparent; }
.danger   { background: var(--color-danger); color: var(--color-on-danger); }

.sm { padding: var(--space-1) var(--space-2); font-size: var(--text-sm); }
.md { padding: var(--space-2) var(--space-4); font-size: var(--text-md); }
.lg { padding: var(--space-3) var(--space-6); font-size: var(--text-lg); }
```

---

## TypeScript Strict

El `tsconfig.json` debe tener como mínimo:

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "exactOptionalPropertyTypes": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Reglas:
- `any` está prohibido. Usar `unknown` y refinar con type guards.
- Toda prop, retorno de función y variable de estado tiene tipo explícito.
- Preferir `interface` para contratos públicos, `type` para uniones y utilitarios.
- Los enums se reemplazan por `as const` objects o union types.

```ts
// ✅ Correcto
const ORDER_STATUS = { PENDING: 'pending', SHIPPED: 'shipped', DELIVERED: 'delivered' } as const;
type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

// ❌ Incorrecto
enum OrderStatus { Pending, Shipped, Delivered }
```

---

## Testing

### Tests Unitarios — Vitest

- El dominio se testea con Vitest puro, sin React ni DOM.
- Los hooks se testean con `renderHook` de Testing Library.
- Los componentes se testean con Testing Library, priorizando queries por rol y accesibilidad.

```ts
// tests/unit/domain/services/PricingService.test.ts
describe('PricingService', () => {
  it('applies 10% discount for orders above 100', () => {
    const total = PricingService.calculateTotal([
      { price: Money.of(60, 'USD'), quantity: 2 },
    ]);
    expect(total.amount).toBe(108); // 120 - 10%
  });
});

// tests/unit/features/orders/hooks/useOrders.test.ts
describe('useOrders', () => {
  it('returns order list from repository', async () => {
    const fakeRepo = new InMemoryOrderRepository([orderFixture]);
    const { result } = renderHook(() => useOrders({ status: 'active' }), {
      wrapper: createTestWrapper({ orderRepo: fakeRepo }),
    });
    await waitFor(() => expect(result.current.data).toHaveLength(1));
  });
});
```

### Tests E2E — Playwright

```ts
// tests/e2e/orders.spec.ts
test.describe('Orders', () => {
  test('user can create a new order', async ({ page }) => {
    await page.goto('/orders/new');
    await page.getByLabel('Customer').fill('Acme Corp');
    await page.getByRole('button', { name: 'Add item' }).click();
    await page.getByLabel('Product').fill('Widget');
    await page.getByRole('button', { name: 'Submit order' }).click();
    await expect(page.getByText('Order created')).toBeVisible();
  });
});
```

Estructura de tests:

```
tests/
├── unit/
│   ├── domain/         # Lógica de negocio pura
│   ├── features/       # Hooks y componentes por feature
│   └── common/         # Componentes compartidos
├── integration/
│   └── infrastructure/ # Clientes HTTP, storage adapters
└── e2e/
    └── *.spec.ts       # Flujos completos con Playwright
```

---

## Calidad y CI

### Husky + lint-staged

```jsonc
// .husky/pre-commit
npx lint-staged

// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,module.css,json,md}": ["prettier --write"]
  }
}
```

### Pipeline CI mínimo

```yaml
# .github/workflows/ci.yml
steps:
  - run: pnpm install --frozen-lockfile
  - run: pnpm tsc --noEmit              # Type check
  - run: pnpm eslint . --max-warnings 0  # Lint
  - run: pnpm vitest run --coverage       # Unit tests
  - run: pnpm playwright test             # E2E tests
```

---

## Naming Conventions

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | `PascalCase`, archivo = nombre | `OrderCard.tsx` |
| Módulos CSS | Mismo nombre que el componente + `.module.css` | `OrderCard.module.css` |
| Clases CSS | `camelCase` dentro del módulo | `.cardHeader`, `.isSelected` |
| Hooks | `camelCase` con prefijo `use` | `useOrders.ts` |
| Interfaces/Types | `PascalCase`, sin prefijo `I` | `OrderRepository`, `ButtonProps` |
| Stores | `camelCase` con prefijo `use...Store` | `useOrderUIStore.ts` |
| Constantes | `UPPER_SNAKE_CASE` | `ORDER_STATUS`, `MAX_RETRIES` |
| Puertos | Sustantivo descriptivo de la capacidad | `PaymentGateway`, `NotificationService` |
| Implementaciones | Prefijo con tecnología | `HttpOrderRepository`, `LocalStorageCartStore` |
| Query keys | Factory object en `queries.ts` | `orderKeys.list(filters)` |
| Archivos de test | `.test.ts(x)` / `.spec.ts` | `PricingService.test.ts`, `orders.spec.ts` |
| Barrels | `index.ts` por feature | Solo re-exporta la API pública |

---

## Buenas Prácticas Adicionales

### Imports

- Usar path aliases (`@/domain/...`, `@/features/...`, `@/common/...`).
- Cada feature expone un barrel (`index.ts`) con su API pública. Las features nunca importan archivos internos de otra feature; solo lo expuesto por el barrel.

```ts
// ✅ Correcto
import { OrderCard } from '@/features/orders';

// ❌ Incorrecto: importar un archivo interno de otra feature
import { OrderCard } from '@/features/orders/components/OrderCard';
```

### Componentes

- Componentes funcionales siempre. No usar clases.
- `React.FC` está prohibido; declarar props como argumento tipado.
- Un componente por archivo.
- Colocar el `.module.css`, tests y tipos junto al componente cuando son exclusivos.
- Los estilos de un componente viven únicamente en su `.module.css`; nunca en archivos de estilos globales.
- Para valores de estilo dinámicos calculados en runtime usar `style={{ ... }}` inline; para todo lo estático, CSS Modules.

### Manejo de Errores

- Usar Error Boundaries en los límites de cada feature.
- Las excepciones de dominio se definen en `domain/errors/` y se tipan.
- Las capas de presentación traducen errores de dominio a feedback de UI (toasts, banners).

```ts
// domain/errors/DomainError.ts
export class DomainError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class InsufficientStockError extends DomainError {
  constructor(productId: string) {
    super(`Insufficient stock for product ${productId}`, 'INSUFFICIENT_STOCK');
  }
}
```

### Performance

- `React.memo` solo cuando se demuestre un problema de rendimiento con profiling.
- `useMemo` / `useCallback` para valores y funciones pasados como props a componentes memorizados.
- Lazy loading de features con `React.lazy` + `Suspense` en el router.

---

## Resumen de Reglas No Negociables

1. Las capas se comunican exclusivamente a través de interfaces (`domain/ports/`), nunca con concreciones directas.
2. La regla de dependencia apunta hacia adentro: `features → domain ← infrastructure`.
3. `domain/` tiene cero imports de React, axios, o cualquier librería de infraestructura.
4. TypeScript `strict: true` sin excepciones. Cero `any`.
5. Los cinco principios SOLID se respetan en cada componente, hook y servicio.
6. Estado de servidor en TanStack Query, estado de UI en Zustand. Nunca duplicar.
7. Los componentes de `common/` son agnósticos al dominio.
8. Las features no importan internals de otra feature; solo barrels públicos.
9. La composición de dependencias ocurre en `providers/container.ts`.
10. El CI pasa type-check, lint, tests unitarios y E2E sin errores ni warnings.
11. Los estilos de componente se escriben en CSS Modules (`.module.css`). No existen clases de componente en archivos CSS globales. `styles/tokens.css` y `styles/reset.css` son los únicos archivos CSS globales permitidos y se importan exclusivamente en `main.tsx`.
