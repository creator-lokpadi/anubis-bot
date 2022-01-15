let fetch = require('node-fetch')

const isUrl = str => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(str)
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (isUrl(text)) throw `*Perintah ini untuk mencari lagu joox berdasarkan pencarian*\n\ncontoh:\n${usedPrefix + command} 1nonly`
  let res = await fetch(`https://api-jooxtt.sanook.com/openjoox/v2/search_type?country=id&lang=id&key=${text}&type=0`)
  let json = await res.json()
  if (json.tracks==null){
    m.reply('Keyword Salah, ganti keywordnya!')
  } else {
    secs = []
			json.tracks.splice(10, json.tracks.length)
			json.tracks.forEach((xres, i) =>{
				secs.push({
                        "rows": [
                           {
                              "title": "MP3",
							  description: `Title: ${xres[0].name}`,
                              "rowId": `.jxdl https://www.joox.com/id/single/${xres[0].id}`
                           }
                        ], title: i+1})
			})
			let po = conn.prepareMessageFromContent(m.chat, {
				  "listMessage":{
                  "title": "*JOOX SEARCH*",
                  "description": `*Result for : ${text}*\n*Download Mp3 by click button bellow*`,
                  "buttonText": "Result",
                  "listType": "SINGLE_SELECT",
                  "sections": secs}}, {}) 
            conn.relayWAMessage(po, {waitForAck: true})
  
  } 
}
handler.help = ['jooxf'].map(v => 'jooxf  <pencarian>')
handler.tags = ['downloader']
handler.command = /(jooxf|jf)/i

handler.limit = true
module.exports = handler
