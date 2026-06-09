# Prizma Gaming Platform — Frontend

Plataforma de gaming desarrollada con Next.js para el Taller Grupal Corte 4.
Materia: Computación en Internet III — ICESI 2026.

Figma Mockups: https://www.figma.com/design/yop4ZXN2z0rL0NCPApB2ia/Prizma-Front?node-id=0-1&t=kqrNMAx3orQkLgdI-1

## Despliegue

- **Frontend:** https://taller-next-corte-3-y-4-prizma.vercel.app
- **Backend:** https://backend-prizma-molta-railway-production.up.railway.app/

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Axios
- Framer Motion
- Lucide React
- Cypress (E2E)

## Requisitos

- Node.js 18+
- npm

## Instalación y ejecución local

```bash
npm install
```

Crea un archivo `.env.local` en la raíz con:

```
NEXT_PUBLIC_API_URL=https://backend-prizma-molta-railway-production.up.railway.app
```

Luego:

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`.

## Funcionalidades implementadas

### Autenticación
- Registro de usuario con validación de campos
- Login con email y contraseña
- Logout con limpieza de sesión
- Protección de rutas — redirección automática si no hay sesión activa

### Feed de juegos
- Banner trending con el primer juego de la lista
- Carousels por categoría: Todos, PC, Mobile
- Datos reales del backend en tiempo real

### Detalle de juego
- Hero banner con imagen del juego
- Información completa: título, género, plataforma
- Botón "Agregar a Biblioteca" integrado con LibraryContext
- Sección de reseñas de la comunidad con rating por estrellas
- Formulario para publicar reseña (solo usuarios autenticados)
- Votos like/dislike en cada reseña

### Biblioteca
- Lista de juegos agregados por el usuario autenticado
- Estado vacío con acceso directo al feed
- Sincronización en tiempo real mediante LibraryContext

### Torneos
- Lista de torneos con hero banner y filtros por estado (Todos / Abiertos / En Curso / Cerrados)
- Detalle de torneo: reglamento, fecha, costo XP, cupos, anuncios
- Inscripción a torneos con feedback visual inmediato
- Formulario de creación de torneo con validación inline y preview de banner
- Notificación automática al inscribirse a un torneo

### Perfil
- Información del usuario: nombre, email, XP total, estado de cuenta
- Sincronización con plataformas externas (Steam, Epic, etc.)
- Historial de movimientos de XP
- Notificaciones pendientes con acción "Marcar como leída"

### Navbar
- Sticky con links a Feed, Biblioteca y Torneos
- Campana de notificaciones con badge de contador en tiempo real
- Sidebar de perfil con datos del usuario, XP y acceso rápido
- Menú hamburguesa responsive para mobile

## Autenticación y JWT

El flujo de autenticación funciona así:

1. El usuario envía email y contraseña a `POST /auth/login`
2. El backend retorna un `access_token` JWT firmado
3. El token se almacena en `localStorage` bajo la clave `token`
4. Se hace `GET /users/email/:email` para obtener el objeto `User` completo, que se guarda en `localStorage` bajo la clave `user`
5. El `AuthContext` lee ambos valores al montar y expone `isAuthenticated`, `user`, `isLoading`, `login()` y `logout()`
6. El cliente Axios inyecta el token automáticamente en cada request mediante un interceptor de request
7. Las rutas del dashboard verifican `isAuthenticated` en un `useEffect` y redirigen a `/login` si no hay sesión

## Gestión de estado

La app implementa dos contextos globales para satisfacer el requisito de gestión de estado:

### LibraryContext
Gestiona la biblioteca de juegos del usuario autenticado de forma global.
- Estado: `library[]` — lista de entradas de biblioteca del usuario
- Acciones: `addToLibrary(gameId)`, `removeFromLibrary(libraryId)`, `isInLibrary(gameId)`
- Se consume en: feed (botón de cada GameCard), detalle de juego (botón "Agregar a Biblioteca"), página de biblioteca
- Se inicializa automáticamente al detectar sesión activa en el AuthContext

### NotificationContext
Gestiona las notificaciones del usuario en tiempo real.
- Estado: `notifications[]`, `unreadCount` — contador de notificaciones no leídas
- Acciones: `markAsRead(id)`, `refresh()`
- Se consume en: campana de notificaciones en el Navbar (badge con contador), página de perfil (lista de pendientes), página de detalle de torneo (al inscribirse dispara `refresh()` para actualizar el badge en tiempo real)

El orden de providers en `layout.tsx` es: `AuthProvider → LibraryProvider → NotificationProvider`

## Pruebas E2E (Cypress)

```bash
# Con el servidor corriendo:
npm run dev

# En otra terminal:
npm run cypress:open
```

Seleccionar E2E Testing → Chrome → ejecutar `auth.cy.ts` y `feed.cy.ts`.

Para configurar credenciales de prueba, agregar en `cypress.config.ts`:

```ts
env: {
    TEST_EMAIL: 'tu-email@test.com',
    TEST_PASSWORD: 'tu-contraseña',
}
```

### Casos cubiertos
- Visualización de página de login y registro
- Mensaje de error con credenciales incorrectas
- Redirección al feed tras login exitoso
- Carga del feed con juegos reales
- Navegación a detalle de juego desde el feed
- Visualización de sección de reseñas en detalle
- Cierre de sesión correcto