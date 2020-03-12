const express = require('express')
const router = express.Router()
const {today} =require('../lib/handlebars')
const { isLoggedIn } = require('../lib/auth')

const pool = require('../database')

router.get('/', isLoggedIn, async (req, res) => {
  const agenda = await pool.query(
    'select id_reserva, nombre_tratamiento,fecha_reservada, costo_reserva, cancelado from reservas as a, tratamientos as t where a.id_tratamiento=t.id_tratamiento order by fecha_reservada desc'
  )
  res.render('agenda/all', { agenda })
})

router.get('/today', isLoggedIn, async (req, res) => {
    console.log(today())
    const f_actual = today() 
    const agenda = await pool.query(`select id_reserva, nombre_tratamiento,fecha_reservada, costo_reserva, cancelado from reservas as a, tratamientos as t where a.id_tratamiento=t.id_tratamiento and fecha_reservada between '${f_actual} 06:00:00' and '${f_actual} 18:00:00' order by fecha_reservada desc`)
    res.render('agenda/today', { agenda })
  })

module.exports = router

// 'SELECT count(*) as a FROM reservas WHERE fecha_reservada =' +
//       `'${fecha_reservada} ${hora_reservada}:00'`

// select id_reserva, nombre_tratamiento,fecha_reservada, costo_reserva, cancelado from reservas as a, tratamientos as t where a.id_tratamiento=t.id_tratamiento and fecha_reservada between  '2020-03-12 06:00:00' and '2020-03-12 18:00:00' order by fecha_reservada desc