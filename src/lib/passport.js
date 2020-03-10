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
      const filas = await pool.query(
        'select * from usuarios where username=?',
        [username]
      )
      if (filas.length > 0) {
        const user = filas[0]
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        )

        if (validPassword) {
          done(null, user, req.flash('success','Bienvenido' + user.username))
        } else {
          done(null, false, req.flash('message','Contraseña invalidos'))
        }
      } else {
        return done(null, false, req.flash('message','Usuario no encontrado'))
      }
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
