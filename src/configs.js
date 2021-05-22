require('dotenv').config()
const {
    CHAT_MAPPING
} = process.env

let MAPPING = {}
let regex = new RegExp(/\[(.*?)@(.*?)@(.*?)]/g);
let m;
while ((m = regex.exec(CHAT_MAPPING)) !== null) {
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    let key = null
    let targetTelegram = null
    let targetDiscord = null

    m.forEach((match, groupIndex) => {
        if(groupIndex === 1) key= match
        if(groupIndex === 2) {
            targetTelegram = match
        }
        if(groupIndex === 3) {
            targetDiscord = match
        }
    });
   MAPPING[key] = {targetTelegram, targetDiscord}
}
exports.CHATS = MAPPING

