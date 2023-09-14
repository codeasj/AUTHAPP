const express = require("express");
const router = express.Router();
const {login,signup} = require("../controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

//router.post("/login",login);
router.post("/signup",signup);
router.post("/login",login);

//protected route
router.get("/student",auth,isStudent,(req,res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for students",
    });
});

router.get("/admin",auth,isAdmin,(req,res) => {
    res.json({
        success:true,
        message:"Welcome to the protected route for Admin",
    });
});

module.exports = router;
