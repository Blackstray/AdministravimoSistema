const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const cron = require('node-cron');
const scheduledMessagesController = require("./controllers/scheduledMessage.controller");
const { emailService } = require('./services');
const { ScheduledMessage, MessageGroup, User } = require('./models');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

//runs this code everyday at 8:30 AM
cron.schedule('30 8 * * *', async () => {
    const scheduledMessages = await ScheduledMessage.find({});
    const currentDate = new Date();
    for(var i = 0; i < scheduledMessages.length; i++) {
    if(scheduledMessages[i].senddate < currentDate) {
      //console.log("Time to send messages");
      var messageGroup = await MessageGroup.find({ name: scheduledMessages[i].groupname });
      //console.log(messageGroup[0].members);
      var emails = [];
      for(var a = 0; a < messageGroup[0].members.length; a++) {
        var user = await User.findById(messageGroup[0].members[a]).exec();
        emails.push(user.email);
        //console.log(user);
        //emailService.sendEmail(user.email, scheduledMessages[i].subject, scheduledMessages[i].content);
      }
      //console.log(emails);
      emailService.sendEmail(emails, scheduledMessages[i].subject, scheduledMessages[i].content);
    }
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
