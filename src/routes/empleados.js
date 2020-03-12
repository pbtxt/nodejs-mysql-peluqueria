const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../lib/auth')

const pool = require('../database')

router.get('/', isLoggedIn, async (req, res) => {
    const empleados = await pool.query('select * from estilistas')
    res.render('empleados/list', { empleados })
  })

router.get('/add', isLoggedIn, (req, res) => {
  res.render('empleados/add')
})

router.post('/add', isLoggedIn, async (req, res) => {
  const { nombre_estilista, correo_estilista } = req.body
  const newEmpleado = {
    nombre_estilista,
    correo_estilista,
    disponible: 'si'
  }
  await pool.query('INSERT INTO estilistas SET ?', [newEmpleado])
  res.redirect('/empleados')
})


router.get('/eliminar/:id_estilista', isLoggedIn, async (req, res) => {
    const { id_estilista } = req.params
    await pool.query('DELETE from estilistas where id_estilista=?', [
      id_estilista
    ])
    req.flash('success', 'Empleado eliminado correctamente')
    res.redirect('/empleados')
  })

module.exports = router
