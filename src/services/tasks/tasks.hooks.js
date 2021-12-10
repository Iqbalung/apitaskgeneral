const { authenticate } = require('@feathersjs/authentication').hooks;
const validate = require('../../hooks/validation.hooks');
const populateTask = require('../../hooks/populate-task');
const sendevent = require('../../hooks/send-event')

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
    create: [sendevent()],
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
