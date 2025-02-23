const express = require("express")
const router = express.Router()

const {createContact}=require("../controller/Contact");

router.post("/sendinfo",createContact)

module.exports=router