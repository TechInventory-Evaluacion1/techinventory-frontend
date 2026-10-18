export const environment = {
  production: false,

  // --- CONFIGURACIÓN PARA DESARROLLO LOCAL (Docker / Spring Boot local) ---
  catalogoApiUrl: 'http://localhost:8081/api/v1/productos',
  inventarioApiUrl: 'http://localhost:8082/api/v1/inventario',

  // --- CONFIGURACIÓN DE AWS (Comentada para cambiar fácilmente a la nube) ---
  // apiGatewayUrl: 'https://lk7j2r33td.execute-api.us-east-1.amazonaws.com',
  // catalogoApiUrl: 'https://lk7j2r33td.execute-api.us-east-1.amazonaws.com/api/productos',
  // inventarioApiUrl: 'http://44.223.67.156:8082/api/v1/inventario',

  msal: {
    clientId: '489756c2-cdbb-4f16-8147-838100b537ea',
    authority: 'https://login.microsoftonline.com/ddfccc4f-6e03-4e1c-90b3-e5ba0d8a9523',
    redirectUri: 'http://localhost:4200',
    scopes: [
      'api://0a8285a1-9a6e-4150-9ffc-57c1badf3bff/api.read',
      'api://0a8285a1-9a6e-4150-9ffc-57c1badf3bff/api.write'
    ]
  }
};