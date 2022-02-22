// Initializes the `bank` service on path `/bank`
const { Debt } = require('./debt.class');
const createModel = require('../../models/debt.model');
const hooks = require('./debt.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    events: ['create','update','patch'],
    whitelist: ['$text','$search', '$regex'],
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/debt', new Debt(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('debt');

  service.on('created', (service, context) => console.log('debt'));
  // A reference to a handler
  const onCreatedListener = message => service;

  service.on('created', onCreatedListener);
  service.emit('created', onCreatedListener);
  service.on('updated', onCreatedListener);
  service.emit('updated', onCreatedListener);
  service.on('patched', onCreatedListener);
  service.emit('patched', onCreatedListener);

  service.on('connection', function (socket) {

    //Socket Routes
    socket.on('created', function(service){
      console.log(service);

      io.emit('created', service);
      socket.emit('created', service);
    });
    socket.on('updated', function(service){
      console.log(service);

      io.emit('updated', service);
      socket.emit('updated', service);
    });
    socket.on('patched', function(service){
      console.log(service);

      io.emit('patched', service);
      socket.emit('patched', service);
    });

    console.log('connected');
  });

  app.service('debt').hooks({
    after: {
      create(context) {
        service.emit('created', onCreatedListener);
      },
      update(context) {
        service.emit('updated', onCreatedListener);
      },
      patch(context) {
        service.emit('patched', onCreatedListener);
      }
    }
  });

  service.hooks(hooks);
};
