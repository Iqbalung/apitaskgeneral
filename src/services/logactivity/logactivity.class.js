const { Service } = require('feathers-mongoose');
const momentTz = require('moment-timezone');

exports.Logactivity = class Logactivity extends Service {
  async find(params) {
    return super.find(params);
  }

  async create(params) {
    params.createdAt = momentTz().add(7, 'hours').format();
    params.updatedAt = momentTz().add(7, 'hours').format();
    return super.create(params);
  }
};
