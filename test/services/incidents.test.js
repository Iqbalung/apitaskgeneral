const assert = require('assert');
const app = require('../../src/app');

describe('\'incidents\' service', () => {
  it('registered the service', () => {
    const service = app.service('incidents');

    assert.ok(service, 'Registered the service');
  });
});
