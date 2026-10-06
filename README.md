# antonio-2727

TurboSnail — una aplicación web sencilla de apuestas en carreras de caracoles. Los usuarios pueden autenticarse, ver carreras y estadísticas en el dashboard, y recargar saldo a través de SnailPay, un procesador de pagos simulado.

## Stack

- **Backend**: Node.js 24, Express 5, TypeScript (CommonJS), Vitest.
- **Frontend**: Node.js 24, React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui.

## Requisitos previos

- Node.js 24
- pnpm 10.33.2

Ambos paquetes tienen `.node-version = 24` y `packageManager = pnpm@10.33.2`. Si usas `nvm`, `fnm` u otro gestor de versiones, cada carpeta tiene su archivo `.node-version`.

## Instalación

`backend/` y `frontend/` son paquetes independientes con sus propios lockfiles. Instala las dependencias por separado:

```bash
cd backend && pnpm install
cd frontend && pnpm install
```

Copia los archivos de entorno:

```bash
cp backend/.env.template backend/.env
cp frontend/.env.template frontend/.env
```

## Configuración de entorno

Genera una `API_KEY` con el prefijo `sp_` seguido de 64 caracteres hexadecimales (32 bytes):

**Linux / macOS:**

```bash
echo "sp_$(openssl rand -hex 32)"
```

**Windows (PowerShell):**

```powershell
"sp_" + (-join ([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32) | ForEach-Object { $_.ToString("x2") }))
```

Luego completa los archivos `.env` con valores similares a estos:

**`backend/.env`**

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
API_KEY=<api_key_generada>
```

**`frontend/.env`**

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_API_KEY=<misma_api_key_del_backend>
```

> Usa la misma clave en ambos archivos para que el frontend pueda autenticarse contra el backend.

## Desarrollo

Backend:

```bash
cd backend
pnpm dev
```

Frontend:

```bash
cd frontend
pnpm dev
```

## Build y producción

Backend:

```bash
cd backend
pnpm build
pnpm start
```

Frontend:

```bash
cd frontend
pnpm build
pnpm preview
```

## Tests

Backend:

```bash
cd backend
pnpm test
```

Frontend:

```bash
cd frontend
pnpm test
```

## Simular problemas con SnailPay

El endpoint `POST /api/v1/top-up` simula distintos rechazos de pago. Requiere el header `x-api-key`.

Reemplaza `<uuid-del-usuario-existente>` por el UUID de un usuario registrado.

Payload base (pago aprobado):

```json
{
  "user_id": "<uuid-del-usuario-existente>",
  "user_email": "antoniohau@example.com",
  "card_number": "1234123412341234",
  "expiration_date": "12/26",
  "cvv": "543",
  "user_name": "Antonio Hau",
  "amount": 50
}
```

Escenarios de fallo (cambia solo el campo indicado):

| Escenario                | Cambio en el payload                         | `status_detail` del error        |
|--------------------------|---------------------------------------------|----------------------------------|
| Tarjeta expirada         | `"expiration_date": "01/24"`                | `expired_card`                   |
| Tarjeta declinada        | `"card_number": "1111222233334444"`         | `declined_card`                  |
| Verificación fallida     | `"cvv": "000"`                              | `card_verification_failed`       |

En todos los casos de rechazo la API responde con **HTTP 402 Payment Required** e incluye los datos de la transacción rechazada.

## Notas

- La API del backend está bajo `/api/v1` y requiere el header `x-api-key`.
- Consulta `AGENTS.md` para convenciones y detalles específicos del repo.
