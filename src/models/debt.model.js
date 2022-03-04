// debt-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'debt';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const schema = new Schema({
    mutationId: { type: String},
    account_receiver: { type: String},
    account_sender: { type: String},
    amount: { type: Number },
    date: {type: String},
    date_crawl: {type: Date},
    ib: {type: Object},
    index: {type: Number},
    payload: {type: Object},
    status: {type: String},
    organization_id: { type: Schema.Types.ObjectId, ref: 'organizations' }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
