const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', async (req, res)=>{
    const tratamientos = await pool.query('SELECT * FROM tratamientos');
    res.render('reservas/add', {tratamientos:tratamientos});
});

router.get('/', (req, res)=>{
    res.render('reservas/list');
});


module.exports = router;
