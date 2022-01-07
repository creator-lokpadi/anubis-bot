const { sticker, sticker5 } = require('../lib/sticker')

let handler = async (m, { conn, usedPrefix, command }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/webp/.test(mime)) {
      let img = await q.download()
      stiker = await sticker5(img, false, packname, author)
    } else if (/image/.test(mime)) {
      let img = await q.download()
      stiker = await sticker5(img, false, packname, author)
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('maks 10 detik!')
      let img = await q.download()
      stiker = await sticker(img, false, packname, author)
    } else if (m.quoted.text) {
      if (isUrl(m.quoted.text)) stiker = await sticker(false, m.quoted.text, packname, author)
      else throw 'URL tidak valid! akhiri dengan jpg/gif/png'
    }
  } catch (e) {
    throw e
  }
  finally {
    if (stiker) await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
    else {
      return conn.reply(m.chat, `Reply media dengan perintah *${usedPrefix + command}*`, m)
    }
  }
}
handler.help = ['stiker (caption|reply media)', 'stiker <url>', 'stikergif (caption|reply media)', 'stikergif <url>']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
