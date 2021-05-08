const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const scheduledMessageSchema = mongoose.Schema(
    {
      groupname: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      senddate: {
        type: Date,
        required: true,
      },
    },
    { timestamps: true }
);

scheduledMessageSchema.plugin(toJSON);
scheduledMessageSchema.plugin(paginate);

const MessageGroup = mongoose.model('scheduledMessage', scheduledMessageSchema);

module.exports = MessageGroup;