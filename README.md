# Invoicing App

> **Una aplicación web moderna para gestionar clientes y facturas con Next.js 14, TypeScript y Tailwind CSS.**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Descripción

**Invoicing App** es una solución completa para **freelancers, emprendedores y pequeñas empresas** que necesitan gestionar:

- **Clientes** con perfil, foto y datos de contacto  
- **Facturas** con estado, fecha, monto y paginación  
- **Búsqueda y filtros** intuitivos  
- **Diseño 100% responsive**  

Construida con **Next.js App Router**, **Server Components** y **optimización automática de imágenes**, esta app es rápida, segura y fácil de escalar.

---

## Características

| Característica | Estado |
|---------------|--------|
| Gestión de Clientes (CRUD) | Completed |
| Listado con paginación | Completed |
| Imágenes optimizadas (`next/image`) | Completed |
| Fallback de avatar por defecto | Completed |
| Diseño responsive (móvil, tablet, desktop) | Completed |
| Scroll vertical si hay muchos registros | Completed |
| Preparada para base de datos (Prisma, MongoDB, etc.) | In Progress |
| Generación de PDF de facturas | Planned |

---

## Tecnologías

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router + Server Components)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Imágenes**: `next/image` con lazy loading y blur placeholder
- **Despliegue**: Vercel (recomendado)

---

## Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/CristhianZ2022/invoicing-app.git

# 2. Entra al directorio
cd invoicing-app

# 3. Instala dependencias
npm install

# 4. Ejecuta en modo desarrollo
npm run dev