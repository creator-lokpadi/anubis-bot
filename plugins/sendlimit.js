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
    if (!txt) throw 'Masukkan jumlah Limit yang akan diberi'
    if (isNaN(txt)) throw 'Hanya angka'
    let poin = parseInt(txt)
    let limit = poin
    limit += limit
    if (limit < 1) throw 'Minimal 1'
    let users = global.db.data.users
    // if (limit > users[m.sender].limit) throw 'Limit tidak mencukupi untuk mentransfer'
    // aktivin di bawah kalo mau di bikin command umum
    // users[m.sender].limit -= limit
    users[who].limit += poin

    conn.fakeReply(m.chat, `Selamat, @${who.replace(/@.+/, '')} Telah di tambah ${poin} Limit`, who, m.text)
}
handler.help = ['sendlimit @user <amount>']
handler.tags = ['xp']
handler.command = /^sendlimit$/
handler.rowner = true

module.exports = handler

