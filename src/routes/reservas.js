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

  // dt.setMinutes(dt.getMinutes() + 30);
  // prueba fecha con 2020-01-30
  console.log(`${fecha_reservada} ${hora_reservada}`)
  const ocupado = await pool.query(
    'SELECT hora_fin FROM agenda WHERE fecha_reservada =' + hora_reservada
  )
  //generar agenda, id_reserva, id_estilista -validar estilista libre, fecha_reservada, hora_reservada, hora_fin -validar duracion tratamiento-
  //   await pool.query("INSERT INTO reservas SET ?", [newReserva]);
  //   const id_reserva = await pool.query(
  //     "SELECT MAX(id_reserva) as id_reserva FROM reservas"
  //   );
  //validar disp estilista
  //   const especialista_disp = await pool.query(`select id_estilista from agenda where fecha_reservada = ${newReserva.fecha_reservada} && hora_fin = ${hora_fin}`)
  console.log(newReserva)
  // console.log(hora_fin);
  res.send('recived')
})

module.exports = router
