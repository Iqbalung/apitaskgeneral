// Initializes the `bank` service on path `/bank`
const { Debt } = require('./debt.class');
const createModel = require('../../models/debt.model');
const hooks = require('./debt.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/debt', new Debt(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('debt');

  service.hooks(hooks);
};
