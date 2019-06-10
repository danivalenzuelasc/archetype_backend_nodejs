// Declare dependencies
const cryptr = require('cryptr');
const moment = require('moment');
const request = require('request-promise');
const settings = require('./../config/settings');
const Cryptr = new cryptr(settings.endpoint.crypt);

// Function getDateInternal()
function getDateInternal(date) {
  return date ? moment(date, 'DD/MM/YYYY HH:mm:ss') : null;
}

// Function generateUUIDInternal()
function generateUUIDInternal() {
  let a = [];
  let b = '0123456789abcdef';
  let c;
  for (c = 0; c < 36; c += 1) {
    a[c] = b.substr(Math.floor(16 * Math.random()), 1);
  }
  a[8] = '-';
  a[13] = '-';
  a[14] = '4';
  a[18] = '-';
  a[23] = '-';
  try {
    return a.join('');
  } finally {
    a = b = c = null;
  }
}

// Export function generateUUID()
exports.generateUUID = generateUUIDInternal;

// Export function getCredentials()
exports.getCredentials = (dni, password, transaction = false) => {
  if (process.env.NODE_ENV === 'production' || transaction) {
    return new Promise((resolve) => {
      let aux0;
      let aux1;
      let list = {};
      let options = {
        form: {
          clave: password ? Cryptr.decrypt(password) : null,
          dv: dni.replace(/\./g, '').split('-')[1],
          referencia: 'https://misiir.sii.cl/cgi_misii/siihome.cgi',
          rut: dni.replace(/\./g, '').split('-')[0],
          rutcntr: dni,
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        json: true,
        method: 'POST',
        resolveWithFullResponse: true,
        uri: 'https://zeusr.sii.cl/cgi_AUT2000/CAutInicio.cgi',
      };
      request(options)
        .then((response) => {
          if (response && response.headers && response.headers['set-cookie']) {
            response.headers['set-cookie'].forEach((cookie) => {
              aux0 = cookie.split(';')[0].split('=')[0];
              aux1 = cookie.split(';')[0].split('=')[1];
              list[aux0] = aux1;
            });
            resolve(list);
          } else {
            resolve({});
          }
        })
        .finally(() => {
          aux0 = aux1 = dni = list = password = options = transaction = null;
        });
    });
  }
  return new Promise((resolve, reject) => {
    if (dni === null || password === null) {
      reject(new Error(''));
    } else {
      resolve({});
    }
  });
};

// Export function getDate()
exports.getDate = getDateInternal;

// Export function getDocuments()
exports.getDocuments = (transaction, data, year, month) => {
  return new Promise((resolve, reject) => {
    let options = {
      body: {
        data: {
          codTipoDoc: data.document,
          dvEmisor: transaction.user.replace(/\./g, '').split('-')[1],
          estadoContab: data.state,
          operacion: data.operation,
          ptributario: `${year}${month}`,
          rutEmisor: transaction.user.replace(/\./g, '').split('-')[0],
        },
        metaData: {
          conversationId: transaction.session.token,
          namespace: `cl.sii.sdi.lob.diii.consdcv.data.api.interfaces.FacadeService/${data.url}`,
          page: null,
          transactionId: generateUUIDInternal(),
        },
      },
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Cookie: `TOKEN=${transaction.session.token}`,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
      },
      json: true,
      method: 'POST',
      resolveWithFullResponse: true,
      uri: `https://www4.sii.cl/consdcvinternetui/services/data/facadeService/${data.url}`,
    };
    request(options)
      .then((response) => {
        if (response && response.body && response.body.data) {
          resolve(response.body.data);
          response = null;
        } else {
          reject(new Error(''));
        }
      })
      .catch(() => {
        reject(new Error(''));
      })
      .finally(() => {
        data = month = options = transaction = year = null;
      });
  });
};

// Export function getSummary()
exports.getSummary = (transaction, data, year, month) => {
  return new Promise((resolve, reject) => {
    let options = {
      body: {
        data: {
          dvEmisor: transaction.user.replace(/\./g, '').split('-')[1],
          estadoContab: data.state,
          operacion: data.operation,
          ptributario: `${year}${month}`,
          rutEmisor: transaction.user.replace(/\./g, '').split('-')[0],
        },
        metaData: {
          conversationId: transaction.session.token,
          namespace: 'cl.sii.sdi.lob.diii.consdcv.data.api.interfaces.FacadeService/getResumen',
          page: null,
          transactionId: generateUUIDInternal(),
        },
      },
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Cookie: `TOKEN=${transaction.session.token}`,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
      },
      json: true,
      method: 'POST',
      resolveWithFullResponse: true,
      uri: 'https://www4.sii.cl/consdcvinternetui/services/data/facadeService/getResumen',
    };
    request(options)
      .then((response) => {
        resolve(response.body.data ? response.body.data : []);
        response = null;
      })
      .catch(() => {
        reject(new Error(''));
      })
      .finally(() => {
        data = month = options = transaction = year = null;
      });
  });
};

