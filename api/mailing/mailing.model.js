// Declare dependencies
const mongoose = require('mongoose');

// Setting model
const MailingSchema = new mongoose.Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  execute: {
    datetime: {
      default: null,
      type: Date,
    },
    send: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
  },
  logs: {
    createdAt: {
      default: new Date(),
      required: true,
      type: Date,
    },
    isDeleted: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
    test: {
      default: false,
      index: true,
      required: true,
      type: Boolean,
    },
    updatedAt: {
      default: null,
      type: Date,
    },
  },
  mail: {
    from: {
      required: true,
      trim: true,
      type: String,
    },
    html: {
      default: '',
      trim: true,
      type: String,
    },
    subject: {
      required: true,
      trim: true,
      type: String,
    },
    text: {
      default: '',
      trim: true,
      type: String,
    },
    to: {
      required: true,
      trim: true,
      type: String,
    },
  },
  type: {
    enum: ['LassPassword', 'Recover', 'Register', 'ValidateAccount'],
    index: true,
    required: true,
    trim: true,
    type: String,
  },
});

// Add index search (FullText)
MailingSchema.index({
  'mail.from': 'text',
  'mail.to': 'text',
  type: 'text',
}, {
  weights: {
    'mail.from': 3,
    'mail.to': 3,
    type: 5,
  },
});

// Export model Mailing
module.exports = mongoose.model('Mailing', MailingSchema);
