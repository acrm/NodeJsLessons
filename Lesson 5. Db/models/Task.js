const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name:  String,
  creationDate: { type: Date, default: Date.now },
  dueDate: { type: Date, default: () => {
      const today = new Date(Date.now());
      const tomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1,
        today.getHours(),
        today.getMinutes(), 
        today.getSeconds()
      );
      return tomorrow;
    }
  },
  completeDate: Date,
  done: {type: Boolean, default: false}
});

taskSchema.methods.postpone = function() {
  this.dueDate.setDay(this.dueDate.getDays() + 1);
};

taskSchema.methods.complete = function() {
  this.done = true;
  this.completeDate = Date.now();
};

taskSchema.methods.toDto = function() {
  return {
    id: this._id,
    name: this.name,
    creationDate: this.creationDate,
    dueDate: this.dueDate,
    done: this.done
  };
}

module.exports = mongoose.model('Task', taskSchema);
