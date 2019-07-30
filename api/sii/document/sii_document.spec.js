// Declaracion de dependencias
const mongoose = require('mongoose');
const { request } = require('../../testing');

// Declaracion de mocks de pruebas
const mocks = require('./sii_document.mocks');
const { errorResponse } = require('../../../utils/errors');

// Configuracion del contador
let counter = 0;
function getCounter() {
  counter += 1;
  return counter < 10 ? `0${counter}` : counter;
}

/**
 * Prueba del metodo Create
 * URI: /sii/document
 * Method: POST
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/document (POST) [siiDocument.create]`, async () => {
    counter += 1;
    await request().post('/sii/document').send(row)
      .then((response) => {
        if (response.statusCode === 201) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.amount).toBeDefined();
          expect(response.body.amount.changeLaw18211).toEqual(row.amount.changeLaw18211);
          expect(response.body.amount.exempt).toEqual(row.amount.exempt);
          expect(response.body.amount.fixedAsset).toEqual(row.amount.fixedAsset);
          expect(response.body.amount.net).toEqual(row.amount.net);
          expect(response.body.amount.notBillable).toEqual(row.amount.notBillable);
          expect(response.body.amount.period).toEqual(row.amount.period);
          expect(response.body.amount.tobaccoCigar).toEqual(row.amount.tobaccoCigar);
          expect(response.body.amount.tobaccoElaborated).toEqual(row.amount.tobaccoElaborated);
          expect(response.body.amount.tobaccoHavana).toEqual(row.amount.tobaccoHavana);
          expect(response.body.amount.total).toEqual(row.amount.total);
          expect(response.body.amount.withoutCredit).toEqual(row.amount.withoutCredit);
          expect(response.body.business).toBeDefined();
          expect(response.body.business.dv).toEqual(row.business.dv);
          expect(response.body.business.name).toEqual(row.business.name);
          expect(response.body.business.rut).toEqual(row.business.rut);
          expect(response.body.date).toBeDefined();
          expect(response.body.date.accuse).toEqual(row.date.accuse);
          expect(response.body.date.document).toEqual(row.date.document);
          expect(response.body.date.reception).toEqual(row.date.reception);
          expect(response.body.date.reclaimed).toEqual(row.date.reclaimed);
          expect(response.body.document).toBeDefined();
          expect(response.body.document.accountingStatement).toEqual(row.document.accountingStatement);
          expect(response.body.document.codeOffice).toEqual(row.document.codeOffice);
          expect(response.body.document.codeSII).toEqual(row.document.codeSII);
          expect(response.body.document.codes).toBeDefined();
          expect(response.body.document.codes.dcv).toEqual(row.document.codes.dcv);
          expect(response.body.document.codes.det).toEqual(row.document.codes.det);
          expect(response.body.document.containerDeposit).toEqual(row.document.containerDeposit);
          expect(response.body.document.foreign).toBeDefined();
          expect(response.body.document.foreign.dni).toEqual(row.document.foreign.dni);
          expect(response.body.document.foreign.nationality).toEqual(row.document.foreign.nationality);
          expect(response.body.document.id).toEqual(row.document.id);
          expect(response.body.document.indicator).toBeDefined();
          expect(response.body.document.indicator.freeCharge).toEqual(row.document.indicator.freeCharge);
          expect(response.body.document.indicator.service).toEqual(row.document.indicator.service);
          expect(response.body.document.internalSII).toEqual(row.document.internalSII);
          expect(response.body.document.operation).toEqual(row.document.operation);
          expect(response.body.document.passage).toBeDefined();
          expect(response.body.document.passage.international).toEqual(row.document.passage.international);
          expect(response.body.document.passage.national).toEqual(row.document.passage.national);
          expect(response.body.document.period).toEqual(row.document.period);
          expect(response.body.document.receiver).toBeDefined();
          expect(response.body.document.receiver.code).toEqual(row.document.receiver.code);
          expect(response.body.document.receiver.description).toEqual(row.document.receiver.description);
          expect(response.body.document.reference).toBeDefined();
          expect(response.body.document.reference.id).toEqual(row.document.reference.id);
          expect(response.body.document.reference.type).toEqual(row.document.reference.type);
          expect(response.body.document.senderNote).toEqual(row.document.senderNote);
          expect(response.body.document.shippingIdentifier).toEqual(row.document.shippingIdentifier);
          expect(response.body.document.specialCredit).toEqual(row.document.specialCredit);
          expect(response.body.document.status).toEqual(row.document.status);
          expect(response.body.document.transaction).toBeDefined();
          expect(response.body.document.transaction.description).toEqual(row.document.transaction.description);
          expect(response.body.document.transaction.type).toEqual(row.document.transaction.type);
          expect(response.body.execute).toBeDefined();
          expect(response.body.execute.details).toEqual(row.execute.details);
          expect(response.body.execute.xml).toEqual(row.execute.xml);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toEqual(null);
          expect(response.body.paying).toBeDefined();
          expect(response.body.paying.dv).toEqual(row.paying.dv);
          expect(response.body.paying.exemptAmount).toEqual(row.paying.exemptAmount);
          expect(response.body.paying.netAmount).toEqual(row.paying.netAmount);
          expect(response.body.paying.rut).toEqual(row.paying.rut);
          expect(response.body.paying.taxAmount).toEqual(row.paying.taxAmount);
          expect(response.body.send).toBeDefined();
          expect(response.body.send.execute).toEqual(row.send.execute);
          expect(response.body.send.error).toBeDefined();
          expect(response.body.send.error.code).toEqual(row.send.error.code);
          expect(response.body.send.error.message).toEqual(row.send.error.message);
          expect(response.body.send.pending).toEqual(row.send.pending);
          expect(response.body.tax).toBeDefined();
          expect(response.body.tax.amount).toEqual(row.tax.amount);
          expect(response.body.tax.amountFixedAsset).toEqual(row.tax.amountFixedAsset);
          expect(response.body.tax.amountNonRecoverable).toEqual(row.tax.amountNonRecoverable);
          expect(response.body.tax.codeNonRecoverable).toEqual(row.tax.codeNonRecoverable);
          expect(response.body.tax.commonUse).toEqual(row.tax.commonUse);
          expect(response.body.tax.notWithheld).toEqual(row.tax.notWithheld);
          expect(response.body.tax.outOfTime).toEqual(row.tax.outOfTime);
          expect(response.body.tax.own).toEqual(row.tax.own);
          expect(response.body.tax.partialRetention).toEqual(row.tax.partialRetention);
          expect(response.body.tax.rate).toEqual(row.tax.rate);
          expect(response.body.tax.thirdParties).toEqual(row.tax.thirdParties);
          expect(response.body.tax.totalRetention).toEqual(row.tax.totalRetention);
          expect(response.body.tax.totalTax).toEqual(row.tax.totalTax);
          expect(response.body.tax.totalTaxNonRecoverable).toEqual(row.tax.totalTaxNonRecoverable);
          expect(response.body.tax.type).toEqual(row.tax.type);
          expect(response.body.tax.vehicles).toEqual(row.tax.vehicles);
          expect(response.body.taxs).toBeDefined();
          if (Array.isArray(response.body.taxs)) {
            response.body.taxs.forEach((tax, keyTax) => {
              expect(tax.amount).toEqual(row.taxs[keyTax].amount);
              expect(tax.code).toEqual(row.taxs[keyTax].code);
              expect(tax.rate).toEqual(row.taxs[keyTax].rate);
            });
          }
          expect(response.body.transaction).toBeDefined();
          expect(response.body.transaction.queue).toBeDefined();
          expect(response.body.transaction.user).toEqual(row.transaction.user);
        } else if (response.statusCode === 400) {
          const error = errorResponse('create').response;
          expect(response.body).toBeDefined();
          expect(response.body.error).toBeDefined();
          expect(response.body.error.message).toEqual(error.message);
          expect(response.body.error.status).toEqual(error.status);
          expect(response.body.errorTrace).toBeDefined();
        }
      });
  }, 30000);
});

/**
 * Prueba del metodo View
 * URI: /sii/document/:id
 * Method: VIEW
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/document/:id (GET) [siiDocument.view]`, async () => {
    await request().get(`/sii/document/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.amount).toBeDefined();
          expect(response.body.amount.changeLaw18211).toEqual(row.amount.changeLaw18211);
          expect(response.body.amount.exempt).toEqual(row.amount.exempt);
          expect(response.body.amount.fixedAsset).toEqual(row.amount.fixedAsset);
          expect(response.body.amount.net).toEqual(row.amount.net);
          expect(response.body.amount.notBillable).toEqual(row.amount.notBillable);
          expect(response.body.amount.period).toEqual(row.amount.period);
          expect(response.body.amount.tobaccoCigar).toEqual(row.amount.tobaccoCigar);
          expect(response.body.amount.tobaccoElaborated).toEqual(row.amount.tobaccoElaborated);
          expect(response.body.amount.tobaccoHavana).toEqual(row.amount.tobaccoHavana);
          expect(response.body.amount.total).toEqual(row.amount.total);
          expect(response.body.amount.withoutCredit).toEqual(row.amount.withoutCredit);
          expect(response.body.business).toBeDefined();
          expect(response.body.business.dv).toEqual(row.business.dv);
          expect(response.body.business.name).toEqual(row.business.name);
          expect(response.body.business.rut).toEqual(row.business.rut);
          expect(response.body.date).toBeDefined();
          expect(response.body.date.accuse).toEqual(row.date.accuse);
          expect(response.body.date.document).toEqual(row.date.document);
          expect(response.body.date.reception).toEqual(row.date.reception);
          expect(response.body.date.reclaimed).toEqual(row.date.reclaimed);
          expect(response.body.document).toBeDefined();
          expect(response.body.document.accountingStatement).toEqual(row.document.accountingStatement);
          expect(response.body.document.codeOffice).toEqual(row.document.codeOffice);
          expect(response.body.document.codeSII).toEqual(row.document.codeSII);
          expect(response.body.document.codes).toBeDefined();
          expect(response.body.document.codes.dcv).toEqual(row.document.codes.dcv);
          expect(response.body.document.codes.det).toEqual(row.document.codes.det);
          expect(response.body.document.containerDeposit).toEqual(row.document.containerDeposit);
          expect(response.body.document.foreign).toBeDefined();
          expect(response.body.document.foreign.dni).toEqual(row.document.foreign.dni);
          expect(response.body.document.foreign.nationality).toEqual(row.document.foreign.nationality);
          expect(response.body.document.id).toEqual(row.document.id);
          expect(response.body.document.indicator).toBeDefined();
          expect(response.body.document.indicator.freeCharge).toEqual(row.document.indicator.freeCharge);
          expect(response.body.document.indicator.service).toEqual(row.document.indicator.service);
          expect(response.body.document.internalSII).toEqual(row.document.internalSII);
          expect(response.body.document.operation).toEqual(row.document.operation);
          expect(response.body.document.passage).toBeDefined();
          expect(response.body.document.passage.international).toEqual(row.document.passage.international);
          expect(response.body.document.passage.national).toEqual(row.document.passage.national);
          expect(response.body.document.period).toEqual(row.document.period);
          expect(response.body.document.receiver).toBeDefined();
          expect(response.body.document.receiver.code).toEqual(row.document.receiver.code);
          expect(response.body.document.receiver.description).toEqual(row.document.receiver.description);
          expect(response.body.document.reference).toBeDefined();
          expect(response.body.document.reference.id).toEqual(row.document.reference.id);
          expect(response.body.document.reference.type).toEqual(row.document.reference.type);
          expect(response.body.document.senderNote).toEqual(row.document.senderNote);
          expect(response.body.document.shippingIdentifier).toEqual(row.document.shippingIdentifier);
          expect(response.body.document.specialCredit).toEqual(row.document.specialCredit);
          expect(response.body.document.status).toEqual(row.document.status);
          expect(response.body.document.transaction).toBeDefined();
          expect(response.body.document.transaction.description).toEqual(row.document.transaction.description);
          expect(response.body.document.transaction.type).toEqual(row.document.transaction.type);
          expect(response.body.execute).toBeDefined();
          expect(response.body.execute.details).toEqual(row.execute.details);
          expect(response.body.execute.xml).toEqual(row.execute.xml);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toEqual(null);
          expect(response.body.paying).toBeDefined();
          expect(response.body.paying.dv).toEqual(row.paying.dv);
          expect(response.body.paying.exemptAmount).toEqual(row.paying.exemptAmount);
          expect(response.body.paying.netAmount).toEqual(row.paying.netAmount);
          expect(response.body.paying.rut).toEqual(row.paying.rut);
          expect(response.body.paying.taxAmount).toEqual(row.paying.taxAmount);
          expect(response.body.send).toBeDefined();
          expect(response.body.send.execute).toEqual(row.send.execute);
          expect(response.body.send.error).toBeDefined();
          expect(response.body.send.error.code).toEqual(row.send.error.code);
          expect(response.body.send.error.message).toEqual(row.send.error.message);
          expect(response.body.send.pending).toEqual(row.send.pending);
          expect(response.body.tax).toBeDefined();
          expect(response.body.tax.amount).toEqual(row.tax.amount);
          expect(response.body.tax.amountFixedAsset).toEqual(row.tax.amountFixedAsset);
          expect(response.body.tax.amountNonRecoverable).toEqual(row.tax.amountNonRecoverable);
          expect(response.body.tax.codeNonRecoverable).toEqual(row.tax.codeNonRecoverable);
          expect(response.body.tax.commonUse).toEqual(row.tax.commonUse);
          expect(response.body.tax.notWithheld).toEqual(row.tax.notWithheld);
          expect(response.body.tax.outOfTime).toEqual(row.tax.outOfTime);
          expect(response.body.tax.own).toEqual(row.tax.own);
          expect(response.body.tax.partialRetention).toEqual(row.tax.partialRetention);
          expect(response.body.tax.rate).toEqual(row.tax.rate);
          expect(response.body.tax.thirdParties).toEqual(row.tax.thirdParties);
          expect(response.body.tax.totalRetention).toEqual(row.tax.totalRetention);
          expect(response.body.tax.totalTax).toEqual(row.tax.totalTax);
          expect(response.body.tax.totalTaxNonRecoverable).toEqual(row.tax.totalTaxNonRecoverable);
          expect(response.body.tax.type).toEqual(row.tax.type);
          expect(response.body.tax.vehicles).toEqual(row.tax.vehicles);
          expect(response.body.taxs).toBeDefined();
          if (Array.isArray(response.body.taxs)) {
            response.body.taxs.forEach((tax, keyTax) => {
              expect(tax.amount).toEqual(row.taxs[keyTax].amount);
              expect(tax.code).toEqual(row.taxs[keyTax].code);
              expect(tax.rate).toEqual(row.taxs[keyTax].rate);
            });
          }
          expect(response.body.transaction).toBeDefined();
          expect(response.body.transaction.queue).toBeDefined();
          expect(response.body.transaction.user).toEqual(row.transaction.user);
        } else if (response.statusCode === 400) {
          const error = errorResponse('view').response;
          expect(response.body).toBeDefined();
          expect(response.body.error).toBeDefined();
          expect(response.body.error.message).toEqual(error.message);
          expect(response.body.error.status).toEqual(error.status);
          expect(response.body.errorTrace).toBeDefined();
        }
      });
  }, 30000);
});

/**
 * Prueba del metodo Update
 * URI: /sii/document/:id
 * Method: PUT
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/document/:id (PUT) [siiDocument.update]`, async () => {
    const data = row;
    data.business.name += ' - Update';
    await request().put(`/sii/document/${row._id}`).send(data)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.amount).toBeDefined();
          expect(response.body.amount.changeLaw18211).toEqual(row.amount.changeLaw18211);
          expect(response.body.amount.exempt).toEqual(row.amount.exempt);
          expect(response.body.amount.fixedAsset).toEqual(row.amount.fixedAsset);
          expect(response.body.amount.net).toEqual(row.amount.net);
          expect(response.body.amount.notBillable).toEqual(row.amount.notBillable);
          expect(response.body.amount.period).toEqual(row.amount.period);
          expect(response.body.amount.tobaccoCigar).toEqual(row.amount.tobaccoCigar);
          expect(response.body.amount.tobaccoElaborated).toEqual(row.amount.tobaccoElaborated);
          expect(response.body.amount.tobaccoHavana).toEqual(row.amount.tobaccoHavana);
          expect(response.body.amount.total).toEqual(row.amount.total);
          expect(response.body.amount.withoutCredit).toEqual(row.amount.withoutCredit);
          expect(response.body.business).toBeDefined();
          expect(response.body.business.dv).toEqual(row.business.dv);
          expect(response.body.business.name).toEqual(row.business.name);
          expect(response.body.business.rut).toEqual(row.business.rut);
          expect(response.body.date).toBeDefined();
          expect(response.body.date.accuse).toEqual(row.date.accuse);
          expect(response.body.date.document).toEqual(row.date.document);
          expect(response.body.date.reception).toEqual(row.date.reception);
          expect(response.body.date.reclaimed).toEqual(row.date.reclaimed);
          expect(response.body.document).toBeDefined();
          expect(response.body.document.accountingStatement).toEqual(row.document.accountingStatement);
          expect(response.body.document.codeOffice).toEqual(row.document.codeOffice);
          expect(response.body.document.codeSII).toEqual(row.document.codeSII);
          expect(response.body.document.codes).toBeDefined();
          expect(response.body.document.codes.dcv).toEqual(row.document.codes.dcv);
          expect(response.body.document.codes.det).toEqual(row.document.codes.det);
          expect(response.body.document.containerDeposit).toEqual(row.document.containerDeposit);
          expect(response.body.document.foreign).toBeDefined();
          expect(response.body.document.foreign.dni).toEqual(row.document.foreign.dni);
          expect(response.body.document.foreign.nationality).toEqual(row.document.foreign.nationality);
          expect(response.body.document.id).toEqual(row.document.id);
          expect(response.body.document.indicator).toBeDefined();
          expect(response.body.document.indicator.freeCharge).toEqual(row.document.indicator.freeCharge);
          expect(response.body.document.indicator.service).toEqual(row.document.indicator.service);
          expect(response.body.document.internalSII).toEqual(row.document.internalSII);
          expect(response.body.document.operation).toEqual(row.document.operation);
          expect(response.body.document.passage).toBeDefined();
          expect(response.body.document.passage.international).toEqual(row.document.passage.international);
          expect(response.body.document.passage.national).toEqual(row.document.passage.national);
          expect(response.body.document.period).toEqual(row.document.period);
          expect(response.body.document.receiver).toBeDefined();
          expect(response.body.document.receiver.code).toEqual(row.document.receiver.code);
          expect(response.body.document.receiver.description).toEqual(row.document.receiver.description);
          expect(response.body.document.reference).toBeDefined();
          expect(response.body.document.reference.id).toEqual(row.document.reference.id);
          expect(response.body.document.reference.type).toEqual(row.document.reference.type);
          expect(response.body.document.senderNote).toEqual(row.document.senderNote);
          expect(response.body.document.shippingIdentifier).toEqual(row.document.shippingIdentifier);
          expect(response.body.document.specialCredit).toEqual(row.document.specialCredit);
          expect(response.body.document.status).toEqual(row.document.status);
          expect(response.body.document.transaction).toBeDefined();
          expect(response.body.document.transaction.description).toEqual(row.document.transaction.description);
          expect(response.body.document.transaction.type).toEqual(row.document.transaction.type);
          expect(response.body.execute).toBeDefined();
          expect(response.body.execute.details).toEqual(row.execute.details);
          expect(response.body.execute.xml).toEqual(row.execute.xml);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.paying).toBeDefined();
          expect(response.body.paying.dv).toEqual(row.paying.dv);
          expect(response.body.paying.exemptAmount).toEqual(row.paying.exemptAmount);
          expect(response.body.paying.netAmount).toEqual(row.paying.netAmount);
          expect(response.body.paying.rut).toEqual(row.paying.rut);
          expect(response.body.paying.taxAmount).toEqual(row.paying.taxAmount);
          expect(response.body.send).toBeDefined();
          expect(response.body.send.execute).toEqual(row.send.execute);
          expect(response.body.send.error).toBeDefined();
          expect(response.body.send.error.code).toEqual(row.send.error.code);
          expect(response.body.send.error.message).toEqual(row.send.error.message);
          expect(response.body.send.pending).toEqual(row.send.pending);
          expect(response.body.tax).toBeDefined();
          expect(response.body.tax.amount).toEqual(row.tax.amount);
          expect(response.body.tax.amountFixedAsset).toEqual(row.tax.amountFixedAsset);
          expect(response.body.tax.amountNonRecoverable).toEqual(row.tax.amountNonRecoverable);
          expect(response.body.tax.codeNonRecoverable).toEqual(row.tax.codeNonRecoverable);
          expect(response.body.tax.commonUse).toEqual(row.tax.commonUse);
          expect(response.body.tax.notWithheld).toEqual(row.tax.notWithheld);
          expect(response.body.tax.outOfTime).toEqual(row.tax.outOfTime);
          expect(response.body.tax.own).toEqual(row.tax.own);
          expect(response.body.tax.partialRetention).toEqual(row.tax.partialRetention);
          expect(response.body.tax.rate).toEqual(row.tax.rate);
          expect(response.body.tax.thirdParties).toEqual(row.tax.thirdParties);
          expect(response.body.tax.totalRetention).toEqual(row.tax.totalRetention);
          expect(response.body.tax.totalTax).toEqual(row.tax.totalTax);
          expect(response.body.tax.totalTaxNonRecoverable).toEqual(row.tax.totalTaxNonRecoverable);
          expect(response.body.tax.type).toEqual(row.tax.type);
          expect(response.body.tax.vehicles).toEqual(row.tax.vehicles);
          expect(response.body.taxs).toBeDefined();
          if (Array.isArray(response.body.taxs)) {
            response.body.taxs.forEach((tax, keyTax) => {
              expect(tax.amount).toEqual(row.taxs[keyTax].amount);
              expect(tax.code).toEqual(row.taxs[keyTax].code);
              expect(tax.rate).toEqual(row.taxs[keyTax].rate);
            });
          }
          expect(response.body.transaction).toBeDefined();
          expect(response.body.transaction.queue).toBeDefined();
          expect(response.body.transaction.user).toEqual(row.transaction.user);
        } else if (response.statusCode === 400) {
          const error = errorResponse('update').response;
          expect(response.body).toBeDefined();
          expect(response.body.error).toBeDefined();
          expect(response.body.error.message).toEqual(error.message);
          expect(response.body.error.status).toEqual(error.status);
          expect(response.body.errorTrace).toBeDefined();
        }
      });
  }, 30000);
});

/**
 * Prueba del metodo Remove
 * URI: /sii/document/:id
 * Method: DELETE
 */
