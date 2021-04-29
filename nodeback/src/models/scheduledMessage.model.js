const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const scheduledMessageSchema = mongoose.Schema(
    {
      groupname: String,
      subject: String,
      content: String,
      senddate: Date,
    },
    { timestamps: true }
);

scheduledMessageSchema.plugin(toJSON);
scheduledMessageSchema.plugin(paginate);

const MessageGroup = mongoose.model('scheduledMessage', scheduledMessageSchema);

module.exports = MessageGroup;