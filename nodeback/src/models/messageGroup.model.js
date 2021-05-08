const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageGroupSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      members: [],
    },
    { timestamps: true },
    { collection: 'messageGroups' }
);

messageGroupSchema.plugin(toJSON);
messageGroupSchema.plugin(paginate);

const MessageGroup = mongoose.model('messageGroup', messageGroupSchema);

module.exports = MessageGroup;