mocks.forEach(async (row) => {
  await test(`Prueba ${getCounter()} - Metodo /sii/document/:id (DELETE) [siiDocument.remove]`, async () => {
    await request().delete(`/sii/document/${row._id}`)
      .then((response) => {
        if (response.statusCode === 200) {
          expect(response.body).toBeDefined();
          expect(response.body.active).toEqual(row.active);
          expect(response.body.logs).toBeDefined();
          expect(response.body.amount).toBeDefined();
          expect(response.body.amount.changeLaw18211).toEqual(row.amount.changeLaw18211);
          expect(response.body.amount.exempt).toEqual(row.amount.exempt);
          expect(response.body.amount.fixedAsset).toEqual(row.amount.fixedAsset);
          expect(response.body.amount.net).toEqual(row.amount.net);
          expect(response.body.amount.notBillable).toEqual(row.amount.notBillable);
          expect(response.body.amount.period).toEqual(row.amount.period);
          expect(response.body.amount.tobaccoCigar).toEqual(row.amount.tobaccoCigar);
          expect(response.body.amount.tobaccoElaborated).toEqual(row.amount.tobaccoElaborated);
          expect(response.body.amount.tobaccoHavana).toEqual(row.amount.tobaccoHavana);
          expect(response.body.amount.total).toEqual(row.amount.total);
          expect(response.body.amount.withoutCredit).toEqual(row.amount.withoutCredit);
          expect(response.body.business).toBeDefined();
          expect(response.body.business.dv).toEqual(row.business.dv);
          expect(response.body.business.name).toEqual(row.business.name);
          expect(response.body.business.rut).toEqual(row.business.rut);
          expect(response.body.date).toBeDefined();
          expect(response.body.date.accuse).toEqual(row.date.accuse);
          expect(response.body.date.document).toEqual(row.date.document);
          expect(response.body.date.reception).toEqual(row.date.reception);
          expect(response.body.date.reclaimed).toEqual(row.date.reclaimed);
          expect(response.body.document).toBeDefined();
          expect(response.body.document.accountingStatement).toEqual(row.document.accountingStatement);
          expect(response.body.document.codeOffice).toEqual(row.document.codeOffice);
          expect(response.body.document.codeSII).toEqual(row.document.codeSII);
          expect(response.body.document.codes).toBeDefined();
          expect(response.body.document.codes.dcv).toEqual(row.document.codes.dcv);
          expect(response.body.document.codes.det).toEqual(row.document.codes.det);
          expect(response.body.document.containerDeposit).toEqual(row.document.containerDeposit);
          expect(response.body.document.foreign).toBeDefined();
          expect(response.body.document.foreign.dni).toEqual(row.document.foreign.dni);
          expect(response.body.document.foreign.nationality).toEqual(row.document.foreign.nationality);
          expect(response.body.document.id).toEqual(row.document.id);
          expect(response.body.document.indicator).toBeDefined();
          expect(response.body.document.indicator.freeCharge).toEqual(row.document.indicator.freeCharge);
          expect(response.body.document.indicator.service).toEqual(row.document.indicator.service);
          expect(response.body.document.internalSII).toEqual(row.document.internalSII);
          expect(response.body.document.operation).toEqual(row.document.operation);
          expect(response.body.document.passage).toBeDefined();
          expect(response.body.document.passage.international).toEqual(row.document.passage.international);
          expect(response.body.document.passage.national).toEqual(row.document.passage.national);
          expect(response.body.document.period).toEqual(row.document.period);
          expect(response.body.document.receiver).toBeDefined();
          expect(response.body.document.receiver.code).toEqual(row.document.receiver.code);
          expect(response.body.document.receiver.description).toEqual(row.document.receiver.description);
          expect(response.body.document.reference).toBeDefined();
          expect(response.body.document.reference.id).toEqual(row.document.reference.id);
          expect(response.body.document.reference.type).toEqual(row.document.reference.type);
          expect(response.body.document.senderNote).toEqual(row.document.senderNote);
          expect(response.body.document.shippingIdentifier).toEqual(row.document.shippingIdentifier);
          expect(response.body.document.specialCredit).toEqual(row.document.specialCredit);
          expect(response.body.document.status).toEqual(row.document.status);
          expect(response.body.document.transaction).toBeDefined();
          expect(response.body.document.transaction.description).toEqual(row.document.transaction.description);
          expect(response.body.document.transaction.type).toEqual(row.document.transaction.type);
          expect(response.body.execute).toBeDefined();
          expect(response.body.execute.details).toEqual(row.execute.details);
          expect(response.body.execute.xml).toEqual(row.execute.xml);
          expect(response.body.logs).toBeDefined();
          expect(response.body.logs.createdAt).toBeDefined();
          expect(response.body.logs.isDeleted).toEqual(!row.logs.isDeleted);
          expect(response.body.logs.test).toEqual(row.logs.test);
          expect(response.body.logs.updatedAt).toBeDefined();
          expect(response.body.paying).toBeDefined();
          expect(response.body.paying.dv).toEqual(row.paying.dv);
          expect(response.body.paying.exemptAmount).toEqual(row.paying.exemptAmount);
          expect(response.body.paying.netAmount).toEqual(row.paying.netAmount);
          expect(response.body.paying.rut).toEqual(row.paying.rut);
          expect(response.body.paying.taxAmount).toEqual(row.paying.taxAmount);
          expect(response.body.send).toBeDefined();
          expect(response.body.send.execute).toEqual(row.send.execute);
          expect(response.body.send.error).toBeDefined();
          expect(response.body.send.error.code).toEqual(row.send.error.code);
          expect(response.body.send.error.message).toEqual(row.send.error.message);
          expect(response.body.send.pending).toEqual(row.send.pending);
          expect(response.body.tax).toBeDefined();
          expect(response.body.tax.amount).toEqual(row.tax.amount);
          expect(response.body.tax.amountFixedAsset).toEqual(row.tax.amountFixedAsset);
          expect(response.body.tax.amountNonRecoverable).toEqual(row.tax.amountNonRecoverable);
          expect(response.body.tax.codeNonRecoverable).toEqual(row.tax.codeNonRecoverable);
          expect(response.body.tax.commonUse).toEqual(row.tax.commonUse);
          expect(response.body.tax.notWithheld).toEqual(row.tax.notWithheld);
          expect(response.body.tax.outOfTime).toEqual(row.tax.outOfTime);
          expect(response.body.tax.own).toEqual(row.tax.own);
          expect(response.body.tax.partialRetention).toEqual(row.tax.partialRetention);
          expect(response.body.tax.rate).toEqual(row.tax.rate);
          expect(response.body.tax.thirdParties).toEqual(row.tax.thirdParties);
          expect(response.body.tax.totalRetention).toEqual(row.tax.totalRetention);
          expect(response.body.tax.totalTax).toEqual(row.tax.totalTax);
          expect(response.body.tax.totalTaxNonRecoverable).toEqual(row.tax.totalTaxNonRecoverable);
          expect(response.body.tax.type).toEqual(row.tax.type);
          expect(response.body.tax.vehicles).toEqual(row.tax.vehicles);
          expect(response.body.taxs).toBeDefined();
          if (Array.isArray(response.body.taxs)) {
            response.body.taxs.forEach((tax, keyTax) => {
              expect(tax.amount).toEqual(row.taxs[keyTax].amount);
              expect(tax.code).toEqual(row.taxs[keyTax].code);
              expect(tax.rate).toEqual(row.taxs[keyTax].rate);
            });
          }
          expect(response.body.transaction).toBeDefined();
          expect(response.body.transaction.queue).toBeDefined();
          expect(response.body.transaction.user).toEqual(row.transaction.user);
        } else if (response.statusCode === 400) {
          const error = errorResponse('remove').response;
          expect(response.body).toBeDefined();
          expect(response.body.error).toBeDefined();
          expect(response.body.error.message).toEqual(error.message);
          expect(response.body.error.status).toEqual(error.status);
          expect(response.body.errorTrace).toBeDefined();
        }
      });
  }, 30000);
});

