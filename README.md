# Sitio Web del Club de Programación FIUNA.

<div align="center">
  <img src="https://drive.google.com/uc?export=view&id=1OkDHnnwW2D4ZxtMyyp57greiRR0ZDarF" alt="Logo del Club de Programación FIUNA" width="200" />
  <p><em>Sitio web oficial del Club de Programación de la Facultad de Ingeniería de la Universidad Nacional de Asunción</em></p>
</div>

Proyecto público que contiene el sitio estático dinámico del Club de Programación de la Facultad de Ingeniería (FIUNA). Está construido con React + TypeScript y desplegado mediante Vercel.

## Estado actual (resumen)

El sitio está funcional en su mayoría: la navegación, páginas públicas, lectura de contenido markdown y la mayoría de componentes UI están implementados. Algunas integraciones de backend y funciones avanzadas siguen pendientes.

### ✅ Implementado
- Estructura de páginas públicas: Inicio, Nosotros, Eventos, Proyectos, Recursos, Blog, Documentación, Contacto.
- Componente de layout con `Header` y `Footer` responsivos.
- Sistema para renderizar contenido Markdown desde `src/content` y `docs/`.
- Tema claro/oscuro con persistencia en cliente.
- Formularios públicos (contacto, admisión) con UI lista — actualmente usan integraciones externas (Google Apps Script) o funcionan en modo `no-cors` según la implementación.
- Componentes UI reutilizables (botones, inputs, modales) y librerías: TailwindCSS, shadcn, lucide icons, framer-motion.
- Tipado con TypeScript y compatibilidad Vite 7.

### ⚠️ Pendiente / Falta implementación
- Backend propio para formularios y autenticación (actualmente se usan scripts externos o placeholders).
- CMS o panel de administración para editar contenido (actualmente el contenido vive en archivos markdown).
- Flujos de autenticación / gestión de miembros.
- Migración de contenido de ejemplo a contenido oficial y verificación de enlaces y assets.
- Tests automatizados y cobertura (pocas o ninguna pruebas unitarias/integ).

## Tecnologías principales

- React 18 + TypeScript
- Vite 7 (build rápido)
- Tailwind CSS
- shadcn/ui (componentes)
- Framer Motion (animaciones)
- React Router
- React Query

## Desarrollador: notas rápidas

- Node.js: recomendamos usar la versión activa LTS (por ejemplo 18.x/20.x), Vercel suele ejecutar recientes versiones; el proyecto fue verificado con Node compatible con Vite 7.
- Dependencias relevantes: `@vitejs/plugin-react-swc@^4.x` (compatibilidad con Vite 7), `vite@^7.x`.
- Si ves errores de tipos JSX en el editor, reinicia el servidor TypeScript en VS Code y asegúrate de usar la versión de TypeScript del workspace. Temporalmente añadimos `src/types/global-jsx.d.ts` como fallback para evitar advertencias del editor en algunas configuraciones.

## Ejecutar localmente

1. Clona el repositorio

```powershell
git clone https://github.com/cpfiuna-alt/website.git
cd website
```

2. Instala dependencias

```powershell
npm install
```

3. Levanta el servidor de desarrollo

```powershell
npm run dev
```

4. Construir para producción

```powershell
npm run build
```

5. Ejecutar chequeo de tipos (opcional)

```powershell
npx tsc --noEmit
```

## Despliegue

El sitio se despliega mediante Vercel. Si actualizas dependencias importantes (Vite, plugin-react-swc, etc.), puede ser necesario regenerar `package-lock.json` o limpiar `node_modules` en el entorno de construcción. En la CI de Vercel hemos resuelto conflictos de peer deps actualizando `@vitejs/plugin-react-swc` a la versión compatible con Vite 7.

## Contribuir

Agradecemos las contribuciones de todos los miembros del club y la comunidad.

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add some amazing feature'`)
4. Envía tus cambios (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

Para más detalles, consulta el archivo [CONTRIBUTING.md](CONTRIBUTING.md).

## Tareas recomendadas (para próximos pasos)

- Implementar backend de formularios y migrar integraciones a endpoints propios.
- Añadir autenticación y panel de administración para contenido.
- Añadir pruebas automáticas y GitHub Actions / Vercel previews.
- Revisar y eliminar el fallback `src/types/global-jsx.d.ts` cuando el TS server esté correctamente configurado en todos los entornos.

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Para consultas sobre el sitio web o el Club de Programación FIUNA, por favor contacta a través de:
- Email: [club.programacion@ing.una.py](mailto:club.programacion@ing.una.py)
- Discord: [Servidor del Club de Programación FIUNA](https://discord.gg/UtRpKw2ay4)
- GitHub: [github.com/cpfiuna](https://github.com/cpfiuna)

---

Desarrollado con el ❤️ por miembros del Club de Programación FIUNA.
