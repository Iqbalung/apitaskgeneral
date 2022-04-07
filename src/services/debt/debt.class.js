const { Service } = require('feathers-mongoose');
const momentTz = require('moment-timezone');

exports.Debt = class Debt extends Service {
  async find(params) {
    if (params.query.date_crawl) {
        params.query.date_crawl = {
          '$gte': momentTz(params.query.date_crawl.$gte).tz('Asia/Jakarta').format(),
          '$lte': momentTz(params.query.date_crawl.$lte).tz('Asia/Jakarta').format()
        }
    }
    if (params.query['account_receiver']) {
      params.query['account_receiver'] = { $regex: new RegExp(params.query['account_receiver'], 'i') };
    } else {
      delete params.query['account_receiver'];
    }

    if (params.query['account_sender']) {
      params.query['account_sender'] = { $regex: new RegExp(params.query['account_sender'], 'i') };
    } else {
      delete params.query['account_sender'];
    }

    if (params.query['amount']) {
      params.query['amount'] = parseInt(params.query['amount']);
    } else {
      delete params.query['amount'];
    }

    return super.find(params);
  }

  async create(params) {
    params.createdAt = momentTz().add(7, 'hours').format();
    params.updatedAt = momentTz().add(7, 'hours').format();
    return super.create(params);
  }
};
