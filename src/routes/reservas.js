const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../lib/auth')

const pool = require('../database')

router.get('/add', isLoggedIn, async (req, res) => {
  const tratamientos = await pool.query('SELECT * FROM tratamientos')
  res.render('reservas/add', { tratamientos: tratamientos })
})

router.get('/', isLoggedIn, async (req, res) => {
  const reservas = await pool.query(
    'select id_reserva, nombre_tratamiento,fecha_reservada, costo_reserva, cancelado from reservas as a, tratamientos as t where a.id_tratamiento=t.id_tratamiento and a.id_usuario=?',[req.user.id_usuario]
  )
  res.render('reservas/list', { reservas })
})

router.post('/add', isLoggedIn, async (req, res) => {
  const { id_tratamiento, fecha_reservada, hora_reservada } = req.body
  var hora_fin
  var costo_reserva = 30
  if (id_tratamiento == 5) {
    costo_reserva = 60
  }
  const newReserva = {
    id_usuario: req.user.id_usuario,
    id_tratamiento,
    costo_reserva,
    fecha_reservada: `${fecha_reservada} ${hora_reservada}`
  }

  const ocupado = await pool.query(
    'SELECT count(*) as a FROM reservas WHERE fecha_reservada =' +
      `'${fecha_reservada} ${hora_reservada}:00'`
  )
  if (ocupado[0].a > 2) {
    res.send('espacio ocupado')
  } else {
    //hacer reserva y agendar
    await pool.query('INSERT INTO reservas SET ?', [newReserva])
    req.flash('success', 'Reserva creada correctamente')
    res.redirect('/reservas')
  }

  console.log(newReserva)
})

router.get('/cancelar/:id_reserva', isLoggedIn, async (req, res) => {
  var n = new Date()
  var y = n.getFullYear()
  var m = n.getMonth() + 1
  if (m < 10) {
    m = '0' + m
  }
  var d = n.getDate()
  if (d < 10) {
    d = '0' + d
  }
  var hour = n.getHours()
  var min = n.getMinutes()
  const fecha_cancelacion =
    y + '-' + m + '-' + d + ' ' + hour + ':' + min + ':00'
  console.log('fecha cancelacion' + fecha_cancelacion)
  const { id_reserva } = req.params
  await pool.query(
    'UPDATE reservas SET cancelado="SI", fecha_cancelacion=? where id_reserva=?',
    [fecha_cancelacion, id_reserva]
  )
  req.flash('success', 'Reserva cancelada correctamente')
  res.redirect('/reservas')
})

// router.get('/editar/:id_reserva', async (req, res) => {
//   const { id_reserva } = req.params
//   const reserva = await pool.query('SELECT * FROM reservas WHERE id_reserva=?',[id_reserva])
//   console.log(reserva[0])
//   res.render('reservas/edit', {reserva:reserva[0]})
// })

router.get('/detalles/:id_reserva', isLoggedIn, async (req, res) => {
  const { id_reserva } = req.params
  const reserva = await pool.query('select r.id_tratamiento, r.costo_reserva, r.fecha_reservada, r.fecha_reserva, t.nombre_tratamiento from reservas r, tratamientos t where id_reserva=? and r.id_tratamiento = t.id_tratamiento', [id_reserva])
  res.render('reservas/edit', {reserva:reserva[0]})
})

module.exports = router
