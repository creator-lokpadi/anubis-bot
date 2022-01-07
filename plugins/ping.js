let { performance } = require('perf_hooks')
let handler = async (m, { conn }) => {
let old = performance.now()
await m.reply('Testing...')
let neww = performance.now()
let speed = neww - old
let ping = timeConversion(speed)
m.reply(`Merespon dalam ${ping}`)
}
handler.help = ['ping']
handler.tags = ['info', 'tools']

handler.command = /^(p(ing)?)$/i
module.exports = handler

function timeConversion(millisec) {

    var seconds = (millisec / 1000).toFixed(1);

    var minutes = (millisec / (1000 * 60)).toFixed(1);

    var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
        return seconds + " Sec";
    } else if (minutes < 60) {
        return minutes + " Min";
    } else if (hours < 24) {
        return hours + " Hrs";
    } else {
        return days + " Days"
    }
}