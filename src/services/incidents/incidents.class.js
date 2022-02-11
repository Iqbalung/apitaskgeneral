const { Service } = require('feathers-mongoose');
const momentTz = require('moment-timezone');
exports.Incidents = class Incidents extends Service {
  async find(params) {
    if (params.query.mutation_id) {
      params.query.refNumber = { $regex: new RegExp(params.query.mutation_id, 'i') }
    }

    return super.find(params)
  }

  async create(params) {

    params.createdAt = momentTz().add(7, 'hours').format();
    params.updatedAt = momentTz().add(7, 'hours').format();
    return super.create(params);
}
};
