/*
By : Anubiskun
recoded dikit
*/
let levelling = require('../lib/levelling')
const canvacord = require('canvacord')
let handler = m => m

handler.before = async function (m) {
		let pp = './src/avatar_contact.png'
		let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
		let discriminator = who.substring(8, 12)

		let user = global.db.data.users[m.sender]
		let users = Object.entries(global.db.data.users).map(([key, value]) => {
		return { ...value, jid: key }
		})

		if (!user.autolevelup) return !0
		let before = user.level * 1
		while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++

		if (before !== user.level) {
			try {
				pp = await conn.getProfilePicture(who)
			  } catch (e) {
			  } finally {
					let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
					let usersLevel = sortedLevel.map(enumGetKey)
					let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)

					let str = `Selamat, anda telah naik level!
					*${before}* ➞ *${user.level}*
					gunakan .profile untuk mengecek`
					let rank = await new canvacord.Rank()
					.setRank(usersLevel.indexOf(m.sender) + 1)
					.setAvatar(pp)
					.setLevel(user.level)
					.setCurrentXP(user.exp - min)
					.setRequiredXP(xp)
					.setProgressBar("#f2aa4c", "COLOR")
					.setUsername(conn.getName(who))
					.setDiscriminator(discriminator)
					rank.build()
					.then(async data => {
					await conn.sendButtonImg(m.chat, data, str, '© anubis-bot', 'Ambil XP Harian', `.claim`, m, { thumbnail: data, height: 282, width: 934 })
				})
			}
		}
	}

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
	