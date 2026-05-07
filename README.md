# Prizma Gaming Platform — Frontend

Plataforma de gaming desarrollada con Next.js para el Taller Grupal Corte 3.
Materia: Computación en Internet III — ICESI 2026.

Figma Mocks: https://www.figma.com/design/yop4ZXN2z0rL0NCPApB2ia/Prizma-Front?node-id=0-1&t=kqrNMAx3orQkLgdI-1

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Axios

## Requisitos

- Node.js 18+
- npm

## Instalación y ejecución local

```bash
npm install
```

Crea un archivo `.env.local` en la raíz con:
NEXT_PUBLIC_API_URL=https://tu-backend.up.railway.app

Luego:

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`.

## Funcionalidades implementadas

- **Autenticación completa:** registro, login y logout con JWT
- **Feed de juegos:** banner trending y carousels por categoría (Todos, PC, Mobile)
- **Protección de rutas:** redirección automática según estado de sesión
- **Navbar sticky:** con sidebar modal de perfil en desktop
- **10+ componentes reutilizables:** Button, Input, Navbar, GameCard, Modal, Pagination, StarRating, LoadingSpinner, EmptyState, UserAvatar

## Autenticación y manejo de estado

El flujo de autenticación funciona así:

1. El usuario hace login con email y password
2. El backend retorna un `access_token` JWT
3. El token se almacena en `localStorage` bajo la clave `token`
4. El objeto `User` completo se obtiene con `GET /users/email/:email` y se guarda en `localStorage` bajo la clave `user`
5. El `AuthContext` lee ambos valores al iniciar y expone `isAuthenticated`, `user`, `login()` y `logout()`
6. El cliente axios inyecta el token automáticamente en cada request mediante un interceptor
7. Si el backend responde 401, el interceptor limpia el localStorage y redirige al login

## Despliegue

Frontend desplegado en Vercel.
Backend desplegado en Railway.

## Equipo

- [Nombre 1] — Auth pages, servicios
- [Nombre 2] — Navbar
- [Nombre 3] — Feed, carousels
- [Nombre 4] — GameCard, layout, componentes base
