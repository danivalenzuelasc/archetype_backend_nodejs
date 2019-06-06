// Export global configs
module.exports = {
  documents: [
    {
      key: 'COMPRA',
      list: [
        'NO_INCLUIR',
        'PENDIENTE',
        'RECLAMADO',
        'REGISTRO',
      ],
      url: 'getDetalleCompra',
    }, {
      key: 'VENTA',
      list: [
        'REGISTRO',
      ],
      url: 'getDetalleVenta',
    },
  ],
  typesOfDocuments: [
    {
      key: 30,
      name: 'Factura',
    }, {
      key: 32,
      name: 'Factura de ventas y servicios no afectos o exentos de IVA',
    }, {
      key: 33,
      name: 'Factura electrónica',
    }, {
      key: 34,
      name: 'Factura no afecta o exenta electrónica',
    }, {
      key: 35,
      name: 'Boleta',
    }, {
      key: 38,
      name: 'Boleta exenta',
    }, {
      key: 39,
      name: 'Boleta electrónica',
    }, {
      key: 40,
      name: 'Liquidación factura',
    }, {
      key: 41,
      name: 'Boleta exenta electrónica',
    }, {
      key: 43,
      name: 'Liquidación factura electrónica',
    }, {
      key: 45,
      name: 'Factura de compra',
    }, {
      key: 46,
      name: 'Factura de compra electrónica',
    }, {
      key: 48,
      name: 'Pago electrónico',
    }, {
      key: 50,
      name: 'Guía de despacho',
    }, {
      key: 52,
      name: 'Guía de despacho electrónica',
    }, {
      key: 55,
      name: 'Nota de débito',
    }, {
      key: 56,
      name: 'Nota de débito electrónica',
    }, {
      key: 60,
      name: 'Nota de crédito',
    }, {
      key: 61,
      name: 'Nota de crédito electrónica',
    }, {
      key: 103,
      name: 'Liquidación',
    }, {
      key: 110,
      name: 'Factura de exportación electrónica',
    }, {
      key: 111,
      name: 'Nota de débito de exportación electrónica',
    }, {
      key: 112,
      name: 'Nota de crédito de exportación electrónica',
    }, {
      key: 801,
      name: 'Orden de compra',
    }, {
      key: 802,
      name: 'Presupuesto',
    }, {
      key: 803,
      name: 'Contrato',
    }, {
      key: 804,
      name: 'Resolución',
    }, {
      key: 805,
      name: 'Proceso ChileCompra',
    }, {
      key: 806,
      name: 'Ficha ChileCompra',
    }, {
      key: 807,
      name: 'DUS',
    }, {
      key: 808,
      name: 'B/L (conocimiento de embarque)',
    }, {
      key: 809,
      name: 'AWB (Air Will Bill)',
    }, {
      key: 810,
      name: 'MIC/DTA',
    }, {
      key: 811,
      name: 'Carta de porte',
    }, {
      key: 812,
      name: 'Resolución del SNA donde califica servicios de exportación',
    }, {
      key: 813,
      name: 'Pasaporte',
    }, {
      key: 814,
      name: 'Certificado de depósito bolsa prod. Chile',
    }, {
      key: 815,
      name: 'Vale de prenda bolsa prod. Chile',
    }, {
      key: 914,
      name: 'Declaración de ingreso (DIN)',
    },
  ],
};
