/*
By : Anubiskun
*/
let fetch = require('node-fetch')
let handler = async(m, { args }) => {
if (!args[0]){ throw "/togel list -> for show list\n/togel hk/sg/.." } 
if (args[0]=="list"){
let res = await fetch(global.API('anubis', '/togel', {}, 'api'))
let json = await res.json()
m.reply(json.msg)
throw '*Usage*: ex. /togel hk'
} else {
let res = await fetch(`https://www.api.anubiskun.xyz/togel/?api=anubis&q=${args[0]}`)
let json = await res.json()
let que = json.anubis
    teks = `*Result Togel List*\n\n`
for (let i = 0; i < que.length; i++) {
    const we = que[i];
    teks += `*NO* : ${we.game_num}`
    teks += `\n*Result* : ${we.result}`
    teks += `\n*ResultDate* : ${we.ResultDate}`
    teks += `\n*Game Name* : ${we.game_name}`
    teks += `\n*shio* : ${we.shio}\n\n`
}
throw teks

    }
}

handler.help = ['togel'].map(v => v + ' list')
handler.tags = ['tools']
handler.command = /^(togel)$/i
handler.rowner = false
handler.limit = true
module.exports = handler