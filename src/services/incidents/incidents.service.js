// Initializes the `bank` service on path `/bank`
const { Incidents } = require('./incidents.class');
const createModel = require('../../models/incidents.model');
const hooks = require('./incidents.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/incidents', new Incidents(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('incidents');

  service.hooks(hooks);
};
