// Initializes the `bank` service on path `/bank`
const { Bank } = require('./bank.class');
const createModel = require('../../models/bank.model');
const hooks = require('./bank.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bank', new Bank(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bank');

  service.hooks(hooks);
};
