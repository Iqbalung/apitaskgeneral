const { Service } = require('feathers-mongoose');
const momentTz = require('moment-timezone')
exports.Tasks = class Tasks extends Service {
    async find(params) {
        if (params.query.createdAt) {
            params.query.createdAt = {
              '$gte': new Date(params.query.createdAt.$gte).toISOString(),
              '$lte': new Date(params.query.createdAt.$lte).toISOString()
            }
        }

        if (params.query.userId) {
            params.query['taskData.userId'] = { $regex: new RegExp(params.query.userId, 'i') }
            delete params.query.userId
        } else {
            delete params.query.userId
        }

        if (params.query['taskData.account_number']) {
            params.query['taskData.account_number'] = { $regex: new RegExp(params.query['taskData.account_number'], 'i') }
        } else {
            delete params.query['taskData.account_number']
        }

        if (params.query['taskData.anRekening']) {
            params.query['taskData.anRekening'] = { $regex: new RegExp(params.query['taskData.anRekening'], 'i') }
        } else {
            delete params.query['taskData.anRekening']
        }

        if (params.query['taskData.bank_type']) {
            params.query['taskData.bank_type'] = { $regex: new RegExp(params.query['taskData.bank_type'], 'i') }
        } else {
            delete params.query['taskData.bank_type']
        }

        if (params.query['taskData.amount']) {
            params.query['taskData.amount'] = parseInt(params.query['taskData.amount'])
        } else {
            delete params.query['taskData.amount']
        }

        if (params.query['taskAssigne']) {
          params.query['taskAssigne'] = { $regex: new RegExp(params.query['taskAssigne'], 'i') }
        } else {
          delete params.query['taskAssigne']
        }

        return super.find(params)
    }

    async create(params) {

        params.createdAt = momentTz().add(7, 'hours').format()
      params.updatedAt = momentTz().add(7, 'hours').format()
        console.log("create",params);
        return super.create(params)
    }

    async put(params) {
    params.updatedAt = momentTz().add(7, 'hours').format()
      console.log("put",params);
      return super.create(params)
  }

  async patch(params) {

  params.updatedAt = momentTz().add(7, 'hours').format()
    console.log("patch",params);
    return super.create(params)
}
};
