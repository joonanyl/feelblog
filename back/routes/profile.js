const express = require("express");
const authController = require("../controllers/auth");
const profileController = require("../controllers/profile");
const { param, body} = require("express-validator");

const router = express.Router();

router.get("/information", authController.isLoggedIn, profileController.getUserData, (req, res) => {
    sendDataToClient(req, res);
});

router.get("/myposts", authController.isLoggedIn, profileController.getUserPosts, (req, res) => {
    sendDataToClient(req, res);
});

//User post CRUD
router.post("/myposts", authController.isLoggedIn, [
    body("title", "Name must be at least 3 symbols long").trim().escape().isLength({min: 3}),
    body("title", "Name can not be empty").notEmpty({ignore_whitespace: true}),
    body("content").trim()
], profileController.createPost, (req, res) => {
    sendQueryStatus(req, res);
});

router.get("/myposts/:id", authController.isLoggedIn, [
    param("id", "id must be an integer").trim().isInt(),
], profileController.getUserPost, (req, res) => {
    sendDataToClient(req, res);
});

router.put("/myposts/:id", authController.isLoggedIn, [
    param("id", "id must be an integer").trim().isInt(),
    body("title", "Name must be at least 3 symbols long").trim().escape().isLength({min: 3}),
    body("title", "Name can not be empty").notEmpty({ignore_whitespace: true}),
    body("content").trim()
], profileController.updateUserPost, (req, res) => {
    sendQueryStatus(req, res);
});

router.delete("/myposts/:id", authController.isLoggedIn,  [
    param("id", "id must be an integer").trim().isInt(),
], profileController.deleteUserPost, (req, res) => {
    sendQueryStatus(req, res);
});

//User personal data CRUD (reading and updating only)
router.get("/information/:property", authController.isLoggedIn, [
    param("property", "Property can not contain special characters").blacklist(" =<>$|+?,!{}").escape(),
], profileController.getUserProperty, (req, res) => {
    sendDataToClient(req, res);
});

router.put("/information/:property", authController.isLoggedIn, [
    param("property", "Property can not contain special characters").blacklist(" =<>$|+?,!{}").escape(),
    body("value", "Name can not contain special characters").trim().blacklist("=<>$+?,!{}").escape()
], profileController.updateUserProperty, (req, res) => {
    sendQueryStatus(req, res);
});

function sendDataToClient(req, res) {
    if(req.isSuccess){
        res.json({
            isSuccess: true,
            result: req.result
        });
    } else if(req.errors){
        res.json({
            isSuccess: false,
            msg: convertArrToStr(req.errors)
        });
    } else{
        res.json({
            isSuccess: false,
            msg: "Something went wrong"
        });
    }
    res.end();
}

function sendQueryStatus(req, res){
    if(req.errors){
        res.json({
            isSuccess: false,
            msg: convertArrToStr(req.errors)
        });
    } else if(!req.isSuccess){
        res.json({
            isSuccess: false,
            msg: "Something went wrong"
        });
    } else{
        res.json({
            isSuccess: true,
            msg: "Success"
        });
    }
    res.end();
}

function convertArrToStr(arr) {
    let result = "";
    for(let i=0; i<arr.length; i++){
        result += arr[i].msg + ". ";
    }
    return result;
}

module.exports = router;