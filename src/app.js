const express=require('express');
const app=express();//instance of express

app.listen(3000,()=>{
    console.log("server successfully listen onport 3000")
});
app.use("/test",(req,res)=>{
    res.send("test from server");
})
app.use("/hello",(req,res)=>{
    res.send("Hello from server");
})