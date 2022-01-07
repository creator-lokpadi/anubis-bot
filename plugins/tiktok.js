/*
By : Anubiskun
*/
let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
  let res = await fetch(global.API('anubis', '/ttdl', { url: args[0] }, 'api'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.code) throw 'Error!'
  conn.sendFile(m.chat, json.anubis.no_watermark, 'tiktok.mp4', `*username*: ${json.username}`, m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(tt|tik(tok)?(dl)?)$/i

handler.limit = true
module.exports = handler
