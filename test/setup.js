var assert = require('assert')
  , Setup = require('../lib').setup
  ;

describe('Setup', function () {
  it('should initialize with environment variables when no parameters are given', function (done){
    var setup = new Setup();
    assert.strictEqual(setup.config['PAYDUNYA-MASTER-KEY'], process.env.PAYDUNYA_MASTER_KEY);
    assert.strictEqual(setup.config['PAYDUNYA-PRIVATE-KEY'], process.env.PAYDUNYA_PRIVATE_KEY);
    // assert.strictEqual(setup.config['PAYDUNYA-PUBLIC-KEY'], process.env.PAYDUNYA_PUBLIC_KEY);
    assert.strictEqual(setup.config['PAYDUNYA-TOKEN'], process.env.PAYDUNYA_TOKEN);
    done();
  });

  it('should initialize with given data', function (done){
    var setup = new Setup({
      masterKey: 'master',
      privateKey: 'private',
      publicKey: 'public',
      token: 'token'
    });
    assert.strictEqual(setup.config['PAYDUNYA-MASTER-KEY'], 'master');
    assert.strictEqual(setup.config['PAYDUNYA-PRIVATE-KEY'], 'private');
    // assert.strictEqual(setup.config['PAYDUNYA-PUBLIC-KEY'], 'public');
    assert.strictEqual(setup.config['PAYDUNYA-TOKEN'], 'token');
    done();
  });

  it('should set to sandbox base url as endpoint in test mode', function (done){
    var setup = new Setup({mode: 'test'});
    assert.strictEqual(setup.baseURL, 'https://app.paydunya.com/sandbox-api/v1');
    done();
  });

  it('should set live baseURL when mode !== "test"', function (done){
    var setup = new Setup();
    assert.strictEqual(setup.baseURL, 'https://app.paydunya.com/api/v1');
    done();
  });
});
