const moment = require('moment')
const { format } = require('timeago.js')

const helpers = {}

helpers.timeago = time => {
  return format(time)
}

helpers.moment = fecha_reservada => {
  return moment(fecha_reservada).format('MMMM Do YYYY, h:mm:ss a')
  // return momentInstance.calendar(fecha_reservada)
}

helpers.today = () => {
  var n = new Date()
  var y = n.getFullYear()
  var m = n.getMonth() + 1
  if (m<10){
      m='0'+m
  }
  var d = n.getDate()
  if (d<10){
      d='0'+d
  }
  const date = y + '-' + m + '-' + d
  console.log(date)
  return date
}

module.exports = helpers
