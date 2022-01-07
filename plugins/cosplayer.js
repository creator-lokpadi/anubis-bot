/*
By : Anubiskun
*/
let fetch = require('node-fetch')
let handler = async(m, { conn }) => {
  let res = await fetch(global.API('anubis', '/cosplayer', {}, 'api'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.anubis.url) throw 'Error!'
  conn.sendFile(m.chat, json.anubis.url, '', `*username*: ${json.anubis.username}`, m)
}
handler.help = ['cosplayer']
handler.tags = ['internet']
handler.command = /^(cosplayer)$/i
handler.limit = true
module.exports = handler