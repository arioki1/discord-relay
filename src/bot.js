const {MessageEmbed, Client} = require('discord.js');
const {sendMsgTelegram} = require("./utils");
const {CHATS} = require("./configs");
const client = new Client();
require('dotenv').config()
const {
    DISCORD_BOT_TOKEN,
} = process.env



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    let {id, name, type} = msg.channel
    if(CHATS[id]){
        sendMsgTelegram(msg, CHATS[id])
    }
    if (msg.content === '!!ping') {
        msg.channel.send(`pong`);
    }

    if (msg.content === '!!channel') {
        const embed = new MessageEmbed()
            .addFields(
                {name: "name", value: name, inline: true},
                {name: "id", value: id, inline: true},
                {name: "type", value: type, inline: true}
                );
        msg.channel.send(embed);
    }
});

client.login(DISCORD_BOT_TOKEN);

