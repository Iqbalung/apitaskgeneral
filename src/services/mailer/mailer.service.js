// Initializes the `mailer` service on path `/mailer`
const hooks = require('./mailer.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use('/mailer', Mailer(smtpTransport({
    host: app.get('smtp').host,
    port: app.get('smtp').port,
    auth: {
      user: app.get('smtp').user,
      pass: app.get('smtp').pass
    }
  })));

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
};
