/*
By : Anubiskun
*/
let rgx = /(bot|adi )?(asu|b(an)?gsa?t|jemb(aw)?ut|ko?nt(o|i)?l|memek|peler|pejuh|janc(u|o)k|bawuk|silah|cingireh|anj(ing|ir|ey|ay|rot)|kirik|celek|ndas|babi|tol(|io)l)/i
module.exports = {
    async all(m) {
    if (m.isBaileys && m.fromMe) return true
    let chat = global.db.data.chats[m.chat]
    let isBdwrd = rgx.exec(m.text)

    if (chat.bdwrd && isBdwrd) {
      m.reply('kasar kimak!')
    }
    return true
  }
}
