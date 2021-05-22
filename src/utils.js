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
    if (arrayAttachment.length !== 0) {
        const {attachment} = arrayAttachment[0]
        urlAttachment = attachment
    }
    if (!content && !urlAttachment) return

    content = content.replace(/\|/gm, "")
        .replace(/\*/gm, "")
        .replace(/@.[a-zA-Z0-9._-]*/gm, "")
        .replace(/>|<|~|`|/gm, "")

    const instance = axios.create({
        baseURL: BASE_URL_TELEGRAM,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 10000,
    });
    if (!content) content = "Attachment"
    let data = {
        chat_id: channelId,
        parse_mode: 'markdown',
        text: (urlAttachment) ? `[ ](${urlAttachment}) ${content}` : `${content}`
    }
    return instance.post('/sendMessage', data)
}

exports.sendMsgDiscord = (clientDiscord, msg, channelId) => {
    return new Promise((resolve, reject) => {
        const {version, api} = clientDiscord.options.http
        let url = `${api}/v${version}/channels/${channelId}/messages`
        const _msg = JSON.stringify({
            'content' : `**${msg.author.username}**\n${msg.content}`,
            'embeds': msg.embeds,
            'attachments': msg.attachments,
            'type': msg.type
        });
        const config = {
            method: 'post',
            url: url,
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                'content-type': 'application/json',
                'authorization': clientDiscord.token,
            },
            data: _msg
        };
        axios(config)
            .then(result => {
                resolve(result)
            })
            .catch(e => {
                reject(e)
            })
    })
}
