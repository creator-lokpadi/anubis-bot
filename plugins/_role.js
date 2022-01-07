const roles = {
/*
By : Anubiskun
*/
  'Looser': 0,
  'a Man': 10,
  'Semi Beginer': 20,
  'Beginer': 30,
  'Semi Master': 40,
  'Master': 50,
  'Super Master': 60,
  'Semi Legend': 80,
  'Legend': 90,
  'Super Legend': 100,
  'Lord Legend': 150,
  'Semi God': 200,
  'God': 250,
  'Super God': 350,
  'GOD of The GOD': 1000
}

module.exports = {
  before(m) {
    let user = global.db.data.users[m.sender]
    let level = user.level
    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([,minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role
    return true
  }
}
