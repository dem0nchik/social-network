const crypto = require('crypto')

module.exports = {
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  randomId() {
    return crypto.randomBytes(16).toString('hex')
  },
  postDate(date) {
    return `${date.substr(0, 10)} ${date.substr(11, 8)}`
  }
}