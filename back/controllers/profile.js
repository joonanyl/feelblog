const db = require("../server_modules/db");
const {validationResult} = require("express-validator");

/**
 * Function passes forward to next callback function in request object (request.result key) all user personal information as name, email, phone etc.
 * Also function passes forward isSuccess(boolean) value, which is status of the operation.
 * Function prints helpful hints to server console in case of errors.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise<void>}
 */
exports.getUserData = async (req, res, next) => {
    const selectQ = "SELECT * FROM users_data WHERE username = ?";
    sendProfileData(req, next, selectQ);
}

/**
 * Function passes forward to next callback function in request object (request.result key) all user created posts.
 * Also function passes forward isSuccess(boolean) value, which is status of the operation.
 * Function prints helpful hints to server console in case of errors.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise<void>}
 */
exports.getUserPosts = async (req, res, next) => {
    const selectQ = "SELECT * FROM posts WHERE username = ?";
    sendProfileData(req, next, selectQ);
}

/**
 * Function creates new post and save it to the database.
 * Also function passes forward in request object isSuccess(boolean) value, which is a status of the operation.
 * Function prints helpful hints to server console in case of errors.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise<void>}
 */
exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const values = Object.values(req.body);
            const insertQ = "INSERT INTO posts (title, content, emotion, username) VALUES(?, ?, ?, ?)";
            if(values){
                await changeDBRow(req, res, next, insertQ, values);
                return;
            } else{
                console.log("No values or id defined");
                req.isSuccess = false;
            }
        }catch(e){
            console.log("Problems with req object");
            req.isSuccess = false;
        }
    }else{
        failedValidationRes(req, errors);
    }

    next();
}

/**
 * Function gets post with specific id and passes forward to next callback function in request object (request.result key).
 * Id must be provided in request params.
 * Also function passes forward in request object isSuccess(boolean) value, which is a status of the operation.
 * Function prints helpful hints to server console in case of errors.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise<void>}
 */
exports.getUserPost = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const postId = req.params.id;
        const selectQ = "SELECT * FROM posts WHERE (username = ? AND id = ?)";
        sendProfileData(req, next, selectQ, postId);
    } else{
        failedValidationRes(req, errors);
    }
}

/**
 * Function updates post with specific id.
 * Id must be provided in request params.
 * Also function passes forward isSuccess(boolean) value, which is a status of the operation.
 * Function prints helpful hints to server console in case of errors.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise<void>}
 */
exports.updateUserPost = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const postId = req.params.id;
            const values = req.body;
            const updateQ = "UPDATE posts SET ? WHERE id = ? AND username = ?";
            if(values && postId){
                changeDBRow(req, res, next, updateQ, [values, postId]);
                return;
            } else{
                console.log("No values or id defined");
                req.isSuccess = false;
            }
        }catch(e){
            console.log("Problems with req object");
            req.isSuccess = false;
        }
    }else{
        console.log(errors)
        failedValidationRes(req, errors);
    }

    next();
}

/**
 * Function deletes post with specific id.
 * Id must be provided in request params.
 * Also function passes forward isSuccess(boolean) value, which is a status of the operation.
 * Function prints helpful hints to server console in case of errors.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise<void>}
 */
exports.deleteUserPost = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const postId = req.params.id;
            const deleteQ = "DELETE FROM posts WHERE id = ?";
            if(postId){
                changeDBRow(req, res, next, deleteQ, [postId]);
                return;
            } else{
                console.log("No id defined");
                req.isSuccess = false;
            }
        }catch(e){
            console.log("Problems with req object");
            req.isSuccess = false;
        }
    }else{
        failedValidationRes(req, errors);
    }

    next();
}

/**
 * Function gets queried user personal information(name, email etc.) and passes forward to the next callback function in request object (request.result key).
 * Information name must be provided in request params.
 * Also function passes forward isSuccess(boolean) value, which is a status of the operation.
 * Function prints helpful hints to server console in case of errors.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise<void>}
 */
exports.getUserProperty = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const property = req.params.property;
        const selectQ = `SELECT ${property} FROM users_data WHERE (username = ?)`;
        sendProfileData(req, next, selectQ, property);
    } else{
        failedValidationRes(req, errors);
    }
}

/**
 * Function updates queried user personal information(name, email etc.).
 * Information name must be provided in request params.
 * Also function passes forward to the next callback function in request object isSuccess(boolean) value, which is a status of the operation.
 * Function prints helpful hints to server console in case of errors.
 * @param req request object from the previous function
 * @param res response object from the previous function
 * @param next next function for passing data forward
 * @returns {Promise<void>}
 */
exports.updateUserProperty = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const property = req.params.property;
            const value = req.body.value;
            const updateQ = `UPDATE users_data SET ${property} = ? WHERE username = ?`;
            if(property && value){
                changeDBRow(req, res, next, updateQ, [value]);
                return;
            } else{
                console.log("No value or id defined");
                req.isSuccess = false;
            }
        }catch(e){
            console.log("Problems with req object");
            req.isSuccess = false;
        }
    } else{
        failedValidationRes(req, errors);
    }

    next();
}

async function sendProfileData(req, next, selectQ, param) {
    try{
        const username = req.result.username;

        if(username){
            try{
                const selectLoginQ = "SELECT username FROM users WHERE username = ?";
                const resp = await db.makeQuery(selectLoginQ, username);
                const isUserExist = resp.length !== 0;

                let params = [username];
                if(param){
                    params.push(param);
                }

                if(isUserExist){
                    req.result = await db.makeQuery(selectQ, params);
                    req.isSuccess = true;
                } else {
                    console.log("User is not exist or login is wrong");
                    req.isSuccess = false;
                }
            }catch (e){
                console.log("Problems with DB connection");
                req.isSuccess = false;
            }
        } else{
            console.log("User is not logged in");
            req.isSuccess = false;
        }
    } catch (e){
        console.log("Problems with req object");
        req.isSuccess = false;
    }

    next();
}

async function changeDBRow(req, res, next, sqlQ, params) {
    if(!req.result){
        console.log("User is not logged in");
        req.isSuccess = false;
    } else{
        try{
            const username = req.result.username;
            params.push(username);

            const result = await db.makeQuery(sqlQ, params);
            if(result.affectedRows === 1){
                req.isSuccess = true;
            } else {
                req.isSuccess = false;
            }
        }catch (e){
            console.log("Problems with DB connection or req object");
            console.log(e);
            req.isSuccess = false;
        }
    }

    next();
}

function failedValidationRes(req, errors) {
    console.log("Query parameters are wrong");
    req.isSuccess = false;
    req.errors = errors.array();
}