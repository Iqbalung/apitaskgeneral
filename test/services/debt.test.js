const assert = require('assert');
const app = require('../../src/app');

describe('\'debt\' service', () => {
  it('registered the service', () => {
    const service = app.service('debt');

    assert.ok(service, 'Registered the service');
  });
});
