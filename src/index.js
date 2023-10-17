const express = require("express");
// const res = require("express/lib/response");
const app= express()
const userRouter = require("./routes/userroutes");
const noteRouter = require("./routes/noteroutes");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config();
app.use(cors());

const mongoose=require("mongoose");

app.use(express.json());

app.use((req,res,next)=>{
    console.log("HTTP method "+req.method + ", URL" + req.url);
    next();
});

app.use("/users",userRouter);
app.use("/note",noteRouter);

const PORT= process.env.PORT || 5000
// const PORT=5000;

mongoose.connect("mongodb+srv://admin:admin@cluster2020.dytigqx.mongodb.net/notes_db?retryWrites=true&w=majority").then(()=>{
    app.listen(PORT,()=>{
        console.log("server started on port number" +PORT);
    });
})
.catch((error)=>{
    console.log("error generated");
})


app.get("/",(req,res)=>{
    res.send("Notes API");
})

