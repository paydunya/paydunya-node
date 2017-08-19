var assert = require('assert')
  , Invoice = require('../lib/invoice')
  , paydunya = require('../lib')
  , Setup = paydunya.Setup
  , Store = paydunya.Store
  ;

describe('Invoice', function (){

  describe('#addItem()', function () {
    it('should add item to invoice', function (done){
      var setup = new Setup({mode: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra'});
      var invoice = new Invoice(setup, store);
      invoice.addItem('iPhone', 1, 5000, 5000, 'apple gadget');
      assert.strictEqual(invoice.items.item_1.name, 'iPhone');
      assert.strictEqual(invoice.items.item_1.quantity, 1);
      assert.strictEqual(invoice.items.item_1.unit_price, 5000);
      assert.strictEqual(invoice.items.item_1.total_price, 5000);
      assert.strictEqual(invoice.items.item_1.description, 'apple gadget');

      //add another item
      invoice.addItem('Galaxy Phone', 1, 400000, 400000);
      assert.strictEqual(invoice.items.item_2.name, 'Galaxy Phone');
      done();
    });
  });

  describe('#addTax()', function () {
    it('should add tax with valid parameters', function (done){
      var setup = new Setup({made: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra', returnURL: 'http://ma-super-boutique.com/callback'});
      var invoice = new Invoice(setup, store);
      invoice.addTax('TVA', 18);
      assert.strictEqual(invoice.taxes.tax_1.name, 'TVA');
      assert.strictEqual(invoice.taxes.tax_1.amount, 18);
      done();
    });
  });

  describe('#addChannel()', function () {
    it('should add channel with valid parameters', function (done){
      var setup = new Setup({made: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra', returnURL: 'http://ma-super-boutique.com/callback'});
      var invoice = new Invoice(setup, store);
      invoice.addChanel('wari');
      invoice.addChanel('orange-money-senegal');
      assert.strictEqual(invoice.channels[0], 'wari');
      assert.strictEqual(invoice.channels[1], 'orange-money-senegal');
      done();
    });
  });

  describe('#addChannels()', function () {
    it('should add channels with valid parameters', function (done){
      var setup = new Setup({made: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra', returnURL: 'http://ma-super-boutique.com/callback'});
      var invoice = new Invoice(setup, store);
      invoice.addChanels(['wari', 'orange-money-senegal', 'card']);
      assert.strictEqual(invoice.channels[0], 'wari');
      assert.strictEqual(invoice.channels[1], 'orange-money-senegal');
      assert.strictEqual(invoice.channels[2], 'card');
      done();
    });
  });

  describe('#addCustomData', function () {
    it('should add custom data', function (done){
      var setup = new Setup({made: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra'});
      var invoice = new Invoice(setup, store);
      invoice.addCustomData('size', 'large');
      assert.strictEqual(invoice.customData.size, 'large');
      done();
    });
  });

  describe('#generateRequestBody()', function () {
    it('should fail with invalid parameters', function (done) {
      var setup = new Setup({made: 'test'});
      var store = new Store({name: 'Magasin Chez Sandra', returnURL: 'http://ma-super-boutique.com/callback'});
      var invoice = new Invoice(setup, store);
      assert.throws(function () {
        invoice.generateRequestBody();
      });
      invoice.totalAmount = 50000;
      assert.doesNotThrow(function () {
        invoice.generateRequestBody();
      });
      invoice.addTax('TVA', 18);
      invoice.addCustomData('size', 'large');
      var body = invoice.generateRequestBody();
      assert.strictEqual(body.invoice.total_amount, 50000);
      assert.strictEqual(body.store.name, 'Magasin Chez Sandra');
      assert.strictEqual(body.actions.return_url, 'http://ma-super-boutique.com/callback');
      assert.strictEqual(body.invoice.taxes.tax_1.name, 'TVA');
      assert.strictEqual(body.invoice.taxes.tax_1.amount, 18);
      assert.strictEqual(body.custom_data.size, 'large');
      done();
    });
  });

});
