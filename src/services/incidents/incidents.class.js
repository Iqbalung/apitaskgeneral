const { Service } = require('feathers-mongoose');
const momentTz = require('moment-timezone');
exports.Incidents = class Incidents extends Service {
  async find(params) {
    if (params.query['detailData.account_receiver']) {
      params.query['detailData.account_receiver'] = { $regex: new RegExp(params.query['detailData.account_receiver'], 'i') };
    } else {
      delete params.query['detailData.account_receiver'];
    }

    if (params.query['detailData.account_sender']) {
      params.query['detailData.account_sender'] = { $regex: new RegExp(params.query['detailData.account_sender'], 'i') };
    } else {
      delete params.query['detailData.account_sender'];
    }

    if (params.query['detailData.amount']) {
      params.query['detailData.amount'] = parseInt(params.query['detailData.amount']);
    } else {
      delete params.query['detailData.amount'];
    }

    return super.find(params);
  }
  async create(params) {

    params.createdAt = momentTz().add(7, 'hours').format();
    params.updatedAt = momentTz().add(7, 'hours').format();
    return super.create(params);
  }
};
