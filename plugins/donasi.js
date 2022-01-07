let handler = async m => m.reply(`
╭─「 Donasi 」
│ • Gopay/OVO/Dana/Pulsa [089653909054]
│ • Pulsa [081282091206]
╰────
`.trim())
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler