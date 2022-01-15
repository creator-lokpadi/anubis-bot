const cheerio = require('cheerio')
const fetch =    require('node-fetch')
const axios = require("axios")
const qs = require("qs")


function joox(query) {
    return new Promise((resolve, reject) => {
                let result = []
                let hasil = []
                let promoses = []
                let ids = []
                    const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + query
                    promoses.push(
                        axios.get(get, {
                            headers: {
                                'X-Forwarded-For': '36.73.34.109',
                                Cookie: 'wmid=14507879; user_type=2; country=id; session_key=bf986c42192cbb455fbbdaf4c3b03cbb;'
                            }
                        })
                            .then(({ data }) => {
                                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                                hasil.push({
                                    msong: res.msong,
                                    malbum: res.malbum,
                                    msinger: res.msinger,
                                    public_time: res.public_time,
                                    imgSrc: res.imgSrc,
                                    mp3Url: res.mp3Url
                                })
                                Promise.all(promoses).then(() => resolve({
                                    creator: "anubis-bot",
                                    status: true,
                                    data: hasil,
                                }))
                            }).catch(reject)
                    )
                
    })
}

module.exports = { joox }
