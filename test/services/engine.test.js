const assert = require('assert');
const app = require('../../src/app');

describe('\'engine\' service', () => {
  it('registered the service', () => {
    const service = app.service('engine');

    assert.ok(service, 'Registered the service');
  });
});
