let fetch = require('node-fetch')
let handler = async(m, { conn, text, usedPrefix, command}) => {
    let [q, n] = text.split `|`
    if (!q) throw `Ketik ${usedPrefix + command} <teks | author>`
    let user = global.db.data.users[m.sender].name
    let name = n ? n : user ? user : await conn.getName(m.sender)
    let res = await fetch(`https://terhambar.com/aw/qts/?kata=${q}&author=${name}&tipe=random`)
    if (res.status !==200) throw 'Server error'
    let json = await res.json()
    await conn.sendFile(m.chat, json.result, 'q.jpg', '©NURUTOMO', m)
}
handler.help = ['quotemaker <teks | wm>']
handler.tags = ['nulis']
handler.command = /^quotemaker$/i
handler.limit = true
//MadeByLeviBot
module.exports = handler
