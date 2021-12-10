// Initializes the `tasks` service on path `/tasks`
const { Tasks } = require('./tasks.class');
const createModel = require('../../models/tasks.model');
const hooks = require('./tasks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    events: ['create'],
    // paginate: app.get('paginate')
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

  service.emit('created', onCreatedListener)

  service.on('connection', function (socket) {

        //Socket Routes
        socket.on('created', function(service){
            console.log(service);

        io.emit('created', service);
        socket.emit('created', service);
        })

        console.log('connected');
    })

    app.service('tasks').hooks({
      after: {
        create(context) {
          service.emit('created', onCreatedListener);
        }
      }
    });


  service.hooks(hooks);
};