// Export function mapperDocument()
exports.mapperDocument = (document, code = null, operation = null, user = null, queue = null) => {
  try {
    return {
      amount: {
        changeLaw18211: document.detLey18211, // Number => Monto de cambio Ley 18211
        exempt: document.detMntExe, // Number => Monto exento
        fixedAsset: document.detMntActFijo, // Number => Monto del activo fijo
        net: document.detMntNeto, // Number => Monto neto
        notBillable: document.detMntNoFact, // Number => Monto no facturable
        period: document.detMntPeriodo, // Number => Monto del periodo
        tobaccoCigar: document.detTabCigarrillos, // Number => Monto de tabacos (Cigarrillos)
        tobaccoElaborated: document.detTabElaborado, // Number => Monto de tabacos (Elaborados)
        tobaccoHavana: document.detTabPuros, // Number => Monto de tabacos (Puros)
        total: document.detMntTotal, // Number => Monto total
        withoutCredit: document.detMntSinCredito, // Number => Monto sin credito
      },
      business: {
        dv: document.detDvDoc, // String => Digito verificador
        name: document.detRznSoc, // String => Razon social
        rut: document.detRutDoc, // Number => Rut
      },
      date: {
        accuse: getDateInternal(document.detFecAcuse), // Date => Fecha de acuso
        document: getDateInternal(document.detFchDoc), // Date => Fecha del documento
        reception: getDateInternal(document.detFecRecepcion), // Date => Fecha de recepcion
        reclaimed: getDateInternal(document.detFecReclamado), // Date => Fecha del reclamo
      },
      document: {
        accountingStatement: document.dcvEstadoContab, // String => Estado contable del documento
        code, // Number => Codigo del tipo de documento
        codeSII: document.detCdgSIISucur, // Number => Codigo de la sucursal del SII
        containerDeposit: document.detDepEnvase, // Number => Garantia de deposito de envases
        foreign: {
          dni: document.detExpNumId, // String => Numero de identificacion del receptor extranjero
          nationality: document.detExpNacionalidad, // String => Nacionalidad del receptor extranjero
        },
        id: document.detNroDoc, // Number => Folio del documento
        indicator: {
          freeCharge: document.detIndSinCosto, // String => Indicador sin costo
          service: document.detIndServicio, // String => Indicador del servicio
        },
        internalSII: document.detNumInt, // Number => Numero interno del SII
        operation, // String => Tipo de operacion del doocumento (Compra / Venta)
        passage: {
          international: document.detPsjInt, // Number => Venta de pasaje internacional
          national: document.detPsjNac, // Number => Venta de pasaje nacional
        },
        period: String(document.detPcarga), // String => Periodo tributario donde se consulta el documento
        receiver: {
          code: document.detEventoReceptor, // String => Codigo del acuse de recibo
          description: document.detEventoReceptorLeyenda, // String => Descripcion del acuse de recibo
        },
        reference: {
          id: document.detFolioDocRef, // String => Referencia al folio del otro documento
          type: document.detTipoDocRef, // Number => Tipo de referencia a otro documento
        },
        senderNote: document.detEmisorNota, // Number => Codigo de la nota del emisor
        specialCredit: document.detCredEc, // Number => Credito especial de la empresa constructora
        status: document.detAnulado, // Boolean => Estado del documento
        transaction: {
          description: document.descTipoTransaccion, // String => Descripcion del tipo de transaccion del documento
          type: document.detTipoTransaccion, // Number => Tipo de transaccion del documento
        },
      },
      paying: {
        dv: document.detLiqDvEmisor, // String => DV de la liquidacion de factura
        exemptAmount: document.detLiqValComExe, // Number => Monto exento de la liquidacion de factura
        netAmount: document.detLiqValComNeto, // Number => Monto neto de la liquidacion de factura
        rut: document.detLiqRutEmisor, // Number => RUT de la liquidacion de factura
        taxAmount: document.detLiqValComIVA, // Number => Monto del impuesto de la liquidacion de factura
      },
      tax: {
        amount: document.detMntIVA, // Number => Monto del impuesto
        amountFixedAsset: document.detMntIVAActFijo, // Number => Monto del impuesto del activo fijo
        amountNonRecoverable: document.detMntIVANoRec, // Number => Monto del impuesto no recuperable
        codeNonRecoverable: document.detMntCodNoRec, // Number => Codigo del impuesto no recuperable
        commonUse: document.detIVAUsoComun, // Number => Impuesto de uso comun
        notWithheld: document.detIVANoRetenido, // Number => Impuesto no retenido
        outOfTime: document.detIVAFueraPlazo, // Number => Impuesto fuera de plazo
        own: document.detIVAPropio, // Number => Impuesto propio
        partialRetention: document.detIVARetParcial, // Number => Impuesto de retencion total
        rate: document.detTasaImp, // String => Tasa del impuesto del documento
        thirdParties: document.detIVATerceros, // Number => Impuesto de terceros
        totalRetention: document.detIVARetTotal, // Number => Impuesto de retencion total
        totalTax: document.totalDtoiMontoImp, // Number => Monto total de impuestos del documento
        totalTaxNonRecoverable: document.totalDinrMontoIVANoR, // Number => Total total de impuestos no recuperables del documento
        type: document.detTpoImp, // Number => Tipo de impuesto del documento
        vehicles: document.detImpVehiculo, // Number => Impuesto de vehiculos
      },
      transaction: {
        queue,
        user: user ? user.replace(/\./g, '') : null,
      },
    };
  } catch (e) {
    return {};
  } finally {
    code = document = operation = queue = user = null;
  }
};
