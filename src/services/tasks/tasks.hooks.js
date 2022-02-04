const { authenticate } = require('@feathersjs/authentication').hooks;
const validate = require('../../hooks/validation.hooks');
const populateTask = require('../../hooks/populate-task');
const sendevent = require('../../hooks/send-event')
const search = require('feathers-mongodb-fuzzy-search');
const momentTz = require('moment-timezone')

const changeTimezone = momentTz(date).tz('Asia/Jakarta').format()

module.exports = {
  before: {
    all: [ authenticate('jwt'),search({fields:'taskTittle'}), context => {
      const method = context.method

      if (['create', 'update', 'patch'].includes(method)) {
        context.data.taskExpiredTime = changeTimezone(context.data.taskExpiredTime)
        context.data.taskTimeProcess = changeTimezone(context.data.taskTimeProcess)
      }

      return context
    } ],
    find: [validate()],
    get: [validate()],
    create: [ context => {
      context.data.createdAt = changeTimezone(new Date)
      context.data.updatedAt = changeTimezone(new Date)

      return context
     } ],
    update: [validate(), context => {
      context.data.updatedAt = changeTimezone(new Date)

      return context
    } ],
    patch: [context => {
      context.data.updatedAt = changeTimezone(new Date)

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
