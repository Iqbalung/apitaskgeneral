const { authenticate } = require('@feathersjs/authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks
const validateRole = require('../../hooks/validation-create-role.hook');
const populateUser = require('../../hooks/populate-user');
const accountService = require('../authmanagement/notifier')

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), verifyHooks.addVerification() ],
    update: [ authenticate('jwt'), hashPassword('password'), ],
    patch: [ authenticate('jwt'), hashPassword('password'), ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [
      context => accountService(context.app).notifier('resendVerifySignup', context.result),
      verifyHooks.removeVerification()
    ],
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
