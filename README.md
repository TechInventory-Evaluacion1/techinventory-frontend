# TechInventory — Módulo Frontend (E-Tech Logistics)

Interfaz web de usuario (UI) para el **Sistema de Gestión de Inventarios y Logística E-Commerce (TechInventory)** de **E-Tech Logistics**, desarrollada con **Angular (CLI v21.2.13)** e integrada mediante autenticación empresarial con **Microsoft Entra ID (Azure AD / MSAL)** y comunicación asíncrona con microservicios Spring Boot.

---

## Evolución del Proyecto (Entregas 1 a 3)

* **Entrega 1 (Arquitectura Cloud y Seguridad):**
  * Implementación de aplicación SPA en Angular con inicio de sesión corporativo mediante **MSAL (Microsoft Authentication Library)** y manejo de tokens JWT.
  * Conexión con microservicios desacoplados (`catalogo-service` e `inventario-service`) desplegados en **AWS EC2** detrás de **AWS API Gateway** con soporte CORS.
* **Entrega 2 (Sincronización Orientada a Eventos — RabbitMQ):**
  * Integración del flujo de creación de productos desde la interfaz web hacia el backend desacoplado con mensajería transaccional en **RabbitMQ**.
* **Entrega 3 (Gestión Operativa en Tiempo Real y Streaming — Apache Kafka):**
  * Consolidación del módulo **Gestión de Inventario** (`/gestion-inventario`) y **Catálogo** (`/catalogo`) con actualización inmediata de indicadores clave (KPIs) y sincronización con los flujos híbridos de **RabbitMQ + Apache Kafka**.

---

## Funcionalidades Principales

* **Autenticación Segura:** Inicio y cierre de sesión con cuentas corporativas de **Microsoft Entra ID** y envío automático de `Bearer Token` en peticiones protegidas.
* **Panel de Indicadores en Tiempo Real (KPIs):**
  * **Total de Productos** registrados en inventario.
  * **Stock Crítico (`< 10` unidades)** con alerta visual inmediata.
  * **Valor Total en Inventario** calculado dinámicamente.
* **Operaciones CRUD Completas en Gestión de Inventario:**
  * **Consulta (`GET`):** Listado de productos con categoría, precio unitario, stock actual y etiqueta de estado (`Disponible` / `Stock Bajo`).
  * **Creación (`POST`):** Formulario modal (`+ Nuevo Producto`) con validación de campos y sincronización instantánea.
  * **Actualización Rápida de Stock (`PUT/PATCH`):** Controles incrementales (`+` / `-`) por fila con recalculo automático del estado visual del producto.
  * **Búsqueda y Filtrado Reactivo:** Filtro instantáneo por nombre de producto y selector por estado de stock sin recargar la vista.
  * **Eliminación Segura (`DELETE`):** Diálogo modal de confirmación previo al borrado definitivo en base de datos.

---

## Stack Tecnológico

* **Framework:** Angular (CLI `21.2.13`) + TypeScript
* **Autenticación:** `@azure/msal-browser` / `@azure/msal-angular` (Microsoft Entra ID)
* **Comunicación HTTP:** Angular `HttpClient` + Interceptores JWT (`Fetch/XHR`)
* **Entornos:** Local (`http://localhost:4200`) y AWS API Gateway

---

## Configuración e Instalación Local

### 1. Prerrequisitos
* **Node.js** (v20 LTS o superior) y **npm**
* **Angular CLI** (`npm install -g @angular/cli`)
* Servicios backend (`catalogo-service` en `:8081` e `inventario-service` en `:8082`) en ejecución.

### 2. Instalación de Dependencias
```bash
npm install
```

### 3. Configuración de Endpoints (`environment.ts`)
Verifica las URLs de conexión hacia los microservicios en `src/environments/environment.ts` (en modo local o apuntando a AWS API Gateway):
```typescript
export const environment = {
  production: false,
  catalogoApiUrl: 'http://localhost:8081/api/productos',
  inventarioApiUrl: 'http://localhost:8082/api/v1/inventario'
};
```

### 4. Levantar Servidor de Desarrollo
```bash
ng serve
```
Abre tu navegador en **`http://localhost:4200/gestion-inventario`**. La aplicación se recargará automáticamente ante cualquier cambio en los archivos fuente.

---

## Comandos Útiles

```bash
# Generar un nuevo componente
ng generate component nombre-del-componente

# Compilar el proyecto para producción (genera carpeta dist/)
ng build
```

---

## Repositorio Oficial

* **Frontend:** [https://github.com/TechInventory-Evaluacion1/techinventory-frontend](https://github.com/TechInventory-Evaluacion1/techinventory-frontend)