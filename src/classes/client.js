const { Client, Events, ActivityType, PresenceUpdateStatus } = require("discord.js");
const fs = require("fs");
const path = require("path");

class ERXClient {
    constructor({ intents, prefix, token }) {
        this.intents = intents;
        this.prefix = prefix;
        this.token = token;
        this.commands = [];
        this.bot = new Client({
            intents: this.intents,
        });
    }

    setMaxListeners(max) {
        if(typeof(max) === "number") {
            this.bot.setMaxListeners(max);
        } else {
            throw new Error('"max" must be run number. Make sure you don\'t put a high number.')
        }
    }

    ready(code) {
        this.bot.once(Events.ClientReady, async () => {
            await code();
        });
    }

    start() {
        this.bot.login(this.token);
    }

    kill() {
        this.bot.destroy();
    }

    command({ name, content }) {
        this.commands.push({ name, content });
        this.bot.on(Events.MessageCreate, async (msg) => {
            if (msg.author.bot) return;
            if (!msg.content.startsWith(this.prefix)) return;

            const args = msg.content.slice(this.prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = this.commands.find(cmd => cmd.name.toLowerCase() === commandName);
            if (command) {
                await command.content(msg);
            }
        });
    }

    handler(commandsPath) {
        const absolutePath = path.resolve(commandsPath);
        fs.readdirSync(absolutePath).forEach(file => {
            if (file.endsWith(".js")) {
                const command = require(path.join(absolutePath, file));
                this.command(command);
            }
        });
    }

    presence({ time = 1800 , activities }) {
        let index = 0;
        setInterval(() => {
            const activity = activities[index];
            this.bot.user.setPresence({
                activities: [{ name: activity.content, type: ActivityType[activity.type] }]
            });
            index = (index + 1) % activities.length;
        }, parseInt(time) * 1000);
    }
}

module.exports = ERXClient;