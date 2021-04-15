require('dotenv').config()
const {
    CHAT_MAPPING
} = process.env

let MAPPING = {}
let regex = new RegExp(/\[(.*?)@(.*?)]/g);
let m;
while ((m = regex.exec(CHAT_MAPPING)) !== null) {
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    let key = null
    let target = null

    m.forEach((match, groupIndex) => {
        if(groupIndex === 1) key= match
        if(groupIndex === 2) target= match
    });

   MAPPING[key] = target
}
exports.CHATS = MAPPING

