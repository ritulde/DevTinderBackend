const express=require('express');
const app=express();//instance of express

app.listen(3000,()=>{
    console.log("server successfully listen onport 3000")
});
//get call
app.get("/user",(req,res)=>{
    res.send({firstName: 'Ritul', lastName:'De'})
})


//post call
app.post("/user",(req,res)=>{
    //Save Data in DB
    res.send("Data save successfully")
})


//delete call
app.delete("/user",(req,res)=>{
    //Delete user
    res.send("User deleted successfully")
})


app.patch("/user",(req,res)=>{
    res.send("User updated successfully Via path")
})
app.put("/user",(req,res)=>{
    res.send("User updated successfully via patch")
})

app.use("/test",(req,res)=>{
    res.send("test from server");
})
app.use("/hello",(req,res)=>{
    res.send("Hello from server");
})
app.use("/",(req,res)=>{
    res.send("Get Call");
})
