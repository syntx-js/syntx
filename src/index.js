const ERXClient = require("./classes/client")
const text = require("./functions/random/text")
const number = require("./functions/random/number")

module.exports = {
    ERXClient,
    cmd: {
        random: {
            text,
            number
        }
    }
}