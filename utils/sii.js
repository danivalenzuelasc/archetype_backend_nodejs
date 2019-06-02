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

// Export function getCredentials()
exports.getCredentials = (dni, password, test = false) => {
  if (process.env.NODE_ENV === 'production' || test) {
    return new Promise((resolve) => {
      const options = {
        form: {
          clave: Cryptr.decrypt(password),
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
            const list = {};
            response.headers['set-cookie'].forEach((cookie) => {
              const aux0 = cookie.split(';')[0].split('=')[0];
              const aux1 = cookie.split(';')[0].split('=')[1];
              list[aux0] = aux1;
            });
            resolve(list);
          } else {
            resolve({});
          }
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

// Export function getCredentials()
exports.mapperDocument = (document, code = null, operation = null) => {
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
        own: document.detIVAPropio, // Number => Impuesto proopio
        partialRetention: document.detIVARetParcial, // Number => Impuesto de retencion total
        rate: document.detTasaImp, // Number => Tasa del impuesto del documento
        thirdParties: document.detIVATerceros, // Number => Impuesto de terceros
        totalRetention: document.detIVARetTotal, // Number => Impuesto de retencion total
        type: document.detTpoImp, // Number => Tipo de impuesto del documento
        vehicles: document.detImpVehiculo, // Number => Impuesto de vehiculos
      },
      // totalDtoiMontoImp: 0, // Number => ??
      // totalDinrMontoIVANoR: null // ??
    };
  } catch (e) {
    return {};
  }
};
