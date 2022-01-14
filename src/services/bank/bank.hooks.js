const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [context => {
      context.data.password = context.data.password.toString()
      
      return context
    }, hashPassword('password')],
    update: [hashPassword('password')],
    patch: [hashPassword('password')],
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
