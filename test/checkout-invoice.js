var assert = require('assert')
  , Invoice = require('../lib/invoice')
  , paydunya = require('../lib')
  , Setup = paydunya.Setup
  , Store = paydunya.Store
  , CheckoutInvoice = paydunya.CheckoutInvoice
  ;

describe('CheckoutInvoice', function () {
  describe('#create()', function () {
    it('should work with valid initialization and total amount', function (done){
      this.timeout(15000);
      var setup = new Setup({mode: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra'});
      var invoice = new CheckoutInvoice(setup, store);
      invoice.totalAmount = 1000;

      invoice.create()
        .then(function () {
          assert.ok(invoice.url);
          assert.ok(invoice.token);
          done();
        });
    });
  });

  describe('#confirm', function () {
    it('should confirm completed token', function (done){
      this.timeout(10000);
      var setup = new Setup({mode: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra'});
      var invoice = new CheckoutInvoice(setup, store);
      invoice.confirm('test_449a6fef1a')
        .then(function () {
          assert.ok(invoice.customer);
          assert.ok(invoice.receiptURL);
          done();
        })
    });
  });
});