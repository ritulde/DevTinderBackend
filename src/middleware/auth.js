 const adminAuth = (req,res,next)=>{
    const token='xyz';
    if(token !== 'xyz'){
        res.status(401).send("Unauthorise")
    }else{
        next();
    }
}
const userAuth = (req,res,next)=>{
    const token='aayz';
    if(token !== 'xyz'){
        console.log("unauthorize");
        res.status(401).send("Unauthorise")
    }else{
        next();
    }
}
module.exports = { adminAuth ,userAuth};