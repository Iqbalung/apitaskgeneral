// Initializes the `bank` service on path `/bank`
const { JobRecon } = require('./jobrecon.class');
const createModel = require('../../models/jobrecon.model');
const hooks = require('./jobrecon.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    events: ['create','update','patch'],
    whitelist: ['$text','$search', '$regex'],
    paginate: app.get('paginate'),
    useEstimatedDocumentCount: true
  };

  // Initialize our service with any options it requires
  app.use('/jobrecon', new JobRecon(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('jobrecon');

  service.hooks(hooks);
};
