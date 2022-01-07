/*
By : Anubiskun
recode dikit
*/
let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
const canvacord = require('canvacord')
let handler = async (m, { conn, usedPrefix }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let discriminator = who.substring(8, 12)
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, lastclaim, registered, regTime, age, level, role } = global.db.data.users[who]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
      return { ...value, jid: key }
    })
    let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
    let usersLevel = sortedLevel.map(enumGetKey)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let str = `
Name: ${username} ${registered ? '(' + name + ') ': ''}(@${who.replace(/@.+/, '')})${about ? '\nAbout: ' + about : ''}
Number: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
Link: https://wa.me/${who.split`@`[0]}${registered ? '\nAge: ' + age : ''}
XP: TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Ready to *${usedPrefix}levelup*` : `${math} XP left to levelup`}]
Level: ${level}
Role: *${role}*
Limit: ${limit}
Registered: ${registered ? 'Yes (' + new Date(regTime) + ')': 'No'}
Premium: ${prem ? 'Yes' : 'No'}${lastclaim > 0 ? '\nLast Claim: ' + new Date(lastclaim) : ''}
`.trim()
let rank = await new canvacord.Rank()
.setRank(usersLevel.indexOf(m.sender) + 1)
.setAvatar(pp)
.setLevel(level)
.setCurrentXP(exp - min)
.setRequiredXP(xp)
.setProgressBar("#f2aa4c", "COLOR")
.setUsername(username)
.setDiscriminator(discriminator)
rank.build()
.then(async data => {
  await conn.sendButtonImg(m.chat, data, str, '© anubis-bot', 'Upgrade Level', `${usedPrefix}levelup`, m, { thumbnail: data, height: 282, width: 934 })
})
}
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^profile?$/i
module.exports = handler

function sort(property, ascending = true) {
if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
if (property) return (a, i, b) => {
return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
}
else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
return a.jid
}
