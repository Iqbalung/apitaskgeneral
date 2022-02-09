const { Service } = require('feathers-mongoose');
const momentTz = require('moment-timezone');
exports.Incidents = class Incidents extends Service {
  async create(params) {

    params.createdAt = momentTz().add(7, 'hours').format();
    params.updatedAt = momentTz().add(7, 'hours').format();
    return super.create(params);
}
};
