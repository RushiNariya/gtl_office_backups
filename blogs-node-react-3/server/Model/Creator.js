import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const creatorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profession: Schema.Types.String,
  role: Schema.Types.String,
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'Invalid email.',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Creator', creatorSchema);
