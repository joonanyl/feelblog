const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    //käyttäjätunnus min. 3 merkkiä
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: "Please enter a username with min. 3 characters",
      });
    }

    // salasana min. 5 merkkiä
    if (!req.body.password || req.body.password.length < 5) {
      return res.status(400).send({
        msg: "Please enter a password with minimum of 5 characters",
      })
    }

    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
        return res.status(400).send({
            msg: 'Both passwords must match'
        })
    }

    next();
  },
  isLoggedIn: (req, res, next) => {
      try {
          const token = req.headers.authorization.split(' ')[1]
          const decoded = jwt.verify(
              token,
              'SECRETKEY'
          )
          req.userData = decoded
          next()
      } catch (err) {
          return res.status(401).send({
              msg: 'Your session is not valid!'
          })
      }
  }
};
