const { Client, Events, ActivityType } = require("discord.js");

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

    ready(code) {
        this.bot.once(Events.ClientReady, async () => {
            await code();
        });
    }

    start() {
        this.bot.login(this.token);
    }

    kill() {
        this.bot.destroy()
    }

    command({ name, content }) {
        this.bot.on(Events.MessageCreate, async (msg) => {
            if (msg.author.bot) return;
            if (!msg.content.startsWith(this.prefix)) return;
    
            const args = msg.content.slice(this.prefix.length).trim().split(/ +/);
    
            if (args.shift().toLowerCase() === name.toLowerCase()) {
                await content(msg);
            }
        });
    }
    

    presence({ time, activities }) {
        let index = 0;
        setInterval(() => {
            const activity = activities[index];
            this.bot.user.setPresence({
                activities: [{ name: activity.content, type: ActivityType[activity.type] }],
            });
            index = (index + 1) % activities.length;
        }, parseInt(time) * 1000);
    }
}

module.exports = ERXClient;
