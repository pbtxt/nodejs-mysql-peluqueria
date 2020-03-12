const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../lib/auth')

const pool = require('../database')

router.get('/', isLoggedIn, async (req, res) => {
  const {username} = req.params
  console.log(username)
  const tratamientos = await pool.query('select * from tratamientos')
  res.render('tratamientos/list', { tratamientos })
})

router.get('/add', isLoggedIn, (req, res) => {
  res.render('tratamientos/add')
})

router.post('/add', isLoggedIn, async (req, res) => {
  const { nombre_tratamiento, duracion_tratamiento, costo_tratamiento } = req.body
  const newTratamiento = {
    nombre_tratamiento,
    duracion_tratamiento,
    costo_tratamiento
  }
  await pool.query('INSERT INTO tratamientos SET ?', [newTratamiento])
  res.redirect('/tratamientos')
})

router.get('/eliminar/:id_tratamiento', isLoggedIn, async (req, res) => {
  const { id_tratamiento } = req.params
  await pool.query('DELETE from tratamientos where id_tratamiento=?', [
    id_tratamiento
  ])
  req.flash('success', 'Tratamiento eliminado correctamente')
  res.redirect('/tratamientos')
})

module.exports = router
