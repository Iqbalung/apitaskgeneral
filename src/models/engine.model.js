// engine-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'engine';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    taskTittle: { type: String, required: true },
    taskRefNumber: { type: String, required: true },
    taskAssigne: { type: String, required: true },
    taskStatus: { type: String, required: true },
    taskExpiredTime: { type: Date, required: true },
    taskSlaTime: { type: Date, required: true },
    taskHistory: { type: Array },
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
