/* eslint-disable no-empty */
const roles = [
  {
    'type': 'admin',
    'permissions': ['users:*', 'tasks:*']
  },
  {
    'type': 'worker',
    'permissions': ['tasks:get','tasks:update','tasks:find']}
];
module.exports = function () {
  return function (hook){
    if(!hook.params.provider) {
      return hook;
    }

    var role = hook.params.user.role;
    var permission = null;
    var can = false;
    roles.forEach(element => {
      if (element.type === role) {
        element.permissions.forEach(element => {
          permission = element.split(':');
          if (permission[0] == hook.path && permission[1] == '*') {
            can = true;
          } else if (permission[0] == hook.path && permission[1] == hook.method) {
            can = true;
          }
        });
      }
    });
    if(can === false)
      throw new Error('You not allowed access this method');
    if(hook.params.user.status === 0)
      throw new Error('Your account Expired');

  };
};
