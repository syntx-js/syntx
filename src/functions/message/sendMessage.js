module.exports = async function send({ text, channel, returnId = false }, message) {
    if (typeof text !== 'string') {
        throw new Error('Text must be a string');
    }

    if (channel && typeof channel !== 'number' && typeof channel !== 'string') {
        throw new Error('Channel must be a number or a string');
    }

    const targetChannel = channel ? message.client.channels.cache.get(channel.toString()) : message.channel;

    if (!targetChannel) {
        throw new Error('Channel not found');
    }

    const sentMessage = await targetChannel.send(text);

    if (returnId) {
        return sentMessage.id;
    }

    return null;
};
