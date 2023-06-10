const express = require("express")
const { postModel } = require("./models/post.model")
const { connection } = require("./configs/db")
const app = express()

app.use(express.json())

app.post("/post",async(req,res)=>{
    const body = req.body 
    try{
        const post = new postModel(body)
        await post.save()
        res.send({
            "msg":"post has been added",
            post
        })
    }
    catch(err){
        console.log(err)
    }
})

app.get("/post",async(req,res)=>{
    // const body = req.body 
    try{
        const posts = await postModel.find()
        // await post.save()
        res.send({
            "msg":"all the posts down below",
            posts
        })
    }
    catch(err){
        console.log(err)
    }
})

app.delete("/post/:id",async(req,res)=>{
    const {id} = req.params 
    try{
        const post = await postModel.findByIdAndDelete(id)
        // await post.save()
        res.send({
            "msg":"post has been deleted",
            post
        })
    }
    catch(err){
        console.log(err)
    }
})

app.listen(4500,async()=>{
    try{
        await connection
        console.log("db connected")
    }
    catch(err){
        console.log(err)
    }
    console.log("server connected")
})