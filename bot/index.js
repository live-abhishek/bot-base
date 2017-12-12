var builder = require('botbuilder');
var logger = require('../bunyan').logger

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send(`ECHO: ${session.message.text}`);
    }
]);

bot.on('error', function (e) {
    console.log('And error ocurred', e);
});

bot.set('persistConversationData', true);

bot.set('localizerSettings', {
    botLocalePath: './bot/locale',
    defaultLocale: 'en'
});

bot.use({
    botbuilder: function (session, next) {
        var text = session.message.text.toLowerCase();
        logger.debug('message to bot:');
        logger.debug(session.message);
        next();
    },
    send: function (event, next) {
        logger.debug('message from bot:');
        logger.debug(event);
        next();
    }
});

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                // do something
            }
        });
    }
});

var connectorListener = connector.listen();
function listen() {
    return function (req, res) {
        connectorListener(req, res);
    };
}

function beginDialog(address, dialogId, dialogArgs) {
    bot.beginDialog(address, dialogId, dialogArgs);
}

function sendMessage(message, address) {
    var msg = new builder.Message().address(address);
    msg.text(message);
    bot.send(msg);
}

module.exports = {
    listen: listen,
    beginDialog: beginDialog,
    sendMessage: sendMessage
};
