/*
By : Anubiskun
*/
const dir = [
  'https://www.random.org/dice/dice1.png',
  'https://www.random.org/dice/dice2.png',
  'https://www.random.org/dice/dice3.png',
  'https://www.random.org/dice/dice4.png',
  'https://www.random.org/dice/dice5.png',
  'https://www.random.org/dice/dice6.png'
];
const { sticker } = require('../lib/sticker')
let handler = async (m, { conn }) => {
  let stiker = false
  stiker = await sticker(false, dir[Math.floor(Math.random() * dir.length)], packname, author)
  if (stiker) await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
}
handler.help = ['dadu']
handler.tags = ['sticker', 'fun']
handler.command = /^dadu$/i

module.exports = handler
