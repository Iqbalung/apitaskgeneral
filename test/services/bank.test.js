const assert = require('assert');
const app = require('../../src/app');

describe('\'bank\' service', () => {
  it('registered the service', () => {
    const service = app.service('bank');

    assert.ok(service, 'Registered the service');
  });
});
