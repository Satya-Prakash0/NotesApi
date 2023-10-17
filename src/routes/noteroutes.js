const express=require("express");
const { getnotes, updatenotes, createnotes, deletenotes } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter=express.Router();

noteRouter.get("/",auth ,getnotes);

noteRouter.post("/",auth,createnotes);

noteRouter.delete("/:id",auth,deletenotes);

noteRouter.put("/:id",auth,updatenotes);

module.exports=noteRouter;

