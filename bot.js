const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
require('dotenv').config()
const {
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHANNEL_ID_WARBAR_AOI,
    DISCORD_BOT_TOKEN,
    DISCORD_SYNC_CHANNEL_ID
} = process.env

const BASE_URL_TELEGRAM = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    let {id} = msg.channel
    console.log(id)
    if(id == DISCORD_SYNC_CHANNEL_ID){
        sendTelegramAoi(msg)
    }
    if (msg.content === '#ping') {
        msg.reply('pong');
    }
});

const sendTelegramAoi = msg => {
    let {content, attachments} = msg
    let arrayAttachment = Array.from(attachments.values());
    let urlAttachment = null
    if(arrayAttachment.length !== 0){
        const {attachment} = arrayAttachment[0]
        urlAttachment = attachment
    }
    if (!content && !urlAttachment) return

    content = content.replace(/\|/gm, "")
        .replace(/\*/gm,"")
        .replace(/@.[a-zA-Z0-9._-]*/gm, "")
        .replace(/>|<|~|`|/gm, "")

    const instance = axios.create({
        baseURL: BASE_URL_TELEGRAM,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 10000,
    });
    if(!content) content= "Attachment"
    let data = {
        chat_id: TELEGRAM_CHANNEL_ID_WARBAR_AOI,
        parse_mode: 'markdown',
        text: (urlAttachment) ? `[ ](${urlAttachment}) ${content}` : `${content}`
    }
    return instance.post('/sendMessage', data)
}
client.login(DISCORD_BOT_TOKEN);
