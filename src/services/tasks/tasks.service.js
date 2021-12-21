// Initializes the `tasks` service on path `/tasks`
const { Tasks } = require('./tasks.class');
const createModel = require('../../models/tasks.model');
const hooks = require('./tasks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    events: ['create','update','patch'],
    whitelist: ['$text','$search'],
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tasks', new Tasks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tasks');

  service.on('created', (service, context) => console.log("tes"));
  // A reference to a handler
  const onCreatedListener = message => service;

  // Listen `created` with a handler reference
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
        })
        socket.on('updated', function(service){
            console.log(service);

        io.emit('updated', service);
        socket.emit('updated', service);
        })
        socket.on('patched', function(service){
            console.log(service);

        io.emit('patched', service);
        socket.emit('patched', service);
        })

        console.log('connected');
    })

    app.service('tasks').hooks({
      after: {
        create(context) {
          service.emit('created', onCreatedListener);
        },
        create(context) {
          service.emit('updated', onCreatedListener);
        },
        create(context) {
          service.emit('patched', onCreatedListener);
        }
      }
    });


  service.hooks(hooks);
};
