const request = require('request');

// Listado de documentos a procesar
listadoDocumentos = () => {
    return [{
        key: '30',
        name: 'Factura',
    }, {
        key: '32',
        name: 'Factura de ventas y servicios no afectos o exentos de IVA',
    }, {
        key: '33',
        name: 'Factura electrónica',
    }, {
        key: '34',
        name: 'Factura no afecta o exenta electrónica',
    }, {
        key: '35',
        name: 'Boleta',
    }, {
        key: '38',
        name: 'Boleta exenta',
    }, {
        key: '39',
        name: 'Boleta electrónica',
    }, {
        key: '40',
        name: 'Liquidación factura',
    }, {
        key: '41',
        name: 'Boleta exenta electrónica',
    }, {
        key: '43',
        name: 'Liquidación factura electrónica',
    }, {
        key: '45',
        name: 'Factura de compra',
    }, {
        key: '46',
        name: 'Factura de compra electrónica',
    }, {
        key: '48',
        name: 'Pago electrónico',
    }, {
        key: '50',
        name: 'Guía de despacho',
    }, {
        key: '52',
        name: 'Guía de despacho electrónica',
    }, {
        key: '55',
        name: 'Nota de débito',
    }, {
        key: '56',
        name: 'Nota de débito electrónica',
    }, {
        key: '60',
        name: 'Nota de crédito',
    }, {
        key: '61',
        name: 'Nota de crédito electrónica',
    }, {
        key: '103',
        name: 'Liquidación',
    }, {
        key: '110',
        name: 'Factura de exportación electrónica',
    }, {
        key: '111',
        name: 'Nota de débito de exportación electrónica',
    }, {
        key: '112',
        name: 'Nota de crédito de exportación electrónica',
    }, {
        key: '801',
        name: 'Orden de compra',
    }, {
        key: '802',
        name: 'Presupuesto',
    }, {
        key: '803',
        name: 'Contrato',
    }, {
        key: '804',
        name: 'Resolución',
    }, {
        key: '805',
        name: 'Proceso ChileCompra',
    }, {
        key: '806',
        name: 'Ficha ChileCompra',
    }, {
        key: '807',
        name: 'DUS',
    }, {
        key: '808',
        name: 'B/L (conocimiento de embarque)',
    }, {
        key: '809',
        name: 'AWB (Air Will Bill)',
    }, {
        key: '810',
        name: 'MIC/DTA',
    }, {
        key: '811',
        name: 'Carta de porte',
    }, {
        key: '812',
        name: 'Resolución del SNA donde califica servicios de exportación',
    }, {
        key: '813',
        name: 'Pasaporte',
    }, {
        key: '814',
        name: 'Certificado de depósito bolsa prod. Chile',
    }, {
        key: '815',
        name: 'Vale de prenda bolsa prod. Chile',
    }, {
        key: '914',
        name: 'Declaración de ingreso (DIN)',
    }];
}


generarUUID = () => {
    for (var a = [], b = '0123456789abcdef', c = 0; 36 > c; c++) {
        a[c] = b.substr(Math.floor(16 * Math.random()), 1);
    }
    a[14] = '4',
    a[19] = b.substr(3 & a[19] | 8, 1),
    a[8] = a[13] = a[18] = a[23] = '-';
    var d = a.join('');
    return d
};

obtenerCredenciales = (dni, password) => {
    return new Promise((resolve, reject) => {
        request.post({
            form: {
                rut: dni.replace(/\./g, '').split('-')[0],
                dv: dni.replace(/\./g, '').split('-')[1],
                referencia: 'https://misiir.sii.cl/cgi_misii/siihome.cgi',
                rutcntr: dni,
                clave: password,
            },
            url: 'https://zeusr.sii.cl/cgi_AUT2000/CAutInicio.cgi'
        }, (error, response) => {
            if (!error && response && response.headers && response.headers['set-cookie']) {
                const list = {};
                response.headers['set-cookie'].forEach((cookie) => {
                    try {
                        list[cookie.split(';')[0].split('=')[0]] = cookie.split(';')[0].split('=')[1];
                    } catch(error) {
                        reject(error);
                    }
                });
                resolve(list);
            } else {
                reject(error);
            }
        });
    });
};

obtenerDetalleCompra = (session, document, month, year) => {
    return new Promise((resolve, reject) => {
        request({
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cookie': `TOKEN=${session.TOKEN}`,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
            },
            json: {
                data: {
                    codTipoDoc: document,
                    dvEmisor: session.DV_NS,
                    estadoContab: 'REGISTRO',
                    operacion: 'COMPRA',
                    ptributario: `${year}${month}`,
                    rutEmisor: session.RUT_NS,
                },
                metaData: {
                    conversationId: session.TOKEN,
                    namespace: 'cl.sii.sdi.lob.diii.consdcv.data.api.interfaces.FacadeService/getDetalleCompra',
                    page: null,
                    transactionId: generarUUID(),
                }
            },
            method: 'POST',
            uri: 'https://www4.sii.cl/consdcvinternetui/services/data/facadeService/getDetalleCompra',
        }, (error, response) => {
            if (!error && response && response.body) {
                resolve(response.body.data);
            } else {
                reject(error);
            }
        });
    });



};

sincronizarDocumentos = async(dni, password, month, year) => {
    const session = await obtenerCredenciales(dni, password).then((response) => response);
    console.info('');
    console.info(`RUT: ${session.RUT_NS}-${session.DV_NS} (Periodo: ${year}-${month})`);
    if (session) {
        listadoDocumentos().forEach((row) => {
            obtenerDetalleCompra(session, row.key, month, year).then((response) => {
              console.info(response);
                //console.info(`${row.key} ${row.name} -> ${response} documentos`);
            });
        });
    } else {
        console.info('Error de conexión');
    }
};



//sincronizarDocumentos('17.052.424-1', '222422');
sincronizarDocumentos('76.973.499-6', 'isidora', '03', '2019');
//sincronizarDocumentos('76.103.915-6', 'Nubox.2019', '01', '2019');


