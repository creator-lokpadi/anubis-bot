/*
By : Anubiskun
can download many media url using 1 command,
POST/MultiPOST
REEL
TV/VIDEO
STORIES/HIGHLIGHT
*/
let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Uhm...url nya mana?'
  let res = await fetch(global.API('anubis', '/igdl', { url: args[0] }, 'api'))
  if (res.code == false) {
    res.text()
    throw res.code
  }
  let json = await res.json()
  if (json.is_verified == true) {
    teks =  `「 INSTAGRAM 」\n\n*Username*: ${json.username} ✅\n*Full Name*: ${json.full_name}`
} else {
    teks =  `「 INSTAGRAM 」\n\n*Username*: ${json.username}\n*Full Name*: ${json.full_name}`
}

if (json.type == '1') {
    teks += `\n*Caption*: ${json.caption}`
    teks += `\n*Comment*: ${json.comment_count}`
    teks += `\n*Like*: ${json.like_count}` 
} else if (json.type == '2') {
    teks += `\n*Title*: ${json.title}`
    teks += `\n*Caption*: ${json.caption}`
    teks += `\n*viewer*: ${json.view_count}`
    teks += `\n*Comment*: ${json.comment_count}`
    teks += `\n*Like*: ${json.like_count}` 
}
  for(let i = 0; i < json.anubis.length; i++) {
    conn.sendFile(m.chat, json.anubis[i].url, `ig.${json.anubis[i].type}`, teks, m); }

}
handler.help = ['ig'].map(v => v + ' <url> (can download many media url)')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i

handler.limit = true
module.exports = handler
