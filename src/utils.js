require('dotenv').config()
const axios = require('axios');

const {
    TELEGRAM_BOT_TOKEN,
} = process.env

const BASE_URL_TELEGRAM = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`
exports.sendMsgTelegram = (msg, channelId) => {
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
        chat_id: channelId,
        parse_mode: 'markdown',
        text: (urlAttachment) ? `[ ](${urlAttachment}) ${content}` : `${content}`
    }
    return instance.post('/sendMessage', data)
}
