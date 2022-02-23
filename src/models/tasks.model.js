// tasks-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'tasks';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const schema = new Schema({
    taskTittle: { type: String, required: true },
    taskRefNumber: { type: String, required: true, unique:true },
    taskAssigne: { type: String },
    taskStatus: { type: String, required: true },
    taskExpiredTime: { type: Date },
    taskTimeProcess: {type: Date},
    createdAt: {type: Date},
    taskSlaTime: { type: Number},
    taskHistory: { type: Array },
    userId: { type: String },
    taskData: { type: Object },
    accountFrom: {type: Object },
    updatedAt: {type: Date},
    taskCreatedBy:{ type:String , required:true }
  });

  schema.path('taskTittle').index({text:true});

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
