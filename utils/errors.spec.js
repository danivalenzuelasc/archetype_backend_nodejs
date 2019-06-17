// Declaracion de dependencias
const { errorHttp, errorResponse } = require('./errors');

// Configuracion del contador
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/**
 * Pruebas del metodo errorHttp()
 */
test(`Prueba ${getCounter()} - Metodo errorHttp()`, async () => {
  counter += 1;
  const response = errorHttp(100);
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.description).toEqual('El navegador puede continuar realizando su petición (se utiliza para indicar que la primera parte de la petición del navegador se ha recibido correctamente).');
  expect(response.response.message).toEqual('Continue');
  expect(response.response.status).toEqual(100);
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorHttp()`, async () => {
  counter += 1;
  const response = errorHttp(200);
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.description).toEqual('Respuesta estándar para peticiones correctas.');
  expect(response.response.message).toEqual('OK');
  expect(response.response.status).toEqual(200);
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorHttp()`, async () => {
  counter += 1;
  const response = errorHttp(300);
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.description).toEqual('Indica opciones múltiples para el URI que el cliente podría seguir. Esto podría ser utilizado, por ejemplo, para presentar distintas opciones de formato para video, listar archivos con distintas extensiones o word sense disambiguation.');
  expect(response.response.message).toEqual('Multiple Choices');
  expect(response.response.status).toEqual(300);
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorHttp()`, async () => {
  counter += 1;
  const response = errorHttp(400);
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.description).toEqual('La solicitud contiene sintaxis errónea y no debería repetirse.');
  expect(response.response.message).toEqual('Bad Request');
  expect(response.response.status).toEqual(400);
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorHttp()`, async () => {
  counter += 1;
  const response = errorHttp(500);
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.description).toEqual('Es un código comúnmente emitido por aplicaciones empotradas en servidores web, mismas que generan contenido dinámicamente, por ejemplo aplicaciones montadas en IIS o Tomcat, cuando se encuentran con situaciones de error ajenas a la naturaleza del servidor web.');
  expect(response.response.message).toEqual('Internal Server Error');
  expect(response.response.status).toEqual(500);
}, 10000);

/**
 * Pruebas del metodo errorResponse()
 */
test(`Prueba ${getCounter()} - Metodo errorResponse()`, () => {
  counter += 1;
  const response = errorResponse('create');
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.message).toEqual('Se ha producido un error al intentar crear un nuevo registro. Por favor, vuelve a intentarlo en unos minutos.');
  expect(response.response.status).toEqual('ERROR_DB_CREATE');
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorResponse()`, () => {
  counter += 1;
  const response = errorResponse('list');
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.message).toEqual('Se ha producido un error al intentar obtener los registros. Por favor, vuelve a intentarlo en unos minutos.');
  expect(response.response.status).toEqual('ERROR_DB_LIST');
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorResponse()`, () => {
  counter += 1;
  const response = errorResponse('remove');
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.message).toEqual('Se ha producido un error al intentar eliminar el registro, no se ha encontrado coincidencias con los criterios de búsqueda. Por favor, contacta al administrador del sistema.');
  expect(response.response.status).toEqual('ERROR_DB_REMOVE');
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorResponse()`, () => {
  counter += 1;
  const response = errorResponse('update');
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.message).toEqual('Se ha producido un error al intentar actualizar el registro, no se ha encontrado coincidencias con los criterios de búsqueda. Por favor, contacta al administrador del sistema.');
  expect(response.response.status).toEqual('ERROR_DB_UPDATE');
}, 10000);
test(`Prueba ${getCounter()} - Metodo errorResponse()`, () => {
  counter += 1;
  const response = errorResponse('view');
  expect(response).toBeDefined();
  expect(response.response).toBeDefined();
  expect(response.response.message).toEqual('Se ha producido un error al intentar obtener el registro, no se ha encontrado coincidencias con los criterios de búsqueda. Por favor, contacta al administrador del sistema.');
  expect(response.response.status).toEqual('ERROR_DB_VIEW');
}, 10000);
