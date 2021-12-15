const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { validationResult } = require("express-validator");
const uuid = require("uuid");

const db = require("../server_modules/db");

const jwtSecret = "donothackme";

/**
 * Function registers new user to the users and users_data databases.
 * It requires at least login and password fields, which must be sent in request's body as object: {login: "user login", password: "user password"}.
 * As optional parameters can be added also name, email, phone and hobbies.
 * All data must be string-type.
 * Function also prints helpful hints to server console in case of problems.
 * If everything was ok, user will be redirected to the profile page, if not error message will be displayed under registration form in browser.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @returns {Promise} nothing if succeed or error message
 */
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const {username, password, name, email, phone, hobbies} = req.body;

            const selectLoginQ = "SELECT username FROM users WHERE username = ?";
            const resp = await db.makeQuery(selectLoginQ, username);
            const isUserExist = resp.length !== 0;

            if(!isUserExist){
                let hashedPassword = await bcrypt.hash(password, 8);
                const id = uuid.v4();
                const insertUserQ = "INSERT INTO users (id, username, password, registered) VALUES (?, ?, ?, NOW())";
                db.makeQuery(insertUserQ, [id, username, hashedPassword]).then(() => {
                    const insertUserDataQ = "INSERT INTO users_data (name, email, phone, hobbies, username) VALUES (?, ?, ?, ?, ?)";
                    db.makeQuery(insertUserDataQ, [name, email, phone, hobbies, username]);
                    return res.status(201).send({
                        msg: "Registered!",
                    });
                });
            } else {
                return res.status(409).send({
                    msg: "This username is already in use!",
                });
            }
        } catch (e){
            console.log("No connection to the DB or problems with query");
            return res.status(400).send({
                msg: "Problems with connection",
            });
        }
    } else{
        const errStr = convertArrToStr(errors.array());
        return res.status(422).send({
            msg: errStr
        });
    }
}

/**
 * Function logs in user by creating jwt token and saving it to cookies.
 * It requires login and password fields, which must be sent in request's body as object: {login: "user login", password: "user password"}.
 * All data must be string-type.
 * Function also prints helpful hints to server console in case of problems.
 * If everything was ok, user will be redirected to the profile page, if not error message will be displayed under registration form in browser.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @returns {Promise} nothing if succeed or error message
 */
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const username = req.body.username;
            const password = req.body.password;

            const selectLoginQ = "SELECT username FROM users WHERE username = ?";
            const resp = await db.makeQuery(selectLoginQ, username);
            const isUserExist = resp.length !== 0;

            if(isUserExist){
                const selectUserQ = "SELECT * FROM users WHERE username = ?";
                const resp = await db.makeQuery(selectUserQ, username);

                if(!resp || !(await bcrypt.compare(password, resp[0].password))){
                    return res.status(401).send({
                        msg: "Password is incorrect!",
                    });
                } else{
                    const id = resp[0].id;
                    const username = resp[0].username;
                    const token = createAccessCookie(id, username, res);

                    console.log(res)

                    const updateLoginDateQ = "UPDATE users SET last_login = now() WHERE username = ?";
                    await db.makeQuery(updateLoginDateQ, username);
                    return res.status(200).send({
                        msg: "Logged in!",
                        token,
                        user: resp[0]
                    });
                }
            } else {
                return res.status(401).send({
                    msg: "Username is incorrect!"
                });
            }
        } catch (e){
            console.log("No connection to the DB or problems with query");
            console.log(e);
            return res.status(401).send({
                msg: "Problems with connection"
            });
        }
    } else{
        const errStr = convertArrToStr(errors.array());
        return res.status(401).send({
            msg: errStr
        })
    }
}

/**
 * Function checks is user logged in by examining cookie.
 * In case then user wiped all cookies, this function will return error.
 * Function also prints helpful hints to server console in case of problems.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise} user's information as his name, email etc. or nothing in case of error
 */
exports.isLoggedIn = async (req, res, next) => {
    //If req has cookie jwt (created with logging in)
    if(req.cookies.jwt){
        try{
            //Convert cookie to json
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, jwtSecret);

            try{
                const selectNameQ = "SELECT name, username FROM users_data WHERE username = ?";
                const result = await db.makeQuery(selectNameQ, decoded.username);

                //if user with that login(=id here) exists, save his data to the req obj
                if(result){
                    req.result = result[0];
                } else{
                    console.log("No user found");
                }
            }catch(e){
                console.log("Problems with DB or connection");
                console.log(e);
            }

        }catch(e){
            console.log("Problems with getting cookie");
            console.log(e);
        }
    }

    next();
}

/**
 * Function returns user login in case if he is logged in.
 * In case then user wiped all cookies, this function will return error.
 * Function also prints helpful hints to server console in case of problems.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise} user's login or nothing in case of error
 */
exports.getLogin = async (req, res, next) => {
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, jwtSecret);
            req.username = decoded.username;
        }catch(e){
            console.log("Problems with getting cookie");
            console.log(e);
        }
    }

    next();
}

/**
 * Function logs out user and redirects to him to home page.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @returns {Promise} nothing
 */
exports.logout = (req, res) => {
    //The cookie will expire in 2 s = will be removed from browser
    res.cookie("jwt", "logout", {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });

    res.status(200).redirect("/");
}

function createAccessCookie(id, username, res) {
    const token = jwt.sign({ id: id, username: username }, jwtSecret, {
        expiresIn: "30d"
    });

    const cookieOptions = {
        expires: new Date( Date.now() + 30*24*60*60*1000 ),
        httpOnly: true
    };
    res.cookie('jwt', token, cookieOptions);

    return token;
}

function convertArrToStr(arr) {
    let result = "";
    for(let i=0; i<arr.length; i++){
        result += arr[i].msg + ". ";
    }
    return result;
}