let fetch = require('node-fetch')
let { JSDOM } = require('jsdom')

let handler = async (m, { text, usedPrefix, command }) => {
    if (text=='list') throw `List Alkitab Perjanjian Lama dan Baru

    *PERJANJIAN LAMA*
*${p+=1}.* Kejadian (Genesis)
*${p+=1}.* Keluaran (Exodus)
*${p+=1}.* Imamat (Leviticus)
*${p+=1}.* Bilangan (Numbers)
*${p+=1}.* Ulangan (Deuteronomy)
*${p+=1}.* Yosua (Joshua)
*${p+=1}.* Hakim-Hakim (Judges)
*${p+=1}.* Rut (Ruth)
*${p+=1}.* 1 Samuel
*${p+=1}.* 2 Samuel
*${p+=1}.* 1 Raja-raja (Book of Kings)
*${p+=1}.* 2 Raja-Raja (2nd Book of Kings)
*${p+=1}.* 1 Tawarikh (Books of Chronicles)
*${p+=1}.* 2 Tawarikh (Chronicles)
*${p+=1}.* Ezra
*${p+=1}.* Nehemia (Nehemiah)
*${p+=1}.* Ester (Esther)
*${p+=1}.* Ayub (Job)
*${p+=1}.* Mazmur (Psalm)
*${p+=1}.* Amsal (Proverbs)
*${p+=1}.* Pengkhotbah (Ecclesiastes)
*${p+=1}.* Kidung Agung (Song of Solomon)
*${p+=1}.* Yesaya (Isaiah)
*${p+=1}.* Yeremia (Jeremiah)
*${p+=1}.* Ratapan (Lamentations)
*${p+=1}.* Yehezkiel (Ezekiel)
*${p+=1}.* Daniel
*${p+=1}.* Hosea
*${p+=1}.* Yoel (Joel)
*${p+=1}.* Amos
*${p+=1}.* Obaja (Obadiah)
*${p+=1}.* Yunus (Jonah)
*${p+=1}.* Mikha (Micah)
*${p+=1}.* Nahum
*${p+=1}.* Habakuk (Habakkuk)
*${p+=1}.* Zefanya (Zephaniah)
*${p+=1}.* Hagai (Haggai)
*${p+=1}.* Zakharia (Zechariah)
*${p+=1}.* Maleakhi (Malachi)

    *PERJANJIAN BARU*
*${q+=1}.* Matius (Gospel of Matthew)
*${q+=1}.* Markus (Gospel of Mark)
*${q+=1}.* Lukas (Gospel of Luke)
*${q+=1}.* Yohanes (Gospel of John)
*${q+=1}.* Kisah Para Rasul (Acts of the Apostles)
*${q+=1}.* Roma (Epistle to Romans)
*${q+=1}.* 1 Korintus (First Epistle to the Corinthians)
*${q+=1}.* 2 Korintus (Second Epistle to the Corinthians)
*${q+=1}.* Galatia (Epistle to the Galatians)
*${q+=1}.* Efesus (Epistle to the Ephesians)
*${q+=1}.* Filipi (Epistle to the Philippians)
*${q+=1}.* Kolose (Epistle to the Colossians)
*${q+=1}.* 1 Tesalonika (First Epistle to the Thessalonians)
*${q+=1}.* 2 Tesalonika (Second Epistle to the Thessalonians)
*${q+=1}.* 1 Timotius (First Epistle to Timothy)
*${q+=1}.* 2 Timotius (Second Epistle to Timothy)
*${q+=1}.* Titus (Epistle to Titus)
*${q+=1}.* Filemon (Epistle to Philemon)
*${q+=1}.* Ibrani (Epistle to the Hebrews)
*${q+=1}.* Yakobus (Epistle of James)
*${q+=1}.* 1 Petrus ((Second Epistle of Peter)
*${q+=1}.* 2 Petrus (Second Epistle of Peter)
*${q+=1}.* 1 Yohanes (First Epistle of John)
*${q+=1}.* 2 Yohanes (Second Epistle of John)
*${q+=1}.* 3 Yohanes (Third Epistle of John)
*${q+=1}.* Yudas (Epistle of Jude)
*${q+=1}.* Wahyu (Book of Revelation)
    `
    if (!text) throw `uhm.. mau cari apa?\n\nList : ${usedPrefix + command} list\ncontoh:\n1. ${usedPrefix}alkitab 1 timotius 2\n2. ${usedPrefix}alkitabf 1 timotius 2:5`
    let res = await fetch(`https://alkitab.mobi/universal.php?s=${encodeURIComponent(text)}&version=tb`)
    if (!res.ok) throw await res.text()
    let html = await res.text()
    let { document } = new JSDOM(html).window

let result = [...document.querySelectorAll("body div:nth-child(3) p:nth-child(1)")].map(el => {
    return {
        teks: el.textContent
    }
})
if (result=='') return m.reply(`format salah\nex: ${usedPrefix + command} 1 timotius 2:5`)
m.reply( `Hasil pencarian : ${text}\n` + result.map(v => `${v.teks}`).join('\n────────────────────────\n'))

}
handler.help = ['alkitabf'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^alkitabf$/i
handler.limit = true
module.exports = handler