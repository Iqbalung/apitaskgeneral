module.exports = function (options = {}) {
  return async context => {
    context.service.emit('created', { hello: 'world' });

    return context;
  };
};
