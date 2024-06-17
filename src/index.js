const ERXClient = require('./classes/client');
const text = require('./functions/random/text');
const number = require('./functions/random/number');
const intents = require('./intents/intents');
const argument = require('./functions/message/argument');
const send = require('./functions/message/sendMessage');
const id = require("./functions/client/id");
const username = require("./functions/user/username")
const authorId = require("./functions/user/authorId");

module.exports = {
    ERXClient,
    Intents: intents,
    cmd: {
        random: {
            text,
            number
        },
        message: {
            argument,
            send
        },
        client: {
            id
        },
        user: {
            username,
            authorId
        }
    }
};
