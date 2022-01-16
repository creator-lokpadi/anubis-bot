/*
By : Anubiskun
command buat owner send limit ke pengguna
*/
let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag salah satu lah'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw 'Masukkan jumlah exp yang akan diberi'
  if (isNaN(txt)) throw 'Hanya angka'
  let xp = parseInt(txt)
  let exp = xp
  if (exp < 1) throw 'Minimal 1'
  let users = global.db.data.users
  // if (exp > users[m.sender].exp) throw 'Exp tidak mencukupi untuk mentransfer'
  // aktivin di bawah kalo mau di bikin command umum
  // users[m.sender].exp -= exp
  users[who].exp += xp

  conn.fakeReply(m.chat, `Selamat, @${who.replace(/@.+/, '')} Telah di tambah ${xp} XP`, who, m.text)
}
handler.help = ['sendxp @user <amount>']
handler.tags = ['xp']
handler.command = /^sendxp$/
handler.rowner = true

module.exports = handler

