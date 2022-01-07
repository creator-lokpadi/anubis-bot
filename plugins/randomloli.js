let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, 'https://leyscoders-api.herokuapp.com/api/loli?apikey=dappakntlll', '', 'nih Loli cok!', m)
}
handler.command = /^(loli)$/i
handler.tags = ['internet']
handler.help = ['loli']
module.exports = handler
handler.limit = true
