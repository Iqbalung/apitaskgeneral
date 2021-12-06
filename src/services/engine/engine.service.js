// Initializes the `engine` service on path `/engine`
const { Engine } = require('./engine.class');
const createModel = require('../../models/engine.model');
const hooks = require('./engine.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/engine', new Engine(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('engine');

  service.hooks(hooks);
};