/**
 * Prueba del metodo List
 * URI: /sii/document
 * Method: GET
 */
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=3&page=1&order=desc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(3);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('desc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results.length).toEqual(3);
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=5&page=2&order=asc&logs=c,d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(2);
        expect(response.body.paging.total).toEqual(0);
        expect(response.body.results.length).toEqual(0);
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?short&limit=5&order=asc&logs=a,d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(5);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results.length).toEqual(5);
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?short&order=asc')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(100);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(0);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=-1&page=-1&order=asc')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(100);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(0);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=5&page=-1&order=asc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(5);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=-1&page=-1&order=asc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(6);
        expect(response.body.paging.limit).toEqual(100);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=3&page=-1&order=asc&logs=d,t&send')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(3);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(4);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=-2&page=-1&order=asc&logs=d,t&user=1-1')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(1);
        expect(response.body.paging.limit).toEqual(100);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(1);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=1&page=-1&order=asc&logs=d,t&type=details')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(1);
        expect(response.body.paging.limit).toEqual(1);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=5&page=-1&order=asc&logs=d,t&type=xml')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(5);
        expect(response.body.paging.limit).toEqual(5);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=2&page=-1&order=asc&logs=d,t&type')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(2);
        expect(response.body.paging.limit).toEqual(2);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=3&page=2&order=desc&logs=d,t')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(3);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('desc');
        expect(response.body.paging.page).toEqual(2);
        expect(response.body.paging.total).toEqual(6);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?limit=3&page=2&order=desc&logs')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(0);
        expect(response.body.paging.limit).toEqual(3);
        expect(response.body.paging.order).toEqual('desc');
        expect(response.body.paging.page).toEqual(2);
        expect(response.body.paging.total).toEqual(0);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document (LIST) [siiDocument.list]`, async () => {
  await request().get('/sii/document?page=1&logs=d,t&sync&pending')
    .then((response) => {
      if (response.statusCode === 200) {
        expect(response.body).toBeDefined();
        expect(response.body.paging.count).toEqual(4);
        expect(response.body.paging.limit).toEqual(150);
        expect(response.body.paging.order).toEqual('asc');
        expect(response.body.paging.page).toEqual(1);
        expect(response.body.paging.total).toEqual(4);
        expect(response.body.results).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('list').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);

/**
 * Prueba del metodo Multiple
 * URI: /sii/document
 * Method: POST
 */
test(`Prueba ${getCounter()} - Metodo /sii/document/multiple (POST) [siiDocument.multiple]`, async () => {
  counter += 1;
  const list = [mocks[0], mocks[1]];
  list[0]._id = mongoose.Types.ObjectId();
  list[0].business.rut = 11;
  list[0].document.code = 11;
  list[0].document.id = 11;
  list[1]._id = mongoose.Types.ObjectId();
  list[1].business.rut = 12;
  list[1].document.code = 12;
  list[1].document.id = 12;
  await request().post('/sii/document/multiple').send(list)
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('create').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document/multiple (POST) [siiDocument.multiple]`, async () => {
  counter += 1;
  const list = [mocks[2], mocks[3]];
  list[0]._id = mongoose.Types.ObjectId();
  list[0].business.rut = 13;
  list[0].document.code = 13;
  list[0].document.id = 13;
  list[1]._id = mongoose.Types.ObjectId();
  list[1].business.rut = 14;
  list[1].document.code = 14;
  list[1].document.id = 14;
  await request().post('/sii/document/multiple').send(list)
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('create').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document/multiple (POST) [siiDocument.multiple]`, async () => {
  counter += 1;
  const list = [mocks[4], mocks[5]];
  list[0]._id = mongoose.Types.ObjectId();
  list[0].business.rut = 15;
  list[0].document.code = 15;
  list[0].document.id = 15;
  list[1]._id = mongoose.Types.ObjectId();
  list[1].business.rut = 16;
  list[1].document.code = 16;
  list[1].document.id = 16;
  await request().post('/sii/document/multiple').send(list)
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('create').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document/multiple (POST) [siiDocument.multiple]`, async () => {
  counter += 1;
  const list = [mocks[6], mocks[7]];
  list[0]._id = mongoose.Types.ObjectId();
  list[0].business.rut = 17;
  list[0].document.code = 17;
  list[0].document.id = 17;
  list[1]._id = mongoose.Types.ObjectId();
  list[1].business.rut = 18;
  list[1].document.code = 18;
  list[1].document.id = 18;
  await request().post('/sii/document/multiple').send(list)
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('create').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
test(`Prueba ${getCounter()} - Metodo /sii/document/multiple (POST) [siiDocument.multiple]`, async () => {
  counter += 1;
  const list = [mocks[8], mocks[9]];
  list[0]._id = mongoose.Types.ObjectId();
  list[0].business.rut = 19;
  list[0].document.code = 19;
  list[0].document.id = 19;
  list[1]._id = mongoose.Types.ObjectId();
  list[1].business.rut = 20;
  list[1].document.code = 20;
  list[1].document.id = 20;
  await request().post('/sii/document/multiple').send(list)
    .then((response) => {
      if (response.statusCode === 201) {
        expect(response.body).toBeDefined();
      } else if (response.statusCode === 400) {
        const error = errorResponse('create').response;
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toEqual(error.message);
        expect(response.body.error.status).toEqual(error.status);
        expect(response.body.errorTrace).toBeDefined();
      }
    });
}, 30000);
