const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      console.log(req.body)
      console.log(username)
      console.log(password)
    }
  )
)

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { nombre_completo } = req.body
      const newUser = {
        username,
        password,
        nombre_completo
      }
      newUser.password = await helpers.encryptPassword(password)
      const result = await pool.query('insert into usuarios set ?', [newUser])
      newUser.id_usuario = result.insertId
      return done(null, newUser)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id_usuario)
})

passport.deserializeUser(async (id, done) => {
  const filas = await pool.query('select * from usuarios where id_usuario=?', [
    id
  ])
  done(null, filas[0])
})
