// tasks-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'tasks';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const schema = new Schema({
    taskTittle: { type: String },
    taskRefNumber: { type: String },
    taskAssigne: { type: String },
    taskStatus: { type: String },
    taskExpiredTime: { type: Date },
    taskSlaTime: { type: Date },
    taskHistory: { type: Object },
    taskCreatedBy:{ type:String }
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
