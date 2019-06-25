// Declaracion de dependencias
const service = require('node-windows').Service;
const settings = require('./config/settings');

// Se configura el servicio Windows que ejecuta el demonio
var svc = new service({
  description: 'API Restful de integraciones para Chile (NodeJS)',
  name: 'Integraciones Backend CL',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=1024'
  ],
  script: settings.windowsService,
});

// Se evalua el evento 'Install' que indica que el proceso está disponible como un servicio
svc.on('install', () => {
  svc.start();
});

// Se instala el servicio Windows
svc.install();
