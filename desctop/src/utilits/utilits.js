const monthOfYear = {
  0: 'Января',
  1: 'Февраля',
  2: 'Марта',
  3: 'Апреля',
  4: 'Мая',
  5: 'Июня',
  6: 'Июля',
  7: 'Августа',
  8: 'Сентября',
  9: 'Октября',
  10: 'Ноября',
  11: 'Декабря',
}
const lastDayOfMonth = {
  0: '31',
  1: '28',
  2: '31',
  3: '30',
  4: '31',
  5: '30',
  6: '31',
  7: '31',
  8: '30',
  9: '31',
  10: '30',
  11: '31',
}

const detectHours = (chekedHours) => {
  let hours = +chekedHours

  for (let i = 1; i < 12; i++) {
    if (chekedHours-i < 0) {
      hours = chekedHours + i
      break
    }    
  }
  return hours
}

const parseDate = (date, withTimeZone) => {
  const currentTimeZoneOffsetInHours = date.getTimezoneOffset()/60
  let dateNow = ''
  let timeNow = ''

  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  year = new Date().getFullYear() === year ? '' : year
  minutes = minutes < 10 ? '0'+minutes : minutes

  if(withTimeZone) {
    if (hours - currentTimeZoneOffsetInHours < 0) {
      if (day-1 < 0) {
        hours = detectHours(hours)
        dateNow = `${lastDayOfMonth[month-1]} ${monthOfYear[month-1]} ${year}`
        timeNow = `${hours-currentTimeZoneOffsetInHours}:${minutes}`
      } else {
        hours = detectHours(hours)
        dateNow = `${day} ${monthOfYear[month]} ${year}`
        timeNow = `${hours-currentTimeZoneOffsetInHours}:${minutes}`
      }
    } else{
      dateNow = `${day} ${monthOfYear[month]} ${year}`
      timeNow = `${hours}:${minutes}`

    }
  } else {
    dateNow = `${day} ${monthOfYear[month]} ${year}`
    timeNow = `${hours}:${minutes}`
  }

  return {
    dateNow,
    timeNow
  }
}

export default {
  parseDate
}