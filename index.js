const express = require('express');
const cors = require('cors');
const app=express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port =process.env.PORT  || 5000
//middle ware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ej2tmfe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const productsCollection=client.db('artisian').collection('products')
  try {
   
    app.get('/products',async(req,res)=>{
      console.log(req.query);
     const result= await productsCollection.find().toArray();
     res.send(result);
     //for pagination
     app.get('/productsCount',async(req,res)=>{
      const count =await productsCollection.estimatedDocumentCount();
      res.send({count})
     })
})
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send("Artisian is running")

})
app.listen(port, ()=>{
    console.log("Server is running");
})



