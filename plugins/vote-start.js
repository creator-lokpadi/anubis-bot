let handler = async (m, { conn, isAdmin, isOwner, text, usedPrefix }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) return conn.send2Button(m.chat, `Masih ada voting di chat ini!`, '© anubis-BOT', 'Cek', `${usedPrefix}cekvote`, 'Hapus', `${usedPrefix}-vote`, conn.vote[id][3])
    conn.vote[id] = [
        text,
        [],
        [],
        await conn.send2Button(m.chat, 'Voting dimulai', '© anubis-BOT', 'Upvote', `${usedPrefix}upvote`, 'Devote', `${usedPrefix}devote`, m)
    ]
}
handler.help = ['mulaivote [alasan]']
handler.tags = ['vote']
handler.command = /^(start|mulai|\+)vote$/i
handler.owner = true
handler.mods = true
handler.admin = true
handler.group = true

module.exports = handler