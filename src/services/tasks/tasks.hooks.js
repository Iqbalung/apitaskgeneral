const { authenticate } = require('@feathersjs/authentication').hooks;
const validate = require('../../hooks/validation.hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [validate()],
    get: [validate()],
    create: [],
    update: [validate()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
