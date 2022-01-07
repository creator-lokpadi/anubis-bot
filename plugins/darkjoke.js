let handler = async (m, { conn }) => {
    conn.sendFile(m.chat, 'https://leyscoders-api.herokuapp.com/api/darkjoke?apikey=dappakntlll', '', 'drag joles', m)
}
handler.help = ['darkjokes']
handler.tags = ['internet']
handler.command = /^(dragjokes|darkjokes)$/i

module.exports = handler
