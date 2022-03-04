const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const engine = require('./engine/engine.service.js');
const tasks = require('./tasks/tasks.service.js');
const bank = require('./bank/bank.service.js');
const debt = require('./debt/debt.service.js');
const incidents = require('./incidents/incidents.service.js');
const logactivity = require('./logactivity/logactivity.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');
const mailer = require('./mailer/mailer.service.js');
const organization = require('./organization/organization.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(engine);
  app.configure(tasks);
  app.configure(bank);
  app.configure(debt);
  app.configure(incidents);
  app.configure(logactivity);
  app.configure(authmanagement);
  app.configure(mailer);
  app.configure(organization);
};
