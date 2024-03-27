import dotenv from "dotenv"
import DBConnect from "./db/index.js"
import { app } from "./app.js"

dotenv.config()

DBConnect()
.then(()=>{
    app.listen(5000,()=>{
        console.log("listening on port 5000");
    })    
})
.catch((err)=>{
    console.log(err);
})
