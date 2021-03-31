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
  },

  returnOnlineUser(date) {
    const startDate = new Date(date)
    const dateWith5Min = new Date(startDate)

    const durationInMinutes = 5;

    dateWith5Min.setMinutes(startDate.getMinutes() + durationInMinutes)

    return new Date().getTime() <= dateWith5Min.getTime()
  },
  
  debounce(func, wait, immediate) {
    let timeout
    return () => {
      const context = this, args = arguments;
      let later = function() {
        timeout = null
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
}