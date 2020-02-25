const express = require('express')
const router = express.Router()

const pool = require('../database')

router.get('/add', async (req, res) => {
  const tratamientos = await pool.query('SELECT * FROM tratamientos')
  res.render('reservas/add', { tratamientos: tratamientos })
})

router.get('/', (req, res) => {
  res.render('reservas/list')
})

router.post('/add', async (req, res) => {
  const { id_tratamiento, fecha_reservada, hora_reservada } = req.body
  var hora_fin
  var costo_reserva = 30
  if (id_tratamiento == 5) {
    costo_reserva = 60
  }
  const newReserva = {
    id_usuario: 1,
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
    res.send('recived')
  }

  console.log(newReserva)
})

module.exports = router
