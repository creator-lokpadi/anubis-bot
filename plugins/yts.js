/*
By : Anubiskun
*/
let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Lu mau nyari apa bro?'
  let res = await fetch(global.API('anubis', '/search/yt', { q: text }, 'api'))
  let json = await res.json()
  if (json.anubis==null){
    m.reply('Keyword Salah, ganti keywordnya!')
  } else {
    secs = []
			json.anubis.splice(10, json.anubis.length)
			json.anubis.forEach((xres, i) =>{
				secs.push({
                        "rows": [
                           {
                              "title": "MP3",
							                description: `Title: ${xres.title}\n\nUploader: ${xres.chname}`,
                              "rowId": `.ytmp3 ${xres.url}`
                           },
						                {
                              "title": "MP4",
							                description: `Title: ${xres.title}\n\nUploader: ${xres.chname}`,
                              "rowId": `.ytmp4 ${xres.url}`
                           }
                        ], title: i+1})
			})
			let po = conn.prepareMessageFromContent(m.chat, {
				  "listMessage":{
                  "title": "*YOUTUBE DOWNLOAD*",
                  "description": `*Result for : ${text}*\n*Download video by click button bellow*`,
                  "buttonText": "Result",
                  "listType": "SINGLE_SELECT",
                  "sections": secs}}, {}) 
            conn.relayWAMessage(po, {waitForAck: true})
  
  } 
}
handler.help = ['yts'].map(v => 'yts  <pencarian>')
handler.tags = ['downloader']
handler.command = /(yts|play)/i

handler.limit = true
module.exports = handler
