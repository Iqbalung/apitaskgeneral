const { authenticate } = require('@feathersjs/authentication').hooks;
const validate = require('../../hooks/validation.hooks');
const populateTask = require('../../hooks/populate-task');
const sendevent = require('../../hooks/send-event')
const search = require('feathers-mongodb-fuzzy-search');
const momentTz = require('moment-timezone')

const changeTimezone = momentTz().tz('Asia/Jakarta').format()

module.exports = {
  before: {
    all: [ authenticate('jwt'),search({fields:'taskTittle'}), context => {
      const method = context.method

      if (['create', 'update', 'patch'].includes(method)) {
        context.data.taskExpiredTime = momentTz().tz('Asia/Jakarta').format()
        context.data.taskTimeProcess = momentTz().tz('Asia/Jakarta').format()
      }

      return context
    } ],
    find: [validate()],
    get: [validate()],
    create: [ context => {
      context.data.createdAt = momentTz().tz('Asia/Jakarta').format()
      context.data.updatedAt = momentTz().tz('Asia/Jakarta').format()

      return context
     } ],
    update: [validate(), context => {
      context.data.updatedAt = momentTz().tz('Asia/Jakarta').format()

      return context
    } ],
    patch: [context => {
      context.data.updatedAt = momentTz().tz('Asia/Jakarta').format()

      return context
    } ],
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
