const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");

router.post("/register", userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "This username is already in use!",
        });
      } else {
        // Käyttäjänimi on saatavilla
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // Salasana on hashattu => lisää tietokantaan
            db.query(
              `INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                req.body.username
              )}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Registered!",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      //Käyttäjää ei ole olemassa
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: "Username or password is incorrect!",
        });
      }

      // Salasanan tarkistus
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // Väärä salasana
          if (bErr) {
            return res.status(401).send({
              msg: "Username or password is incorrect!",
            });
          }

          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
              },
              "SECRETKEY",
              {
                expiresIn: "7d",
              }
            );

            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );

            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "User or password is incorrect!",
          });
        }
      );
    }
  );
});

router.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

router.post("/create", userMiddleware.isLoggedIn, (req, res, next) => {
  db.query(
    `INSERT INTO posts (title, content, emotion, writer, date) VALUES (${db.escape(req.body.title)}, ${db.escape(req.body.content)},
     ${db.escape(req.body.emotion)}, ${db.escape(req.body.writer)}, now())`,
    (err, result) => {
      if (err) {
        return res.status(400).send({
          msg: err,
        });
      }
      return res.status(201).send({
        msg: "Post created!",
      });
    }
  );
});

router.get("/posts", (req, res, next) => {
    db.query(`SELECT * FROM posts`, (err, result) => {
        if (err) {
            return res.status(400).send({
                msg: err
            })
        }
        console.log(result)
        return res.status(201).send(result)
    })
})

router.get("/posts/:id", (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE id = ${req.params.id}`, (err, result) => {
        if (err) {
            return res.status(400).send({
                msg: err
            })
        }
        console.log(result)
        return res.status(201).send(result)
    })
})

module.exports = router;
