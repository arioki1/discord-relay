const {MessageEmbed, Client} = require('discord.js');
const {sendMsgTelegram} = require("./utils");
const {CHATS} = require("./configs");
require('dotenv').config()

const allowUserBotting = require('discord.js.userbot');
const {sendMsgDiscord} = require("./utils");
const client = new Client({ _tokenType: '' });

allowUserBotting(client);
allowUserBotting(client,"../../node_modules");

const {
    DISCORD_BOT_TOKEN,
    DISCORD_AUTHOR_ID
} = process.env

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    let {id, name, type} = msg.channel
    if(CHATS[id]){
        if(CHATS[id]?.targetTelegram !== '') sendMsgTelegram(msg, CHATS[id]?.targetTelegram)
        if(CHATS[id]?.targetDiscord !== '') {
            try {
                sendMsgDiscord(client, msg, CHATS[id]?.targetDiscord)
                    .then(()=>{})
                    .catch(()=>{})
            }catch (e) {}
        }
    }

    if (msg.content === '!!ping' && msg.author.id === DISCORD_AUTHOR_ID) {
       try{
           msg.channel.send(`pong`);
       }catch (e) {
           console.log(e)
       }
    }

    if (msg.content === '!!channel' && msg.author.id === DISCORD_AUTHOR_ID) {
        try{
            const embed = new MessageEmbed()
                .addFields(
                    {name: "name", value: name, inline: true},
                    {name: "id", value: id, inline: true},
                    {name: "type", value: type, inline: true}
                );
            msg.reply(embed);
        }catch (e) {
            console.log(e)
        }
    }
});

client.login(DISCORD_BOT_TOKEN);
