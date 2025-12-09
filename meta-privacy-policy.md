**Política de Privacidad (Meta / Instagram API) — Datos del Club**

Última actualización: 2025-12-09

Propósito
- Este documento describe qué datos del Club (organización) y datos relacionados con cuentas de administrador se recogen y utilizan específicamente para integrar la API de Instagram (Instagram Graph API) y para operar la funcionalidad de feed en este sitio web.
- Está pensado para cumplir los requisitos de transparencia de Meta / Facebook cuando se solicita acceso a la API para una cuenta Business/Creator.

Resumen rápido
- Datos requeridos del Club (servidor): `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`.
- Datos opcionales/operativos: `FB_APP_ID`, `FB_APP_SECRET` durante el intercambio de tokens (solo si se usa la herramienta de intercambio en servidor).
- Dónde se almacenan: variables de entorno del servicio de alojamiento (p. ej. Vercel) o en el servidor propio. Nunca se almacenan en el código cliente ni en el repositorio.

1) Qué datos recogemos y por qué

- `INSTAGRAM_ACCESS_TOKEN` (token de acceso de larga duración):
  - Uso: realizar llamadas a la API de Instagram para recuperar los medios (fotos, vídeos) del perfil del Club.
  - Motivo legal / finalidad: ejecución de contrato/servicio (gestionar y mostrar el feed público del Club en su sitio web).

- `INSTAGRAM_USER_ID` (identificador de la cuenta Business/Creator):
  - Uso: identificar la cuenta de Instagram cuyo contenido se solicita.

- `FB_APP_ID` y `FB_APP_SECRET` (solo si procede):
  - Uso: intercambio de tokens (cambio de token corto a token de larga duración) y, en algunos flujos, para renovar tokens.
  - Nota: el `FB_APP_SECRET` es altamente sensible; si se usa, solo debe almacenarse en un entorno seguro (variables de entorno del servidor) y nunca en el cliente o en el repositorio.

- Metadatos operativos y registros del servidor:
  - Se registran temporalmente para depuración y auditoría: solicitudes a la API (timestamp, endpoint, código de respuesta), errores, y dirección IP del servidor origen (no se registra la IP de usuarios finales por esta integración).
  - Uso: monitorización, resolución de incidencias y análisis de fallos.

2) Dónde y cómo almacenamos los datos

- Almacenamiento seguro en variables de entorno del servidor (p. ej. Vercel Environment Variables) o en archivos de configuración del servidor que estén fuera del control de versiones.
- Nunca se exponen datos sensibles al cliente (no se utilizan prefijos `VITE_` para secretos). El cliente solicita rutas de la API de servidor (`/api/instagram-feed`) que realizan las llamadas a Meta.
- Persistencia en caché:
  - Para evitar límites de uso y mejorar rendimiento, el servidor puede almacenar en caché las respuestas del feed (TTL configurable, por ejemplo 300 segundos por defecto). La caché puede persistirse en disco en el servidor para facilitar pruebas locales. Los tokens no se escriben en la caché en texto en lugares públicos.

3) Retención
- Tokens de acceso de larga duración: retenidos mientras sean válidos o hasta que el Club solicite su revocación. Recomendamos rotar/actualizar tokens al menos cada 60 días (periodo típico de expiración de Meta).
- Caché de medios: por defecto 5 minutos (300 segundos). Este valor es configurable mediante `X_CACHE_TTL_SECONDS`.
- Registros operativos: retenidos por un período limitado (p. ej. 30 días) para depuración, salvo que se requiera conservación por motivos legales.

4) Acceso interno y control
- Solo el personal autorizado del Club (administradores del sitio y responsables técnicos) tiene acceso a los tokens y a las variables de entorno en la plataforma de alojamiento.
- Las credenciales de la API no se almacenan en el repositorio de código fuente ni en ningún lugar público.

5) Compartición de datos y terceros
- Compartimos datos únicamente con Meta/Facebook como parte de las llamadas a la API (peticiones y respuestas). Meta es el proveedor de la API y procesa las solicitudes conforme a sus términos.
- No vendemos ni compartimos las credenciales ni los datos de feed del Club con terceros ajenos al servicio técnico del Club.

6) Seguridad
- Recomendaciones que cumplimos y recomendamos seguir:
  - Guardar secretos en variables de entorno del servidor (ej. Vercel Project → Settings → Environment Variables).
  - No incluir tokens ni secretos en el cliente ni en el control de versiones.
  - Limitar el número de usuarios con acceso a Business Manager / App Dashboard.
  - Revocar y regenerar tokens si se sospecha de un compromiso.

7) Derechos y solicitudes del Club
- El Club, como propietario de la cuenta, puede solicitar en cualquier momento:
  - Revocación o sustitución de `INSTAGRAM_ACCESS_TOKEN`.
  - Eliminación de cachés persistentes que contengan contenido de Instagram.
  - Exportación de registros operativos relevantes (sujeto a límites y seguridad).

8) Información de contacto
- Para consultas relacionadas con esta integración y con la privacidad de los datos, contactar a: `clubdeprogramacion@ing.una.py`.

9) Notas finales
- Esta política cubre exclusivamente los datos necesarios para integrar y operar el feed de Instagram (Meta). Para otras integraciones o para la política global de privacidad del sitio ver `PRIVACY` o el documento principal de privacidad del Club.
- Si en el futuro se amplía la recopilación o el uso de datos (por ejemplo, métricas adicionales, sincronización automática, o integración con otros servicios), actualizaremos este documento y comunicaremos los cambios a los responsables del Club.

--
Club de Programación FIUNA — Equipo técnico
