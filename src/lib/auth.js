module.exports = {
  isLoggedAdmin(req, res, next) {
    if (req.user.id_usuario == 9) {
      console.log('si')
      return res.redirect('/profileAdmin')
    } else next()
  },
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/signin')
  },

  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/profile')
  }
}
