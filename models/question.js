
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;