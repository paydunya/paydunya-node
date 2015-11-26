var assert = require('assert')
  , Store = require('../lib').store
  ;

describe('Store', function () {
  it('should not initialize without required parameters', function (done){
    assert.throws(function () {new Store()});
    done();
  });

  it('should initialize without error when name is initialized', function (done){
    assert.doesNotThrow(function () {new Store({name: 'Magasin Chez Sandra'})});
    done();
  });

  it('should set values on initialize', function (done){
    var data = {
      name: 'Magasin Chez Sandra',
      tagline: "L'élégance n'a pas de prix",
      phoneNumber: '336530583',
      postalAddress: 'Dakar Plateau - Etablissement kheweul'
    };
    var store = new Store(data);

    assert.strictEqual(store.name, data.name);
    assert.strictEqual(store.tagline, data.tagline);
    assert.strictEqual(store.phone_number, data.phoneNumber);
    assert.strictEqual(store.postal_address, data.postalAddress);
    done();
  });
});